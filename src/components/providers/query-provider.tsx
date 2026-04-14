"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "react-hot-toast";
import { ProgressProvider } from "@bprogress/next/app";
import YupSchemaExtensions from "@/schema/schema-extensions";

type Props = {
  children: React.ReactNode;
};

export default function QueryProvider({ children }: Props) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1
          },
          mutations: {
            retry: 0
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          success: {
            iconTheme: {
              primary: "#15B79F",
              secondary: ""
            },
            style: {
              color: "var(--primary)",
              background: "#e8f8f5"
            }
          },
          error: {
            style: {
              overflowWrap: "break-word"
            }
          }
        }}
      />
      <ProgressProvider
        height="3px"
        color="#2FBF9B"
        options={{ showSpinner: false }}
      >
        <YupSchemaExtensions />
        {children}
      </ProgressProvider>
    </QueryClientProvider>
  );
}
