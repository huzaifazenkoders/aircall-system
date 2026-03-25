"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import GroupsEmptyIllustration from "@/features/groups/components/GroupsEmptyIllustration";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";

const GroupsEmptyState = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <div className={groupsStyles.emptyWrap}>
      <div className={groupsStyles.emptyCard}>
        <GroupsEmptyIllustration />
        <h2 className={groupsStyles.emptyTitle}>No Groups Created</h2>
        <p className={groupsStyles.emptyDescription}>
          Groups allow you to organize representatives and assign lists efficiently.
        </p>
        <Button className={groupsStyles.emptyAction} onClick={onCreate}>
          Create Group
        </Button>
      </div>
    </div>
  );
};

export default GroupsEmptyState;
