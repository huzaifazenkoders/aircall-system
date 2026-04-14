import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import UsersIllustration from "@/../public/assets/user/no-data.png";
import Image from "next/image";

const UsersEmptyState = ({
  onAddUser,
  showButton = true
}: {
  onAddUser?: () => void;
  showButton?: boolean;
}) => {
  return (
    <section
      className={
        "flex-1 h-full w-full flex flex-col gap-3 py-20 items-center justify-center"
      }
    >
      <Image
        src={UsersIllustration}
        alt=""
        height={292}
        width={378}
        className="h-[292px] w-auto"
      />

      <h1 className={"text-2xl font-medium text-text-primary"}>
        No Users Found
      </h1>
      <p className={"text-base text-text-secondary"}>
        Add users to begin assigning lists and distributing leads.
      </p>

      {showButton && (
        <Button onClick={onAddUser}>
          <PlusIcon className="size-6" />
          Add User
        </Button>
      )}
    </section>
  );
};

export default UsersEmptyState;
