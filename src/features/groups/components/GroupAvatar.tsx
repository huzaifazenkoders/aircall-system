"use client";

import React from "react";

import { groupsStyles } from "@/features/groups/styles/groupsStyles";
import { GroupMember } from "@/features/groups/data/groupsData";

const GroupAvatar = ({ member }: { member: GroupMember }) => {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={groupsStyles.avatar}
      style={{
        backgroundColor: member.tint,
        color: member.accent,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

export default GroupAvatar;
