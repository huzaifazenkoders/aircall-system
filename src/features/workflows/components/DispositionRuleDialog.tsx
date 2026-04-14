"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle
} from "@/components/ui/dialog";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";
import {
  useCreateDisposition,
  useGetRemainingDispositionTypes,
  useUpdateDisposition
} from "@/features/workflows/services/dispositionService";
import { workflowKeys } from "@/features/workflows/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";
import {
  CooldownBehavior,
  Disposition,
  DispositionType,
  MaxAttemptReached,
  ResultingLeadStatus
} from "@/features/workflows/types/workflowTypes";
import { workflowLeadStatusOptions } from "@/features/workflows/data/workflowsData";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DispositionFormValues {
  disposition_type: DispositionType | "";
  resulting_lead_status: ResultingLeadStatus | "";
  is_retry_allowed: boolean;
  max_attempts: number;
  cooldown_behavior: CooldownBehavior;
  custom_cooldown_hours: number;
  custom_cooldown_min: number;
  max_attempt_reached: MaxAttemptReached;
  keap_note: string;
  keap_tag: string;
}

const emptyValues: DispositionFormValues = {
  disposition_type: "",
  resulting_lead_status: "",
  is_retry_allowed: false,
  max_attempts: 3,
  cooldown_behavior: "default",
  custom_cooldown_hours: 12,
  custom_cooldown_min: 30,
  max_attempt_reached: "completed",
  keap_note: "",
  keap_tag: ""
};

const validationSchema = Yup.object({
  disposition_type: Yup.string()
    .required("Disposition type is required")
    .max(250, "Disposition name cannot exceed 250 characters."),
  resulting_lead_status: Yup.string().required(
    "Resulting lead status is required"
  ),
  max_attempts: Yup.number().when("resulting_lead_status", {
    is: "cooldown",
    then: (s) => s.min(1, "Min 1").required("Required"),
    otherwise: (s) => s
  }),
  custom_cooldown_hours: Yup.number().when(
    ["resulting_lead_status", "cooldown_behavior"],
    {
      is: (ls: string, cb: string) => ls === "cooldown" && cb === "custom",
      then: (s) => s.min(0, "Min 0").required("Required"),
      otherwise: (s) => s.nullable()
    }
  ),
  custom_cooldown_min: Yup.number().when(
    ["resulting_lead_status", "cooldown_behavior"],
    {
      is: (ls: string, cb: string) => ls === "cooldown" && cb === "custom",
      then: (s) => s.min(0).max(59).required("Required"),
      otherwise: (s) => s.nullable()
    }
  )
});

// ─── Radio Card ───────────────────────────────────────────────────────────────

const FormRadioCard = ({
  value,
  label,
  selected,
  onSelect
}: {
  value: string;
  label: string;
  selected: boolean;
  onSelect: (value: string) => void;
}) => (
  <button
    type="button"
    className={workflowsStyles.radioCard}
    data-checked={selected}
    onClick={() => onSelect(value)}
  >
    <span className="p-2">
      <span className={workflowsStyles.radioControl} aria-hidden="true">
        {selected ? (
          <>
            <span className="absolute inset-[2px] rounded-full bg-[#073031]" />
            <span className="absolute inset-[8px] rounded-full bg-white" />
          </>
        ) : (
          <>
            <span className="absolute inset-[2px] rounded-full bg-gray-500" />
            <span className="absolute inset-[5px] rounded-full bg-white" />
          </>
        )}
      </span>
    </span>
    <span className="text-sm font-medium text-gray-600">{label}</span>
  </button>
);

// ─── Component ────────────────────────────────────────────────────────────────

