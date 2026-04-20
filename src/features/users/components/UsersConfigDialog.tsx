"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { useInviteUser } from "@/features/users/services/userService";
import { userKeys } from "@/features/users/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";
import { useGetGroups } from "@/features/groups/services/groupService";
import { useGetWorkflows } from "@/features/workflows/services/workflowService";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import PhoneInput from "@/components/ui/phone-input";

const step1Schema = Yup.object({
  keap_id: Yup.string().trim().required("Keap ID is required"),
  first_name: Yup.string().trim().required("First name is required"),
  last_name: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required")
    .isValidEmail("Email is not valid"),
  phone_number: Yup.string()
    .trim()
    .required("Phone number is required")
    .isValidPhoneNumber("Phone number is not valid"),
  group_ids: Yup.array().of(Yup.string())
});

const fullSchema = step1Schema.shape({
  workflow_id: Yup.string().trim().required("Workflow is required"),
  cooldown_minimum_hours: Yup.number().min(0).required("Required"),
  cooldown_minimum_minutes: Yup.number().min(0).max(59).required("Required")
});

const UsersConfigDialog = ({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const [step, setStep] = React.useState<1 | 2>(1);
  const { mutate: inviteUser, isPending } = useInviteUser();

  const {
    data: groupsData,
    isPending: isGroupsPending,
    hasNextPage: hasMoreGroups,
    fetchNextPage: fetchMoreGroups
  } = useGetGroups({
    limit: 20
  });

  const {
    data: workflowsData,
    isPending: isWorkflowsPending,
    hasNextPage: hasMoreWorkflows,
    fetchNextPage: fetchMoreWorkflows
  } = useGetWorkflows({
    limit: 20
  });

  const groups = React.useMemo(
    () => transformInfiniteData(groupsData, "data"),
    [groupsData]
  );
  const workflows = React.useMemo(
    () => transformInfiniteData(workflowsData, "data"),
    [workflowsData]
  );

  const formik = useFormik({
    initialValues: {
      keap_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      group_ids: [] as string[],
      workflow_id: "",
      cooldown_minimum_hours: 12,
      cooldown_minimum_minutes: 30
    },
    validationSchema: step === 1 ? step1Schema : fullSchema,
    onSubmit: (values) => {
      if (step === 1) {
        setStep(2);
        return;
      }
      inviteUser(
        {
          payload: {
            email: values.email.trim(),
            first_name: values.first_name.trim(),
            last_name: values.last_name.trim(),
            phone_number: values.phone_number.trim(),
            keap_id: values.keap_id.trim(),
            group_ids: values.group_ids,
            list: {
              call_type: "hot_lead",
              cooldown_minimum_hours: values.cooldown_minimum_hours,
              cooldown_minimum_minutes: values.cooldown_minimum_minutes,
              workflow_id: values.workflow_id
            }
          }
        },
        {
          onSuccess: () => {
            toast.success("Invitation sent successfully");
            void queryClient.invalidateQueries({ queryKey: userKeys.all });
            onOpenChange(false);
          },
          onError: handleMutationError
        }
      );
    }
  });

  React.useEffect(() => {
    if (!open) {
      setStep(1);
      formik.resetForm();
    }
  }, [open]);

  React.useEffect(() => {
    if (!formik.values.workflow_id && workflows[0]?.id) {
      void formik.setFieldValue("workflow_id", workflows[0].id);
    }
  }, [formik.values.workflow_id, workflows]);

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
                  <ArrowLeftIcon className="mb-3 mt-1 size-5 shrink-0 text-[#64748B]" />
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
                  required
                  value={formik.values.keap_id}
                  setValue={(val) => void formik.setFieldValue("keap_id", val)}
                  placeholder="eg. 123"
                  error={t.keap_id && e.keap_id ? e.keap_id : undefined}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="First Name"
                    required
                    value={formik.values.first_name}
                    setValue={(val) => formik.setFieldValue("first_name", val)}
                    placeholder="eg. James"
                    error={
                      t.first_name && e.first_name ? e.first_name : undefined
                    }
                  />
                  <TextInput
                    label="Last Name"
                    required
                    value={formik.values.last_name}
                    setValue={(val) =>
                      void formik.setFieldValue("last_name", val)
                    }
                    placeholder="eg. Williams"
                    error={t.last_name && e.last_name ? e.last_name : undefined}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Email"
                    required
                    value={formik.values.email}
                    setValue={(val) => void formik.setFieldValue("email", val)}
                    placeholder="eg. james@gmail.com"
                    error={t.email && e.email ? e.email : undefined}
                  />
                  <PhoneInput
                    label="Phone number"
                    required
                    value={formik.values.phone_number}
                    onChange={(val) =>
                      void formik.setFieldValue("phone_number", val)
                    }
                    placeholder="eg. +1 224 776 885"
                    error={
                      t.phone_number && e.phone_number
                        ? e.phone_number
                        : undefined
                    }
                    defaultCountry="us"
                  />
                </div>

                <div>
                  <label className={usersStyles.sectionLabel}>
                    Add to Groups
                  </label>
                  <Select
                    value={formik.values.group_ids[0] ?? ""}
                    onValueChange={(val) =>
                      void formik.setFieldValue("group_ids", val ? [val] : [])
                    }
                  >
                    <SelectTrigger className={usersStyles.triggerField}>
                      <SelectValue placeholder="Select groups">
                        {
                          groups.find(
                            (t) => t.id === formik.values.group_ids[0]
                          )?.name
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {isGroupsPending && !groups.length ? (
                        <div className="flex items-center justify-center px-4 py-3">
                          <Loader2Icon className="size-4 animate-spin text-secondary" />
                        </div>
                      ) : (
                        <InfiniteScroll
                          dataLength={groups.length}
                          next={() => void fetchMoreGroups()}
                          hasMore={Boolean(hasMoreGroups)}
                          loader={
                            <div className="flex items-center justify-center px-4 py-3">
                              <Loader2Icon className="size-4 animate-spin text-secondary" />
                            </div>
                          }
                        >
                          {groups.map((g) => (
                            <SelectItem key={g.id} value={g.id}>
                              {g.name}
                            </SelectItem>
                          ))}
                        </InfiniteScroll>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <label className={usersStyles.sectionLabel}>
                    Assign Workflow Template
                    <span className="text-xl text-red-600 ms-1">*</span>
                  </label>
                  <Select
                    value={formik.values.workflow_id}
                    onValueChange={(val) =>
                      void formik.setFieldValue("workflow_id", val)
                    }
                  >
                    <SelectTrigger className={usersStyles.triggerField}>
                      <SelectValue placeholder="Select template">
                        {
                          workflows?.find(
                            (f) => f.id === formik.values.workflow_id
                          )?.name
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {isWorkflowsPending && !workflows.length ? (
                        <div className="flex items-center justify-center px-4 py-3">
                          <Loader2Icon className="size-4 animate-spin text-secondary" />
                        </div>
                      ) : (
                        <InfiniteScroll
                          dataLength={workflows.length}
                          next={() => void fetchMoreWorkflows()}
                          hasMore={Boolean(hasMoreWorkflows)}
                          loader={
                            <div className="flex items-center justify-center px-4 py-3">
                              <Loader2Icon className="size-4 animate-spin text-secondary" />
                            </div>
                          }
                        >
                          {workflows.map((workflow) => (
                            <SelectItem key={workflow.id} value={workflow.id}>
                              <span>{workflow.name}</span>
                              {workflow.is_default ? (
                                <span className={usersStyles.menuItemMuted}>
                                  {" "}
                                  (Default)
                                </span>
                              ) : null}
                            </SelectItem>
                          ))}
                        </InfiniteScroll>
                      )}
                    </SelectContent>
                  </Select>
                  {t.workflow_id && e.workflow_id ? (
                    <span className="mt-1 text-xs text-red-500">
                      {e.workflow_id}
                    </span>
                  ) : null}
                </div>

                {/* <div className="mt-5">
                  <TextInput
                    label="List Description"
                    value={formik.values.list_description}
                    setValue={(val) =>
                      void formik.setFieldValue("list_description", val)
                    }
                    placeholder="eg. IDV list for James"
                    error={
                      t.list_description && e.list_description
                        ? e.list_description
                        : undefined
                    }
                  />
                </div> */}

                <div className="mt-8">
                  <label className={usersStyles.sectionLabel}>
                    Minimum Hours Between Calls
                    <span className="text-xl text-red-600 ms-1">*</span>
                  </label>
                  <div className={usersStyles.cooldownGrid}>
                    <TextInput
                      value={String(formik.values.cooldown_minimum_hours)}
                      setValue={(val) =>
                        void formik.setFieldValue(
                          "cooldown_minimum_hours",
                          Number(val)
                        )
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
                        void formik.setFieldValue(
                          "cooldown_minimum_minutes",
                          Number(val)
                        )
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
                    Prevents the same contact from being called multiple times
                    within this time frame.
                  </p>
                </div>
              </div>
            )}
          </DialogBody>

          <DialogFooter className={usersStyles.modalFooter}>
            {step === 2 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {step === 1
                ? "Continue"
                : isPending
                  ? "Sending..."
                  : "Send Invitation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsersConfigDialog;
