"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import GroupsEmptyIllustration from "@/../public/assets/groups/no-groups-image.png";
import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import Image from "next/image";

const GroupsEmptyState = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <div className={groupsStyles.emptyWrap}>
      <div className={groupsStyles.emptyCard}>
        <Image
          src={GroupsEmptyIllustration}
          alt="No groups"
          height={291}
          width={434}
        />
        <h2 className={groupsStyles.emptyTitle}>No Groups Created</h2>
        <p className={groupsStyles.emptyDescription}>
          Groups allow you to organize representatives and assign lists
          efficiently.
        </p>
        <Button onClick={onCreate}>Create Group</Button>
      </div>
    </div>
  );
};

export default GroupsEmptyState;