const DispositionRuleDialog = ({
  open,
  onOpenChange,
  workflowId,
  editingDisposition
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflowId: string;
  editingDisposition?: Disposition | null;
}) => {
  const queryClient = useQueryClient();
  const isEditing = Boolean(editingDisposition);

  const { data: remainingData, isPending: isLoadingTypes } =
    useGetRemainingDispositionTypes({ id: workflowId });

  const remainingTypes = editingDisposition?.disposition_type
    ? [editingDisposition?.disposition_type, ...(remainingData?.data ?? [])]
    : (remainingData?.data ?? []);

  const { mutate: createDisposition, isPending: isCreating } =
    useCreateDisposition();
  const { mutate: updateDisposition, isPending: isUpdating } =
    useUpdateDisposition();
  const isPending = isCreating || isUpdating;

  const formik = useFormik<DispositionFormValues>({
    initialValues: editingDisposition
      ? {
          disposition_type: editingDisposition.disposition_type,
          resulting_lead_status: editingDisposition.resulting_lead_status,
          is_retry_allowed: editingDisposition.is_retry_allowed,
          max_attempts: editingDisposition.max_attempts,
          cooldown_behavior: editingDisposition.cooldown_behavior,
          custom_cooldown_hours: editingDisposition.custom_cooldown_hours,
          custom_cooldown_min: editingDisposition.custom_cooldown_min,
          max_attempt_reached: editingDisposition.max_attempt_reached,
          keap_note: editingDisposition.keap_note,
          keap_tag: ""
        }
      : emptyValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        workflow_id: workflowId,
        disposition_type: values.disposition_type as DispositionType,
        resulting_lead_status:
          values.resulting_lead_status as ResultingLeadStatus,
        max_attempts: values.is_retry_allowed ? values.max_attempts : undefined,
        cooldown_behavior: values.cooldown_behavior,
        custom_cooldown_hours:
          values.cooldown_behavior === "default"
            ? undefined
            : values.custom_cooldown_hours,
        custom_cooldown_min:
          values.cooldown_behavior === "default"
            ? undefined
            : values.custom_cooldown_min,
        max_attempt_reached: values.max_attempt_reached,
        keap_note: values.keap_note,
        is_retry_allowed: values.is_retry_allowed
      };

      const invalidate = () => {
        queryClient.invalidateQueries({
          queryKey: workflowKeys.dispositions({ workflow_id: workflowId })
        });
        queryClient.invalidateQueries({
          queryKey: workflowKeys.remainingDispositionTypes(workflowId)
        });
        onOpenChange(false);
      };

      if (isEditing && editingDisposition) {
        updateDisposition(
          { payload: { ...payload, id: editingDisposition.id } },
          {
            onSuccess: () => {
              toast.success("Disposition updated");
              invalidate();
            },
            onError: handleMutationError
          }
        );
      } else {
        createDisposition(
          { payload },
          {
            onSuccess: () => {
              toast.success("Disposition created");
              invalidate();
            },
            onError: (e) => {
              handleMutationError(e);
            }
          }
        );
      }
    }
  });

  React.useEffect(() => {
    if (!open) formik.resetForm();
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const isCooldown = formik.values.resulting_lead_status === "cooldown";

  console.log("formik", formik.errors);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={workflowsStyles.formDialogContent}>
        <DialogHeader className={workflowsStyles.dialogHeader}>
          <div>
            <DialogTitle className={workflowsStyles.dialogTitle}>
              {isEditing ? "Edit Disposition Rule" : "Add Disposition Rule"}
            </DialogTitle>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <DialogBody className={workflowsStyles.dialogBody}>
            <div className={workflowsStyles.fieldStack}>
              <div className={workflowsStyles.fieldGrid}>
                <div className={workflowsStyles.field}>
                  <span className={workflowsStyles.fieldLabel}>
                    Disposition Type
                  </span>
                  {isLoadingTypes ? (
                    <div className="flex h-11 items-center">
                      <Loader2Icon className="size-4 animate-spin text-secondary" />
                    </div>
                  ) : (
                    <Select
                      value={formik.values.disposition_type}
                      onValueChange={(val) =>
                        formik.setFieldValue("disposition_type", val)
                      }
                    >
                      <SelectTrigger className={workflowsStyles.selectTrigger}>
                        <SelectValue
                          placeholder="Select disposition"
                          className={"capitalize"}
                        >
                          {formik.values.disposition_type
                            ? formik.values.disposition_type.replaceAll(
                                "_",
                                " "
                              )
                            : undefined}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent
                        className={workflowsStyles.selectContent}
                        align="start"
                      >
                        {remainingTypes.map((t) => (
                          <SelectItem
                            key={t}
                            value={t}
                            className={workflowsStyles.selectItem}
                          >
                            {t.replaceAll("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {formik.touched.disposition_type &&
                    formik.errors.disposition_type && (
                      <span className="text-xs text-red-500">
                        {formik.errors.disposition_type}
                      </span>
                    )}
                </div>

                <div className={workflowsStyles.field}>
                  <span className={workflowsStyles.fieldLabel}>
                    Resulting Lead Status
                  </span>
                  <Select
                    value={formik.values.resulting_lead_status}
                    onValueChange={(val) =>
                      formik.setFieldValue("resulting_lead_status", val)
                    }
                  >
                    <SelectTrigger className={workflowsStyles.selectTrigger}>
                      <SelectValue
                        placeholder="Select lead action"
                        className={"capitalize"}
                      />
                    </SelectTrigger>
                    <SelectContent
                      className={workflowsStyles.selectContent}
                      align="start"
                    >
                      {workflowLeadStatusOptions.map((option) => (
                        <SelectItem
                          key={option}
                          value={option.toLowerCase()}
                          className={workflowsStyles.selectItem}
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.resulting_lead_status &&
                    formik.errors.resulting_lead_status && (
                      <span className="text-xs text-red-500">
                        {formik.errors.resulting_lead_status}
                      </span>
                    )}
                </div>
              </div>

              {isCooldown && (
                <>
                  <div className={workflowsStyles.field}>
                    <span className={workflowsStyles.fieldLabel}>
                      Retry Strategy
                    </span>
                    <RadioGroup
                      value={
                        formik.values.is_retry_allowed
                          ? "retry"
                          : "do-not-retry"
                      }
                      className={workflowsStyles.radioGrid}
                      onValueChange={(val) =>
                        formik.setFieldValue(
                          "is_retry_allowed",
                          val === "retry"
                        )
                      }
                    >
                      <FormRadioCard
                        value="retry"
                        label="Retry"
                        selected={formik.values.is_retry_allowed}
                        onSelect={() =>
                          formik.setFieldValue("is_retry_allowed", true)
                        }
                      />
                      <FormRadioCard
                        value="do-not-retry"
                        label="Do Not Retry"
                        selected={!formik.values.is_retry_allowed}
                        onSelect={() =>
                          formik.setFieldValue("is_retry_allowed", false)
                        }
                      />
                    </RadioGroup>
                  </div>

                  {formik.values.is_retry_allowed ? (
                    <div className={workflowsStyles.field}>
                      <span className={workflowsStyles.fieldLabel}>
                        Maximum Attempts
                      </span>
                      <TextInput
                        placeholder="3"
                        value={String(formik.values.max_attempts)}
                        setValue={(val) =>
                          formik.setFieldValue("max_attempts", Number(val))
                        }
                        error={
                          formik.touched.max_attempts
                            ? formik.errors.max_attempts
                            : undefined
                        }
                        endIcon={
                          <span className={workflowsStyles.suffixText}>
                            attempts
                          </span>
                        }
                      />
                    </div>
                  ) : null}

                  <div className={workflowsStyles.field}>
                    <span className={workflowsStyles.fieldLabel}>
                      Cooldown Behavior
                    </span>
                    <RadioGroup
                      value={formik.values.cooldown_behavior}
                      className={workflowsStyles.radioGrid}
                      onValueChange={(val) =>
                        formik.setFieldValue("cooldown_behavior", val)
                      }
                    >
                      <FormRadioCard
                        value="default"
                        label="Use List Default Cooldown"
                        selected={formik.values.cooldown_behavior === "default"}
                        onSelect={(val) =>
                          formik.setFieldValue("cooldown_behavior", val)
                        }
                      />
                      <FormRadioCard
                        value="custom"
                        label="Custom Cooldown"
                        selected={formik.values.cooldown_behavior === "custom"}
                        onSelect={(val) =>
                          formik.setFieldValue("cooldown_behavior", val)
                        }
                      />
                    </RadioGroup>
                  </div>

                  {formik.values.cooldown_behavior === "custom" ? (
                    <div className={workflowsStyles.fieldGrid}>
                      <div className={workflowsStyles.field}>
                        <span className={workflowsStyles.fieldLabel}>
                          Custom Cooldown (Hours)
                        </span>
                        <TextInput
                          placeholder="12"
                          value={String(formik.values.custom_cooldown_hours)}
                          setValue={(val) =>
                            formik.setFieldValue(
                              "custom_cooldown_hours",
                              Number(val)
                            )
                          }
                          error={
                            formik.touched.custom_cooldown_hours
                              ? formik.errors.custom_cooldown_hours
                              : undefined
                          }
                          endIcon={
                            <span className={workflowsStyles.suffixText}>
                              hr
                            </span>
                          }
                        />
                      </div>

                      <div className={workflowsStyles.field}>
                        <span className={workflowsStyles.fieldLabel}>
                          Custom Cooldown Minutes
                        </span>
                        <TextInput
                          placeholder="30"
                          value={String(formik.values.custom_cooldown_min)}
                          setValue={(val) =>
                            formik.setFieldValue(
                              "custom_cooldown_min",
                              Number(val)
                            )
                          }
                          error={
                            formik.touched.custom_cooldown_min
                              ? formik.errors.custom_cooldown_min
                              : undefined
                          }
                          endIcon={
                            <span className={workflowsStyles.suffixText}>
                              Min
                            </span>
                          }
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className={workflowsStyles.field}>
                    <span className={workflowsStyles.fieldLabel}>
                      Maximum Attempts Reached
                    </span>
                    <Select
                      value={formik.values.max_attempt_reached}
                      onValueChange={(val) =>
                        formik.setFieldValue("max_attempt_reached", val)
                      }
                    >
                      <SelectTrigger className={workflowsStyles.selectTrigger}>
                        <SelectValue
                          placeholder="Completed"
                          className={"capitalize"}
                        />
                      </SelectTrigger>
                      <SelectContent
                        className={workflowsStyles.selectContent}
                        align="start"
                      >
                        {(
                          [
                            "completed",
                            "invalid",
                            "banned"
                          ] as MaxAttemptReached[]
                        ).map((opt) => (
                          <SelectItem
                            key={opt}
                            value={opt}
                            className={workflowsStyles.selectItem}
                          >
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className={workflowsStyles.field}>
                <span className={workflowsStyles.fieldLabel}>
                  Apply Keap Note Template
                </span>
                <TextInput
                  placeholder="Enter keap note"
                  value={formik.values.keap_note}
                  setValue={(val) => formik.setFieldValue("keap_note", val)}
                />
              </div>

              <div className={workflowsStyles.field}>
                <span className={workflowsStyles.fieldLabel}>Keap Tag</span>
                <TextInput
                  placeholder="Enter tag"
                  value={formik.values.keap_tag}
                  setValue={(val) => formik.setFieldValue("keap_tag", val)}
                />
              </div>
            </div>
          </DialogBody>

          <DialogFooter className={workflowsStyles.dialogFooter}>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DispositionRuleDialog;
