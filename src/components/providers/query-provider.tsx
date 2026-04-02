"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "react-hot-toast";

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
              background:
                "linear-gradient(0deg, #15B79E, #15B79E), linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))"
            }
          },
          error: {
            style: {
              overflowWrap: "break-word"
            }
          }
        }}
      />
      {children}
    </QueryClientProvider>
  );
}
