"use client";

import React from "react";

const UserAvatar = () => {
  return (
    <div className="grid size-12 place-items-center overflow-hidden rounded-xl border border-border bg-white shadow-xs">
      <svg
        viewBox="0 0 48 48"
        className="size-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="12" fill="#F2F5FB" />
        <path
          d="M29.4 15.2c0 4-2.5 7.1-5.6 7.1-3.1 0-5.7-3.1-5.7-7.1S20.7 8 23.8 8c3.1 0 5.6 3.1 5.6 7.2Z"
          fill="#F4C7A1"
        />
        <path
          d="M30 12.4c-.7-3-3.1-5.2-6.2-5.2-3.7 0-6.7 3.1-6.7 7.1 0 .9.2 1.8.5 2.5 1.3-.1 2.7-.7 4.1-1.7 1.5-1.1 2.5-2.4 3.1-3.7.8 1.7 2.5 3.2 5.2 4.4Z"
          fill="#1F2937"
        />
        <path
          d="M15 40c1-5.8 4.8-9.5 8.8-9.5S31.5 34.2 32.5 40H15Z"
          fill="#111827"
        />
        <path d="M31.4 40H34c0-3.9-1.2-7-3.4-9.2l-2 1.7c1.7 1.7 2.7 4.2 2.8 7.5Z" fill="#0F172A" opacity=".75" />
      </svg>
    </div>
  );
};

const AppTopbar = () => {
  return (
    <header className="flex items-center justify-end border-b border-border px-1 pb-5">
      <div className="flex items-center gap-3">
        <UserAvatar />
        <div className="leading-tight">
          <div className="text-[14px] text-[#94A3B8]">Hello</div>
          <div className="text-[14px] font-semibold text-text-primary">
            James Smith
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppTopbar;
