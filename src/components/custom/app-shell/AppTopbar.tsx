"use client";

import React, { useEffect } from "react";
import { LogOutIcon, MenuIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  useMe,
  useToggleAvailability
} from "@/features/users/services/userService";
import { deleteCookie } from "cookies-next/client";
import { usePathname, useRouter } from "next/navigation";
import { myListStyles } from "@/features/dialer/styles/dialerStyles";
import Toggle from "@/components/ui/toggle";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { handleMutationError } from "@/utils/handleMutationError";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/features/auth/query-keys";

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
        <path
          d="M31.4 40H34c0-3.9-1.2-7-3.4-9.2l-2 1.7c1.7 1.7 2.7 4.2 2.8 7.5Z"
          fill="#0F172A"
          opacity=".75"
        />
      </svg>
    </div>
  );
};

const AppTopbar = ({ openSidebar }: { openSidebar: VoidFunction }) => {
  const { data, isPending, isError } = useMe();
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

  const { mutate: toggleAvailability, isPending: toggling } =
    useToggleAvailability();

  useEffect(() => {
    if (
      data?.data?.role === "sales_person" &&
      data?.data?.has_reset_password &&
      !pathname.includes("/dialer-auth/set-password")
    ) {
      router.replace("/dialer-auth/set-password");
    }
  }, [data]);

  if (isPending || isError) {
    return null;
  }

  const name = data?.data?.first_name + " " + data?.data?.last_name;
  const isUnavailable = data?.data?.is_unavailable ?? false;

  const handleToggle = () => {
    toggleAvailability(undefined, {
      onSuccess: () => {
        toast.success(
          isUnavailable ? "You are now available" : "You are now unavailable"
        );
        queryClient.invalidateQueries();
        setConfirmDialogOpen(false);
      },
      onError: handleMutationError
    });
  };

  return (
    <div className="w-full flex items-center justify-between lg:justify-end border-b border-border">
      {data?.data?.role !== "sales_person" ? (
        <div className="flex items-center justify-center gap-2 lg:hidden pb-3">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={openSidebar}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      ) : null}
      <header className="flex items-center justify-end gap-2 px-3 md:px-5 pb-3">
        {data.data.role === "sales_person" ? (
          <div className="flex items-center gap-2 ml-auto">
            <span className={myListStyles.listCardToggleLabel}>
              {isUnavailable ? "Unavailable" : "Available"}
            </span>
            <button
              type="button"
              aria-label="Toggle availability"
              disabled={toggling}
              onClick={() => setConfirmDialogOpen(true)}
            >
              <Toggle active={!isUnavailable} />
            </button>
          </div>
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className={cn(
                  "flex items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-muted"
                )}
              >
                <UserAvatar />
                <div className="leading-tight">
                  <div className="text-[14px] text-[#94A3B8]">Hello</div>
                  <div className="text-[14px] font-semibold text-text-primary">
                    {name}
                  </div>
                </div>
              </button>
            }
          />

          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                deleteCookie("token");
                router.replace("/auth/sign-in");
                router.refresh();
              }}
            >
              <LogOutIcon className="size-4" aria-hidden="true" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <ConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        title={isUnavailable ? "Set as Available?" : "Set as Unavailable?"}
        description={
          isUnavailable
            ? "You will start receiving calls from your assigned lists."
            : "You will stop receiving calls until you set yourself as available again."
        }
        confirmLabel={isUnavailable ? "Set Available" : "Set Unavailable"}
        onConfirm={handleToggle}
      />
    </div>
  );
};

export default AppTopbar;
