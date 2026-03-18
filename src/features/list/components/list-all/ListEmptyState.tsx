"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NoImage from "@/../public/assets/list/no-list.png";

const ListEmptyState = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <Image src={NoImage} alt="No Lists Found" height={261} width={371} />

      <h2 className="mt-10 text-[30px] font-semibold tracking-tight">
        Create Your First Calling List
      </h2>
      <p className="mx-auto mt-3 max-w-[520px] text-base leading-6 text-muted-foreground">
        Lists organize inbound leads from Keap and determine how they are
        prioritized and assigned to your sales team.
      </p>

      <Button
        type="button"
        size="xl"
        className="mt-8 h-11 rounded-xl px-8 text-sm font-medium"
        onClick={onCreate}
      >
        Create List
      </Button>
    </div>
  );
};

export default ListEmptyState;
