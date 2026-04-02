"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { useInviteUser } from "@/features/users/services/userService";
import { userKeys } from "@/features/users/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";

// Step 1 schema
const step1Schema = Yup.object({
  keap_id: Yup.string().required("Keap ID is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string().required("Phone number is required"),
  group_ids: Yup.array().of(Yup.string()),
});

// Full schema (step 2 adds list fields)
const fullSchema = step1Schema.shape({
  list_description: Yup.string().required("Description is required"),
  workflow_id: Yup.string().required("Workflow is required"),
  cooldown_minimum_hours: Yup.number().min(0).required("Required"),
  cooldown_minimum_minutes: Yup.number().min(0).max(59).required("Required"),
});

const groupOptions = [
  { id: "group-1", name: "Sales" },
  { id: "group-2", name: "Support" },
  { id: "group-3", name: "Retention" },
];

const workflowOptions = [
  { id: "wf-1", label: "Default Sales Workflow", suffix: "(Default)" },
  { id: "wf-2", label: "High-Intent Lead Closer" },
  { id: "wf-3", label: "Trial User Conversion" },
];

const UsersConfigDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const [step, setStep] = React.useState<1 | 2>(1);
  const { mutate: inviteUser, isPending } = useInviteUser();

  const formik = useFormik({
    initialValues: {
      keap_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      group_ids: [] as string[],
      list_description: "",
      workflow_id: workflowOptions[0].id,
      cooldown_minimum_hours: 12,
      cooldown_minimum_minutes: 30,
    },
    validationSchema: step === 1 ? step1Schema : fullSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (step === 1) {
        setStep(2);
        return;
      }
      inviteUser(
        {
          payload: {
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
            phone_number: values.phone_number,
            keap_id: values.keap_id,
            group_ids: values.group_ids,
            list: {
              description: values.list_description,
              call_type: "hot_lead",
              cooldown_minimum_hours: values.cooldown_minimum_hours,
              cooldown_minimum_minutes: values.cooldown_minimum_minutes,
              workflow_id: values.workflow_id,
            },
          },
        },
        {
          onSuccess: () => {
            toast.success("Invitation sent successfully");
            queryClient.invalidateQueries({ queryKey: userKeys.all });
            onOpenChange(false);
          },
          onError: handleMutationError,
        }
      );
    },
  });

  React.useEffect(() => {
    if (!open) {
      setStep(1);
      formik.resetForm();
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const e = formik.errors;
  const t = formik.touched;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.modalContent}>
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.modalTitle}>
              {step === 1 ? (
                <span>Add New User</span>
              ) : (
                <>
                  <ArrowLeftIcon className="mt-1 size-5 mb-3 shrink-0 text-[#64748B]" />
                  <span>List Configuration</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription className={usersStyles.modalSubtitle}>
              {step === 1
                ? "Create a new account and assign access permissions."
                : "Assign workflow template and configure cooldown for IDV list."}
            </DialogDescription>
          </div>
          <DialogIconClose
            className="mt-1 size-10 rounded-full text-[#64748B] hover:bg-muted"
            onClick={() => onOpenChange(false)}
          />
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <DialogBody className={usersStyles.modalBody}>
            {step === 1 ? (
              <div className="grid gap-5">
                <TextInput
                  label="Keap Id"
                  value={formik.values.keap_id}
                  setValue={(val) => formik.setFieldValue("keap_id", val)}
                  placeholder="eg. 123"
                  error={t.keap_id ? e.keap_id : undefined}
                />
                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    label="First Name"
                    value={formik.values.first_name}
                    setValue={(val) => formik.setFieldValue("first_name", val)}
                    placeholder="eg. James"
                    error={t.first_name ? e.first_name : undefined}
                  />
                  <TextInput
                    label="Last Name"
                    value={formik.values.last_name}
                    setValue={(val) => formik.setFieldValue("last_name", val)}
                    placeholder="eg. Williams"
                    error={t.last_name ? e.last_name : undefined}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    label="Email"
                    value={formik.values.email}
                    setValue={(val) => formik.setFieldValue("email", val)}
                    placeholder="eg. james@gmail.com"
                    error={t.email ? e.email : undefined}
                  />
                  <TextInput
                    label="Phone number"
                    value={formik.values.phone_number}
                    setValue={(val) => formik.setFieldValue("phone_number", val)}
                    placeholder="eg. +1 224 776 885"
                    error={t.phone_number ? e.phone_number : undefined}
                  />
                </div>

                <div>
                  <label className={usersStyles.sectionLabel}>Add to Groups</label>
                  <Select
                    value={formik.values.group_ids[0] ?? ""}
                    onValueChange={(val) =>
                      formik.setFieldValue("group_ids", val ? [val] : [])
                    }
                  >
                    <SelectTrigger className={usersStyles.triggerField}>
                      <SelectValue placeholder="Select groups" />
                    </SelectTrigger>
                    <SelectContent>
                      {groupOptions.map((g) => (
                        <SelectItem key={g.id} value={g.id}>
                          {g.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <label className={usersStyles.sectionLabel}>
                    Assign Workflow Template
                  </label>
                  <Select
                    value={formik.values.workflow_id}
                    onValueChange={(val) => formik.setFieldValue("workflow_id", val)}
                  >
                    <SelectTrigger className={usersStyles.triggerField}>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {workflowOptions.map((opt) => (
                        <SelectItem key={opt.id} value={opt.id}>
                          <span>{opt.label}</span>
                          {opt.suffix ? (
                            <span className={usersStyles.menuItemMuted}>
                              {" "}{opt.suffix}
                            </span>
                          ) : null}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {t.workflow_id && e.workflow_id && (
                    <span className="mt-1 text-xs text-red-500">{e.workflow_id}</span>
                  )}
                </div>

                <div className="mt-5">
                  <TextInput
                    label="List Description"
                    value={formik.values.list_description}
                    setValue={(val) => formik.setFieldValue("list_description", val)}
                    placeholder="eg. IDV list for James"
                    error={t.list_description ? e.list_description : undefined}
                  />
                </div>

                <div className="mt-8">
                  <label className={usersStyles.sectionLabel}>
                    Minimum Hours Between Calls
                  </label>
                  <div className={usersStyles.cooldownGrid}>
                    <TextInput
                      value={String(formik.values.cooldown_minimum_hours)}
                      setValue={(val) =>
                        formik.setFieldValue("cooldown_minimum_hours", Number(val))
                      }
                      placeholder="12"
                      error={
                        t.cooldown_minimum_hours
                          ? (e.cooldown_minimum_hours as string)
                          : undefined
                      }
                      endIcon={
                        <span className="pointer-events-none text-sm text-panel-muted">
                          hr
                        </span>
                      }
                    />
                    <TextInput
                      value={String(formik.values.cooldown_minimum_minutes)}
                      setValue={(val) =>
                        formik.setFieldValue("cooldown_minimum_minutes", Number(val))
                      }
                      placeholder="30"
                      error={
                        t.cooldown_minimum_minutes
                          ? (e.cooldown_minimum_minutes as string)
                          : undefined
                      }
                      endIcon={
                        <span className="pointer-events-none text-sm text-panel-muted">
                          Min
                        </span>
                      }
                    />
                  </div>
                  <p className={usersStyles.helperText}>
                    Prevents the same contact from being called multiple times within
                    this time frame.
                  </p>
                </div>
              </div>
            )}
          </DialogBody>

          <DialogFooter className={usersStyles.modalFooter}>
            {step === 2 ? (
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {step === 1 ? "Continue" : isPending ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsersConfigDialog;
