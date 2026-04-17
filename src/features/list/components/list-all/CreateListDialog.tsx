"use client";

import React from "react";
import { ChevronDownIcon, ChevronUpIcon, Loader2Icon } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  useCreateList,
  useUpdateList
} from "@/features/list/services/listService";
import { useGetWorkflows } from "@/features/workflows/services/workflowService";
import { useGetGroups } from "@/features/groups/services/groupService";
import { useGetUsers } from "@/features/users/services/userService";
import { transformInfiniteData } from "@/utils/infiniteQueryUtils";
import { handleMutationError } from "@/utils/handleMutationError";
import { listKeys } from "@/features/list/query-keys";
import {
  AssignType,
  CALL_TYPES,
  CallType,
  ListDetail
} from "@/features/list/types/listTypes";
import RadioSelector from "../RadioSelector";
import TextArea from "@/components/ui/text-area";

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),
  description: Yup.string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .required("Description is required"),
  call_type: Yup.string()
    .oneOf([...CALL_TYPES], "Invalid call type")
    .required("Call type is required"),
  workflow_id: Yup.string().trim().required("Workflow template is required"),
  priority: Yup.number()
    .min(1, "Priority must be at least 1")
    .max(99, "Priority must be at most 99")
    .integer("Priority must be a whole number")
    .required("Priority is required"),
  cooldown_minimum_hours: Yup.number()
    .min(0, "Hours cannot be negative")
    .max(999, "Hours must be at most 999")
    .integer("Hours must be a whole number")
    .required("Hours are required"),
  cooldown_minimum_minutes: Yup.number()
    .min(0, "Minutes cannot be negative")
    .max(59, "Minutes must be between 0 and 59")
    .integer("Minutes must be a whole number")
    .required("Minutes are required"),
  assign_type: Yup.string()
    .oneOf(["group", "individual"], "Invalid assignment type")
    .required(),
  list_type: Yup.string()
    .oneOf(["shared", "individual"], "Invalid list type")
    .required("List type is required"),
  group_ids: Yup.array().when(["assign_type", "list_type"], {
    is: (assign_type: string, list_type: string) =>
      assign_type === "group" && list_type === "shared",
    then: (s) =>
      s
        .min(1, "Select at least one group")
        .required("At least one group is required"),
    otherwise: (s) => s
  }),
  user_ids: Yup.array().when(["assign_type", "list_type"], {
    is: (assign_type: string, list_type: string) =>
      assign_type === "individual" && list_type === "shared",
    then: (s) =>
      s
        .min(1, "Select at least one user")
        .required("At least one user is required"),
    otherwise: (s) => s
  })
});

