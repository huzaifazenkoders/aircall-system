"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2Icon,
  SearchIcon
} from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import TextInput from "@/components/ui/text-input";
import TextArea from "@/components/ui/text-area";
import { useCreateGroup } from "@/features/groups/services/groupService";
import { groupKeys } from "@/features/groups/query-keys";
import { useGetUsers } from "@/features/users/services/userService";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Group name is required"),
  description: Yup.string().trim().required("Description is required"),
  user_ids: Yup.array().of(Yup.string())
});

const avatarPalettes = [
  { bg: "#DAF4F6", fg: "#147B8A" },
  { bg: "#E0EAFF", fg: "#1D4ED8" },
  { bg: "#FDEAD7", fg: "#B54708" },
  { bg: "#FCE7F3", fg: "#BE185D" }
];

const getInitials = (label: string) =>
  label
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

const CreateGroupDialog = ({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate: createGroup, isPending } = useCreateGroup();
  const [query, setQuery] = React.useState("");
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const {
    data,
    isPending: isUsersPending,
    hasNextPage,
    fetchNextPage
  } = useGetUsers({
    limit: 20,
    search: query || undefined,
    role: "sales_person"
  });

  const members = React.useMemo(() => {
    const users = transformInfiniteData(data, "data");
    return users.map((user) => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      subtitle: user.email
    }));
  }, [data]);

  const formik = useFormik({
    initialValues: { name: "", description: "", user_ids: [] as string[] },
    validationSchema,
    onSubmit: (values) => {
      createGroup(
        {
          payload: {
            name: values.name.trim(),
            description: values.description.trim(),
            is_active: true,
            user_ids: values.user_ids
          }
        },
        {
          onSuccess: (res) => {
            toast.success(`${res.data.name} group created successfully`);
            void queryClient.invalidateQueries({ queryKey: groupKeys.all });
            onOpenChange(false);
          },
          onError: handleMutationError
        }
      );
    }
  });

  React.useEffect(() => {
    if (!open) {
      formik.resetForm();
      setQuery("");
      setPickerOpen(false);
    }
  }, [open]);

  const toggleMember = React.useCallback(
    (memberId: string, checked: boolean) => {
      const next = checked
        ? formik.values.user_ids.includes(memberId)
          ? formik.values.user_ids
          : [...formik.values.user_ids, memberId]
        : formik.values.user_ids.filter((id) => id !== memberId);

      void formik.setFieldValue("user_ids", next);
    },
    [formik]
  );

  const triggerLabel =
    formik.values.user_ids.length > 0
      ? `${formik.values.user_ids.length} member${formik.values.user_ids.length === 1 ? "" : "s"} selected`
      : "Select members";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={groupsStyles.dialogContent}>
        <DialogHeader className={groupsStyles.dialogHeader}>
          <div>
            <DialogTitle className={groupsStyles.dialogTitle}>
              Create New Group
            </DialogTitle>
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
                setValue={(val) => void formik.setFieldValue("name", val)}
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
                setValue={(val) =>
                  void formik.setFieldValue("description", val)
                }
                error={
                  formik.touched.description
                    ? formik.errors.description
                    : undefined
                }
              />

              <div className={groupsStyles.fieldGroup}>
                <span className={groupsStyles.fieldLabel}>Add Members</span>

                <DropdownMenu open={pickerOpen} onOpenChange={setPickerOpen}>
                  <DropdownMenuTrigger
                    render={
                      <button
                        type="button"
                        className={groupsStyles.memberTrigger}
                      >
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
                        startIcon={
                          <SearchIcon className="size-6 text-panel-muted" />
                        }
                        placeholder="Search..."
                        value={query}
                        setValue={setQuery}
                      />
                    </div>

                    {isUsersPending ? (
                      <div className="flex items-center justify-center px-4 py-8">
                        <Loader2Icon className="size-6 animate-spin text-secondary" />
                      </div>
                    ) : (
                      <div
                        id="create-group-members-scroll-area"
                        className={groupsStyles.memberList}
                      >
                        <InfiniteScroll
                          dataLength={members.length}
                          next={() => void fetchNextPage()}
                          hasMore={Boolean(hasNextPage)}
                          loader={
                            <div className="flex items-center justify-center px-4 py-4">
                              <Loader2Icon className="size-5 animate-spin text-secondary" />
                            </div>
                          }
                          scrollThreshold="120px"
                          scrollableTarget="create-group-members-scroll-area"
                        >
                          {members.map((member, index) => {
                            const checked = formik.values.user_ids.includes(
                              member.id
                            );
                            const palette =
                              avatarPalettes[index % avatarPalettes.length];

                            return (
                              <label
                                key={member.id}
                                className={groupsStyles.memberRow}
                              >
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={(value) =>
                                    toggleMember(member.id, Boolean(value))
                                  }
                                  className="size-6 rounded-[8px] border-border data-checked:border-primary data-checked:bg-primary"
                                />
                                <div
                                  className={groupsStyles.avatar}
                                  style={{
                                    backgroundColor: palette.bg,
                                    color: palette.fg
                                  }}
                                >
                                  {getInitials(member.name)}
                                </div>
                                <div>
                                  <div className="text-sm text-text-primary">
                                    {member.name}
                                  </div>
                                  <div className={groupsStyles.assignmentMeta}>
                                    {member.subtitle}
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </InfiniteScroll>
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {formik.touched.user_ids && formik.errors.user_ids ? (
                  <span className="text-xs text-red-500">
                    {formik.errors.user_ids as string}
                  </span>
                ) : null}
              </div>
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
              {isPending ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
