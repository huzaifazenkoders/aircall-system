import React, { Fragment } from "react";

import AuthLayout from "@/features/auth/layout/AuthLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <style>
        {`
      :root{
        --input: oklch(0.922 0 0);
      }
      `}
      </style>
      <AuthLayout>{children}</AuthLayout>
    </Fragment>
  );
};

export default layout;
