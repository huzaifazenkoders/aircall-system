"use client";

import React from "react";
import { Loader2Icon, SearchIcon } from "lucide-react";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogIconClose,
  DialogTitle
} from "@/components/ui/dialog";
import TextInput from "@/components/ui/text-input";
import { useGetGroupInfo } from "@/features/groups/services/groupService";
import { usersStyles } from "@/features/users/styles/usersStyles";

const avatarPalettes = [
  { bg: "#D9D6FE", fg: "#5B4DCC" },
  { bg: "#D6E9FF", fg: "#1D4ED8" },
  { bg: "#FDE7D7", fg: "#B54708" },
  { bg: "#D8F3EE", fg: "#0F766E" },
  { bg: "#FCE7F3", fg: "#BE185D" }
];

const getInitials = (firstName: string, lastName: string) =>
  `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

const GroupMembersDialog = ({
  open,
  onOpenChange,
  groupId,
  groupName
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: string | null;
  groupName?: string | null;
}) => {
  const [searchValue, setSearchValue] = React.useState("");
  const { data, isPending, error } = useGetGroupInfo(groupId ?? "");
  const groupInfo = data?.data;

  React.useEffect(() => {
    if (!open) {
      setSearchValue("");
    }
  }, [open]);

  const filteredMembers = React.useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const members = groupInfo?.user_groups ?? [];

    if (!normalizedSearch) return members;

    return members.filter(({ user }) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      return (
        fullName.includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [groupInfo?.user_groups, searchValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.groupMembersModalContent}>
        <DialogHeader className={usersStyles.groupMembersModalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.groupMembersModalTitle}>
              {groupInfo?.name ?? groupName ?? "Group Members"}
            </DialogTitle>
            <DialogDescription className={usersStyles.groupMembersModalSubtitle}>
              {groupInfo?.total_users ?? 0} member
              {(groupInfo?.total_users ?? 0) === 1 ? "" : "s"}
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <DialogBody className={usersStyles.groupMembersModalBody}>
          <div className="border-b border-border px-8 py-6">
            <TextInput
              value={searchValue}
              setValue={setSearchValue}
              placeholder="Search..."
              className={usersStyles.groupMembersSearch}
              startIcon={<SearchIcon className="size-8 text-[#667085]" />}
            />
          </div>

          <div className={usersStyles.groupMembersList}>
            {isPending ? (
              <div className={usersStyles.groupMembersState}>
                <Loader2Icon className="size-7 animate-spin text-secondary" />
              </div>
            ) : error ? (
              <div className={usersStyles.groupMembersState}>
                Failed to load group members.
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className={usersStyles.groupMembersState}>
                No members found.
              </div>
            ) : (
              filteredMembers.map(({ id, user }, index) => {
                const palette = avatarPalettes[index % avatarPalettes.length];

                return (
                  <div key={id} className={usersStyles.groupMembersRow}>
                    <div
                      className={usersStyles.groupMembersAvatar}
                      style={{
                        backgroundColor: palette.bg,
                        color: palette.fg
                      }}
                    >
                      {getInitials(user.first_name, user.last_name)}
                    </div>
                    <div className={usersStyles.groupMembersName}>
                      {user.first_name} {user.last_name}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default GroupMembersDialog;
