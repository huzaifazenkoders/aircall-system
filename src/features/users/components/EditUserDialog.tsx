"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle
} from "@/components/ui/dialog";
import TextInput from "@/components/ui/text-input";
import PhoneInput from "@/components/ui/phone-input";
import { usersStyles } from "@/features/users/styles/usersStyles";
import { useUpdateUser } from "@/features/users/services/userService";
import { userKeys } from "@/features/users/query-keys";
import { handleMutationError } from "@/utils/handleMutationError";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required")
    .isValidEmail("Email is not valid"),
  first_name: Yup.string().trim().required("First name is required"),
  last_name: Yup.string().trim().required("Last name is required"),
  phone_number: Yup.string()
    .trim()
    .required("Phone number is required")
    .isValidPhoneNumber("Phone number is not valid")
});

const EditUserDialog = ({
  open,
  onOpenChange,
  user
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string | null;
  } | null;
}) => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const formik = useFormik({
    initialValues: {
      email: user?.email ?? "",
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      phone_number: user?.phone_number ?? ""
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (!user?.id) return;

      updateUser(
        {
          payload: {
            id: user.id,
            email: values.email.trim(),
            first_name: values.first_name.trim(),
            last_name: values.last_name.trim(),
            phone_number: values.phone_number.trim()
          }
        },
        {
          onSuccess: (res) => {
            toast.success(res.message || "User updated successfully");
            void queryClient.invalidateQueries({ queryKey: userKeys.all });
            void queryClient.invalidateQueries({
              queryKey: userKeys.detail(user.id)
            });
            onOpenChange(false);
          },
          onError: handleMutationError
        }
      );
    }
  });

  const e = formik.errors;
  const t = formik.touched;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.modalContent}>
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.modalTitle}>
              Edit User
            </DialogTitle>
            <DialogDescription className={usersStyles.modalSubtitle}>
              Update this user&apos;s contact information.
            </DialogDescription>
          </div>
          <DialogIconClose className="mt-1 size-10 rounded-full text-panel-muted hover:bg-muted" />
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <DialogBody className={usersStyles.modalBody}>
            <div className="grid gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="First Name"
                  required
                  value={formik.values.first_name}
                  setValue={(val) =>
                    void formik.setFieldValue("first_name", val)
                  }
                  placeholder="eg. James"
                  error={
                    t.first_name && e.first_name ? e.first_name : undefined
                  }
                />
                <TextInput
                  label="Last Name"
                  required
                  value={formik.values.last_name}
                  setValue={(val) =>
                    void formik.setFieldValue("last_name", val)
                  }
                  placeholder="eg. Williams"
                  error={t.last_name && e.last_name ? e.last_name : undefined}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Email"
                  required
                  value={formik.values.email}
                  setValue={(val) => void formik.setFieldValue("email", val)}
                  placeholder="eg. james@gmail.com"
                  error={t.email && e.email ? e.email : undefined}
                />
                <PhoneInput
                  label="Phone number"
                  required
                  value={formik.values.phone_number}
                  onChange={(val) =>
                    void formik.setFieldValue("phone_number", val)
                  }
                  placeholder="eg. +1 224 776 885"
                  error={
                    t.phone_number && e.phone_number
                      ? e.phone_number
                      : undefined
                  }
                />
              </div>
            </div>
          </DialogBody>

          <DialogFooter className={usersStyles.modalFooter}>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !user?.id}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
