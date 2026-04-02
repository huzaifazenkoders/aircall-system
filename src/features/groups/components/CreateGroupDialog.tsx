"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import GroupAvatar from "@/features/groups/components/GroupAvatar";
import { GroupMember } from "@/features/groups/data/groupsData";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import TextInput from "@/components/ui/text-input";
import TextArea from "@/components/ui/text-area";
import { useCreateGroup } from "@/features/groups/services/groupService";
import { groupKeys } from "@/features/groups/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  name: Yup.string().required("Group name is required"),
  description: Yup.string().required("Description is required"),
  user_ids: Yup.array().of(Yup.string()).min(1, "Select at least one member"),
});

const CreateGroupDialog = ({
  open,
  onOpenChange,
  members,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: GroupMember[];
}) => {
  const queryClient = useQueryClient();
  const { mutate: createGroup, isPending } = useCreateGroup();
  const [query, setQuery] = React.useState("");
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: { name: "", description: "", user_ids: [] as string[] },
    validationSchema,
    onSubmit: (values) => {
      createGroup(
        { payload: { name: values.name, description: values.description, is_active: true, user_ids: values.user_ids } },
        {
          onSuccess: (res) => {
            toast.success(`${res.data.name} group created successfully`);
            queryClient.invalidateQueries({ queryKey: groupKeys.all });
            onOpenChange(false);
          },
          onError: handleMutationError,
        }
      );
    },
  });

  React.useEffect(() => {
    if (!open) {
      formik.resetForm();
      setQuery("");
      setPickerOpen(false);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredMembers = React.useMemo(() => {
    const search = query.trim().toLowerCase();
    return search ? members.filter((m) => m.name.toLowerCase().includes(search)) : members;
  }, [members, query]);

  const toggleMember = (memberId: string, checked: boolean) => {
    const next = checked
      ? [...formik.values.user_ids, memberId]
      : formik.values.user_ids.filter((id) => id !== memberId);
    formik.setFieldValue("user_ids", next);
  };

  const triggerLabel =
    formik.values.user_ids.length > 0
      ? `${formik.values.user_ids.length} member${formik.values.user_ids.length === 1 ? "" : "s"} selected`
      : "Select members";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={groupsStyles.dialogContent}>
        <DialogHeader className={groupsStyles.dialogHeader}>
          <div>
            <DialogTitle className={groupsStyles.dialogTitle}>Create New Group</DialogTitle>
            <DialogDescription className={groupsStyles.dialogSubtitle}>
              Group representatives together for structured lead distribution.
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
                error={formik.touched.name ? formik.errors.name : undefined}
              />

              <TextArea
                label="Description"
                placeholder="eg, Primary calling team for Sydney live events."
                value={formik.values.description}
                setValue={(val) => formik.setFieldValue("description", val)}
                error={formik.touched.description ? formik.errors.description : undefined}
              />

              <div className={groupsStyles.fieldGroup}>
                <span className={groupsStyles.fieldLabel}>Add Members</span>

                <DropdownMenu open={pickerOpen} onOpenChange={setPickerOpen}>
                  <DropdownMenuTrigger
                    render={
                      <button type="button" className={groupsStyles.memberTrigger}>
                        <span>{triggerLabel}</span>
                        {pickerOpen ? (
                          <ChevronUpIcon className="size-6 text-panel-muted" />
                        ) : (
                          <ChevronDownIcon className="size-6 text-panel-muted" />
                        )}
                      </button>
                    }
                  />

                  <DropdownMenuContent
                    className={`${groupsStyles.memberPanel} w-(--anchor-width) p-0`}
                    sideOffset={8}
                  >
                    <div className="px-3 pt-3">
                      <TextInput
                        startIcon={<SearchIcon className="size-6 text-panel-muted" />}
                        placeholder="Search..."
                        value={query}
                        setValue={setQuery}
                      />
                    </div>

                    <div className={groupsStyles.memberList}>
                      {filteredMembers.map((member) => {
                        const checked = formik.values.user_ids.includes(member.id);
                        return (
                          <label key={member.id} className={groupsStyles.memberRow}>
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(value) => toggleMember(member.id, Boolean(value))}
                              className="size-6 rounded-[8px] border-border data-checked:border-primary data-checked:bg-primary"
                            />
                            <GroupAvatar member={member} />
                            <span className="text-sm text-text-primary">{member.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {formik.touched.user_ids && formik.errors.user_ids && (
                  <span className="text-xs text-red-500">{formik.errors.user_ids as string}</span>
                )}
              </div>
            </div>
          </DialogBody>

          <DialogFooter className={groupsStyles.dialogFooter}>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