const CreateListDialog = ({
  open,
  onOpenChange,
  mode = "create",
  initialList
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
  initialList?: ListDetail | null;
}) => {
  const queryClient = useQueryClient();
  const { mutate: createList, isPending } = useCreateList();
  const { mutate: updateList, isPending: isUpdating } = useUpdateList();
  const isSubmitting = isPending || isUpdating;

  const { data: workflowsData } = useGetWorkflows({ limit: 100 });
  const workflows = transformInfiniteData(workflowsData, "data");

  const { data: groupsData } = useGetGroups({ limit: 100 });
  const groups = transformInfiniteData(groupsData, "data");

  const { data: usersData } = useGetUsers({ limit: 100, role: "sales_person" });
  const users = transformInfiniteData(usersData, "data");

  const [groupOpen, setGroupOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);

  const initialValues = React.useMemo(
    () => ({
      name: initialList?.name ?? "",
      description: initialList?.description ?? "",
      call_type: (initialList?.call_type || "hot_lead") as CallType,
      workflow_id: initialList?.workflow?.id ?? "",
      priority: initialList?.priority ?? 1,
      cooldown_minimum_hours: initialList?.cooldown_minimum_hours ?? 0,
      cooldown_minimum_minutes: initialList?.cooldown_minimum_minutes ?? 0,
      assign_type: (initialList?.assign_type ?? "group") as AssignType,
      list_type: (initialList?.list_type ?? "shared") as
        | "shared"
        | "individual",
      group_ids: initialList
        ? Array.from(
            new Set(
              initialList.assignments
                .filter((assignment) => assignment.group?.id)
                .map((assignment) => assignment.group!.id)
            )
          )
        : ([] as string[]),
      user_ids: initialList
        ? Array.from(
            new Set(
              initialList.assignments
                .filter((assignment) => assignment.user?.id)
                .map((assignment) => assignment.user!.id)
            )
          )
        : ([] as string[])
    }),
    [initialList]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        call_type: values.call_type,
        workflow_id: values.workflow_id.trim(),
        priority: values.priority,
        cooldown_minimum_hours: values.cooldown_minimum_hours,
        cooldown_minimum_minutes: values.cooldown_minimum_minutes,
        assign_type: values.assign_type,
        list_type: values.list_type,
        group_ids: values.assign_type === "group" ? values.group_ids : [],
        user_ids: values.assign_type === "individual" ? values.user_ids : []
      };

      const onSuccess = () => {
        toast.success(
          mode === "edit"
            ? "List updated successfully"
            : "List created successfully"
        );
        queryClient.invalidateQueries({ queryKey: listKeys.all });
        if (initialList?.id) {
          queryClient.invalidateQueries({
            queryKey: listKeys.detail(initialList.id)
          });
        }
        onOpenChange(false);
        formik.resetForm();
      };

      if (mode === "edit" && initialList?.id) {
        updateList(
          {
            payload: {
              id: initialList.id,
              ...payload
            }
          },
          {
            onSuccess,
            onError: handleMutationError
          }
        );
        return;
      }

      createList(
        { payload },
        {
          onSuccess,
          onError: handleMutationError
        }
      );
    }
  });

  const toggleGroup = (id: string) => {
    const next = formik.values.group_ids.includes(id)
      ? formik.values.group_ids.filter((g) => g !== id)
      : [...formik.values.group_ids, id];
    formik.setFieldValue("group_ids", next);
  };

  const toggleUser = (id: string) => {
    const next = formik.values.user_ids.includes(id)
      ? formik.values.user_ids.filter((u) => u !== id)
      : [...formik.values.user_ids, id];
    formik.setFieldValue("user_ids", next);
  };

  const handleClose = (val: boolean) => {
    if (!val) formik.resetForm();
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl overflow-y-auto custom-scrollbar max-h-[98dvh]">
        <DialogHeader>
          <div className="min-w-0">
            <DialogTitle>
              {mode === "edit" ? "Edit List" : "Create List"}
            </DialogTitle>
            <DialogDescription>
              Manage priority based lead routing and assignment rules for your
              outbound sales team.
            </DialogDescription>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <DialogBody className="space-y-5">
            <Field label="List Name">
              <TextInput
                id="name"
                value={formik.values.name}
                setValue={(v) => formik.setFieldValue("name", v)}
                onBlur={formik.handleBlur}
                placeholder="eg, Gold Cost Event"
                className="px-4 text-sm bg-transparent"
                error={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : undefined
                }
              />
            </Field>

            <Field label="Description">
              <TextArea
                id="description"
                value={formik.values.description}
                setValue={(v) => formik.setFieldValue("description", v)}
                onBlur={formik.handleBlur}
                placeholder="eg, Follow-up list for gold coast event leads"
                className="px-4 text-sm bg-transparent"
                error={
                  formik.touched.description
                    ? formik.errors.description
                    : undefined
                }
              />
            </Field>

            <div className="grid grid-cols-2 gap-6">
              <Field
                label="Call Type"
                error={
                  formik.touched.call_type ? formik.errors.call_type : undefined
                }
              >
                <Select
                  value={formik.values.call_type}
                  onValueChange={(v) => formik.setFieldValue("call_type", v)}
                >
                  <SelectTrigger className="h-11 w-full capitalize border border-border-primary px-4 text-sm text-muted-foreground">
                    <SelectValue placeholder="Select call type">
                      {formik.values.call_type.replaceAll("_", " ")}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="hot_lead">Hot Lead</SelectItem>
                    <SelectItem value="warm_lead">Warm Lead</SelectItem>
                    <SelectItem value="cold_lead">Cold Lead</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field
                label="Assign Workflow Template"
                error={
                  formik.touched.workflow_id
                    ? formik.errors.workflow_id
                    : undefined
                }
              >
                <Select
                  value={formik.values.workflow_id}
                  onValueChange={(v) => formik.setFieldValue("workflow_id", v)}
                >
                  <SelectTrigger className="h-11 capitalize border border-border-primary w-full px-4 text-sm text-muted-foreground">
                    <SelectValue placeholder="Select template">
                      {
                        workflows.find(
                          (t) => t.id === formik.values.workflow_id
                        )?.name
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    {workflows.map((w) => (
                      <SelectItem key={w?.id} value={w?.id ?? ""}>
                        {w?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Field
                label="List Type"
                error={
                  formik.touched.list_type ? formik.errors.list_type : undefined
                }
              >
                <Select
                  value={formik.values.list_type}
                  onValueChange={(v) => formik.setFieldValue("list_type", v)}
                  disabled={
                    initialList && initialList?.list_type === "individual"
                      ? true
                      : false
                  }
                >
                  <SelectTrigger className="h-11 capitalize border border-border-primary w-full px-4 text-sm text-muted-foreground">
                    <SelectValue placeholder="Select list type" />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false}>
                    <SelectItem value="shared">Shared</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Priority Level">
                <div className="flex items-center gap-2">
                  <TextInput
                    id="priority"
                    value={String(formik.values.priority)}
                    setValue={(v) =>
                      formik.setFieldValue("priority", Number(v) || 1)
                    }
                    onBlur={formik.handleBlur}
                    className="px-4 text-sm bg-transparent w-full"
                    containerClassName="w-full"
                    error={
                      formik.touched.priority
                        ? formik.errors.priority
                        : undefined
                    }
                  />
                  <div className="grid grid-rows-2 overflow-hidden rounded-xl">
                    <button
                      type="button"
                      className="grid place-items-center text-muted-foreground hover:text-primary"
                      onClick={() =>
                        formik.setFieldValue(
                          "priority",
                          Math.min(99, formik.values.priority + 1)
                        )
                      }
                    >
                      <ChevronUpIcon className="size-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="grid place-items-center text-muted-foreground hover:text-primary"
                      onClick={() =>
                        formik.setFieldValue(
                          "priority",
                          Math.max(1, formik.values.priority - 1)
                        )
                      }
                    >
                      <ChevronDownIcon className="size-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  1 is highest priority. Leads will remain in the highest
                  priority list.
                </p>
              </Field>
            </div>

            <Field label="Minimum Hours Between Calls">
              <div className="grid grid-cols-2 gap-6">
                <TextInput
                  id="cooldown_minimum_hours"
                  value={String(formik.values.cooldown_minimum_hours)}
                  setValue={(v) =>
                    formik.setFieldValue(
                      "cooldown_minimum_hours",
                      Number(v) || 0
                    )
                  }
                  onBlur={formik.handleBlur}
                  endIcon={
                    <span className="text-xs font-medium text-muted-foreground">
                      hr
                    </span>
                  }
                  className="px-4 pr-12 text-sm bg-transparent"
                  error={
                    formik.touched.cooldown_minimum_hours
                      ? formik.errors.cooldown_minimum_hours
                      : undefined
                  }
                />
                <TextInput
                  id="cooldown_minimum_minutes"
                  value={String(formik.values.cooldown_minimum_minutes)}
                  setValue={(v) =>
                    formik.setFieldValue(
                      "cooldown_minimum_minutes",
                      Number(v) || 0
                    )
                  }
                  onBlur={formik.handleBlur}
                  endIcon={
                    <span className="text-xs font-medium text-muted-foreground">
                      Min
                    </span>
                  }
                  className="px-4 pr-12 text-sm bg-transparent"
                  error={
                    formik.touched.cooldown_minimum_minutes
                      ? formik.errors.cooldown_minimum_minutes
                      : undefined
                  }
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Prevents the same contact from being called multiple times
                within this time frame.
              </p>
            </Field>

            {initialList && initialList?.list_type === "individual" ? null : (
              <>
                <Field label="Assignation">
                  <div className="grid grid-cols-2 gap-4">
                    <RadioSelector
                      label="Assign List to Group"
                      checked={formik.values.assign_type === "group"}
                      onClick={() =>
                        formik.setFieldValue("assign_type", "group")
                      }
                    />
                    <RadioSelector
                      label="Assign List to Individual"
                      checked={formik.values.assign_type === "individual"}
                      onClick={() =>
                        formik.setFieldValue("assign_type", "individual")
                      }
                    />
                  </div>
                </Field>

                {formik.values.assign_type === "group" ? (
                  <Field
                    label=""
                    error={
                      formik.touched.group_ids
                        ? (formik.errors.group_ids as string)
                        : undefined
                    }
                  >
                    <DropdownMenu open={groupOpen} onOpenChange={setGroupOpen}>
                      <DropdownMenuTrigger
                        render={
                          <button
                            type="button"
                            className={cn(
                              "flex h-11 w-full items-center rounded-lg justify-between border px-4 text-sm text-muted-foreground",
                              groupOpen && "border-secondary"
                            )}
                          >
                            <span className="truncate">
                              {formik.values.group_ids.length > 0
                                ? groups
                                    .filter((g) =>
                                      formik.values.group_ids.includes(
                                        g?.id ?? ""
                                      )
                                    )
                                    .map((g) => g?.name)
                                    .join(", ")
                                : "Select group"}
                            </span>
                            <ChevronDownIcon
                              className="size-4"
                              aria-hidden="true"
                            />
                          </button>
                        }
                      />
                      <DropdownMenuContent
                        className="max-h-44 w-(--anchor-width) p-2"
                        sideOffset={8}
                      >
                        {groups.map((g) => (
                          <DropdownMenuCheckboxItem
                            key={g?.id}
                            checked={formik.values.group_ids.includes(
                              g?.id ?? ""
                            )}
                            onCheckedChange={() => toggleGroup(g?.id ?? "")}
                            onSelect={(e) => e.preventDefault()}
                            className="rounded-lg px-3 py-2 text-sm"
                          >
                            <span className="flex-1 truncate text-foreground">
                              {g?.name}{" "}
                              <span className="text-muted-foreground">
                                ({g?.total_users ?? 0} users)
                              </span>
                            </span>
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Field>
                ) : (
                  <Field
                    label=""
                    error={
                      formik.touched.user_ids
                        ? (formik.errors.user_ids as string)
                        : undefined
                    }
                  >
                    <DropdownMenu open={userOpen} onOpenChange={setUserOpen}>
                      <DropdownMenuTrigger
                        render={
                          <button
                            type="button"
                            className={cn(
                              "flex h-11 w-full items-center rounded-lg justify-between border bg-background px-4 text-sm text-muted-foreground",
                              userOpen && "border-secondary"
                            )}
                          >
                            <span className="truncate">
                              {formik.values.user_ids.length > 0
                                ? users
                                    .filter((u) =>
                                      formik.values.user_ids.includes(
                                        u?.id ?? ""
                                      )
                                    )
                                    .map(
                                      (u) => `${u?.first_name} ${u?.last_name}`
                                    )
                                    .join(", ")
                                : "Select individuals"}
                            </span>
                            <ChevronDownIcon
                              className="size-4"
                              aria-hidden="true"
                            />
                          </button>
                        }
                      />
                      <DropdownMenuContent
                        className="max-h-44 w-(--anchor-width) p-2"
                        sideOffset={8}
                      >
                        {users.map((u) => (
                          <DropdownMenuCheckboxItem
                            key={u?.id}
                            checked={formik.values.user_ids.includes(
                              u?.id ?? ""
                            )}
                            onCheckedChange={() => toggleUser(u?.id ?? "")}
                            onSelect={(e) => e.preventDefault()}
                            className="rounded-lg px-3 py-2 text-sm"
                          >
                            <span className="flex-1 truncate text-foreground">
                              {u?.first_name} {u?.last_name}{" "}
                              <span className="text-muted-foreground">
                                ({u?.email})
                              </span>
                            </span>
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Field>
                )}
              </>
            )}
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="h-11 px-7 text-sm font-medium"
              onClick={() => handleClose(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 px-7 text-sm font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : mode === "edit" ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Field = ({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    {label && (
      <label className="text-sm font-medium text-foreground">{label}</label>
    )}
    <div className={cn(label && "mt-2")}>{children}</div>
    {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
  </div>
);

export default CreateListDialog;
