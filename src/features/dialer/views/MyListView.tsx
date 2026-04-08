"use client";

import MyListComponent from "@/features/dialer/components/MyListComponent";
import MyListEmptyComponent from "@/features/dialer/components/MyListEmptyComponent";
import { dialerShellStyles } from "@/features/dialer/styles/dialerStyles";
import { useGetMyLists } from "@/features/list/services/listService";
import { Loader2Icon } from "lucide-react";

const MyListView = () => {
  const { data, isPending } = useGetMyLists({ limit: 1 });
  const hasLists = (data?.pages?.[0]?.data?.meta?.total ?? 0) > 0;

  return (
    <>
      <div className={dialerShellStyles.titleRow}>
        <h1 className={dialerShellStyles.title}>My List</h1>
        <div className="opacity-0 w-36 h-11" />
      </div>

      {isPending ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <Loader2Icon className="size-8 animate-spin text-gray-400" />
        </div>
      ) : hasLists ? (
        <MyListComponent />
      ) : (
        <MyListEmptyComponent />
      )}
    </>
  );
};

export default MyListView;
