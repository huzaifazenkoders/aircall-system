import React from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import UsersIllustration from "@/features/users/components/UsersIllustration";
import { usersStyles } from "@/features/users/styles/usersStyles";

const UsersEmptyState = ({ onAddUser }: { onAddUser: () => void }) => {
  return (
    <section className={usersStyles.emptyState}>
      <div className={usersStyles.illustrationWrap}>
        <UsersIllustration />
        <div className={usersStyles.divider} />
      </div>

      <h1 className={usersStyles.title}>No Users Found</h1>
      <p className={usersStyles.description}>
        Add users to begin assigning lists and distributing leads.
      </p>

      <Button className={usersStyles.primaryButton} onClick={onAddUser}>
        <PlusIcon className="size-6" />
        Add User
      </Button>
    </section>
  );
};

export default UsersEmptyState;
