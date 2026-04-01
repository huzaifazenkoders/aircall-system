"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  DialogTitle
} from "@/components/ui/dialog";
import TextInput from "@/components/ui/text-input";
import TextArea from "@/components/ui/text-area";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";
import { useCreateWorkflow } from "@/features/workflows/services/workflowService";
import { workflowKeys } from "@/features/workflows/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Workflow name is required")
    .max(50, "Workflow name cannot exceed 50 characters"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .max(250, "Workflow description cannot exceed 250 characters")
});

const CreateWorkflowDialog = ({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate: createWorkflow, isPending } = useCreateWorkflow();

  const formik = useFormik({
    initialValues: { name: "", description: "" },
    validationSchema,
    onSubmit: (values) => {
      createWorkflow(
        { payload: { ...values, status: "draft" } },
        {
          onSuccess: () => {
            toast.success("Workflow created successfully");
            queryClient.invalidateQueries({ queryKey: workflowKeys.all });
            onOpenChange(false);
          },
          onError: handleMutationError
        }
      );
    }
  });

  React.useEffect(() => {
    if (!open) formik.resetForm();
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={workflowsStyles.dialogContent}>
        <DialogHeader className={workflowsStyles.dialogHeader}>
          <div>
            <DialogTitle className={workflowsStyles.dialogTitle}>
              Create Workflow Template
            </DialogTitle>
            <DialogDescription className={workflowsStyles.dialogDescription}>
              Define how call outcomes trigger automation and update lead
              status.
            </DialogDescription>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <DialogBody className={workflowsStyles.dialogBody}>
            <TextInput
              label="Workflow Name"
              placeholder="eg, VIP Event Workflow"
              value={formik.values.name}
              setValue={(val) => formik.setFieldValue("name", val)}
              error={formik.touched.name ? formik.errors.name : undefined}
            />
            <TextArea
              label="Description"
              placeholder="eg, Special automation rules for VIP campaign leads."
              value={formik.values.description}
              setValue={(val) => formik.setFieldValue("description", val)}
              error={
                formik.touched.description
                  ? formik.errors.description
                  : undefined
              }
            />
          </DialogBody>

          <DialogFooter className={workflowsStyles.dialogFooter}>
            <Button
              type="button"
              variant="outline-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Continue"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
