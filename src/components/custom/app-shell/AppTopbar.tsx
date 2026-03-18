"use client";

import React from "react";

const AppTopbar = () => {
  return (
    <header className="flex items-center justify-end border-b border-border pb-5">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center overflow-hidden rounded-lg bg-muted text-sm font-semibold text-foreground">
          JS
        </div>
        <div className="leading-tight">
          <div className="text-sm text-muted-foreground">Hello</div>
          <div className="text-sm font-semibold">James Smith</div>
        </div>
      </div>
    </header>
  );
};

export default AppTopbar;

