"use client";

import MyListComponent from "@/features/dialer/components/MyListComponent";
import MyListEmptyComponent from "@/features/dialer/components/MyListEmptyComponent";
import { myLists } from "@/features/dialer/data/dialerData";
import { dialerShellStyles } from "@/features/dialer/styles/dialerStyles";

const MyListView = () => {
  const hasLists = myLists.length > 0;

  return (
    <>
      <div className={dialerShellStyles.titleRow}>
        <h1 className={dialerShellStyles.title}>My List</h1>
        <div className="opacity-0 w-36 h-11" />
      </div>

      {hasLists ? <MyListComponent /> : <MyListEmptyComponent />}
    </>
  );
};

export default MyListView;
