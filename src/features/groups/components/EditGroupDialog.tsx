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
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import {
  useGetGroupInfo,
  useUpdateGroup
} from "@/features/groups/services/groupService";
import { groupKeys } from "@/features/groups/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  name: Yup.string().required("Group name is required"),
  description: Yup.string().required("Description is required")
});

const EditGroupDialog = ({
  open,
  onOpenChange,
  groupId
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: string | null;
}) => {
  const queryClient = useQueryClient();
  const { data } = useGetGroupInfo(groupId ?? "");
  const group = data?.data;

  const { mutate: updateGroup, isPending } = useUpdateGroup();

  const formik = useFormik({
    initialValues: {
      name: group?.name ?? "",
      description: group?.description ?? ""
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (!groupId) return;
      updateGroup(
        {
          payload: {
            id: groupId,
            name: values.name,
            description: values.description
          }
        },
        {
          onSuccess: () => {
            toast.success("Group updated successfully");
            queryClient.invalidateQueries({
              queryKey: groupKeys.info(groupId)
            });
            queryClient.invalidateQueries({ queryKey: groupKeys.all });
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
      <DialogContent className={groupsStyles.dialogContent}>
        <DialogHeader className={groupsStyles.dialogHeader}>
          <div>
            <DialogTitle className={groupsStyles.dialogTitle}>
              Edit Group
            </DialogTitle>
            <DialogDescription className={groupsStyles.dialogSubtitle}>
              Update the group name and description.
            </DialogDescription>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <DialogBody className={groupsStyles.dialogBody}>
            <div className={groupsStyles.formGrid}>
              <TextInput
                label="Group Name"
                placeholder="eg, Team Alpha"
                value={formik.values.name}
                setValue={(val) => formik.setFieldValue("name", val)}
                error={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : undefined
                }
              />
              <TextArea
                label="Description"
                placeholder="eg, Primary calling team for Sydney live events."
                value={formik.values.description}
                setValue={(val) => formik.setFieldValue("description", val)}
                error={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : undefined
                }
              />
            </div>
          </DialogBody>

          <DialogFooter className={groupsStyles.dialogFooter}>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGroupDialog;
