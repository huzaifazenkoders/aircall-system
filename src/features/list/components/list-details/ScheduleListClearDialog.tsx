"use client";

import React from "react";
import { CalendarIcon, Clock12Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import DateSelector from "@/components/custom/date-selector.component";
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
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ListCleanupRecurrenceType,
  ListCleanupType
} from "@/features/list/services/listService";
import RadioSelector from "../RadioSelector";
import TimeSelector from "@/components/ui/time-selector";
import moment from "moment";

type ScheduleListClearDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: {
    cleanup_type: ListCleanupType;
    run_date?: string;
    run_time: string;
    recurrence_type?: ListCleanupRecurrenceType;
    day_of_week?: number;
    week_of_month?: number;
    timezone: string;
  }) => void;
  isPending?: boolean;
};

type ScheduleType = ListCleanupType;

type ScheduleFormState = {
  scheduleType: ScheduleType;
  runDate: string;
  runTime: string;
  recurrenceType: "" | ListCleanupRecurrenceType;
  dayOfWeek: string;
  weekOfMonth: string;
  timezone: string;
};

const dayOptions = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 }
];

const weekOptions = [
  { label: "1st Week", value: 1 },
  { label: "2nd Week", value: 2 },
  { label: "3rd Week", value: 3 },
  { label: "4th Week", value: 4 },
  { label: "Last Week", value: -1 }
];

const recurrenceOptions = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" }
] as const satisfies ReadonlyArray<{
  label: string;
  value: ListCleanupRecurrenceType;
}>;

const getBrowserTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
};

const getInitialState = (): ScheduleFormState => ({
  scheduleType: "one_time" as ScheduleType,
  runDate: "",
  runTime: "",
  recurrenceType: "" as "" | ListCleanupRecurrenceType,
  dayOfWeek: "",
  weekOfMonth: "",
  timezone: getBrowserTimeZone()
});

const fieldLabelClassName =
  "mb-3 block text-sm font-medium text-text-secondary";
const triggerClassName =
  "h-11 capitalize w-full rounded-lg border-border-primary bg-white px-3 text-base text-text-primary shadow-[0_2px_8px_rgba(17,24,39,0.06)]";
const selectContentClassName = "rounded-lg py-1";
const selectItemClassName = "px-3 py-2 text-sm rounded-none";

const ScheduleListClearDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isPending
}: ScheduleListClearDialogProps) => {
  const [form, setForm] = React.useState(getInitialState);
  const [isDateOpen, setIsDateOpen] = React.useState(false);
  const [isWeeklyTimeOpen, setIsWeeklyTimeOpen] = React.useState(false);
  const [isMonthlyTimeOpen, setIsMonthlyTimeOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setForm(getInitialState());
      setIsDateOpen(false);
      setIsWeeklyTimeOpen(false);
      setIsMonthlyTimeOpen(false);
    }
  }, [open]);

  const isRecurring = form.scheduleType === "recurring";
  const isMonthly = form.recurrenceType === "monthly";
  const isWeekly = form.recurrenceType === "weekly";

  const isCreateDisabled = isPending;
  // (form.scheduleType === "one_time"
  //   ? !form.runDate || !form.runTime
  //   : !form.recurrenceType ||
  //     !form.runTime ||
  //     !form.dayOfWeek ||
  //     (isMonthly && !form.weekOfMonth));

  const handleSubmit = () => {
    if (isCreateDisabled) return;

    onSubmit({
      cleanup_type: form.scheduleType,
      run_date: form.scheduleType === "one_time" ? form.runDate : undefined,
      run_time: moment(form.runTime, "HH:mm", true).format("hh:mm A"),
      day_of_week: isRecurring ? Number(form.dayOfWeek) : undefined,
      week_of_month:
        isRecurring && isMonthly ? Number(form.weekOfMonth) : undefined,
      timezone: form.timezone,
      recurrence_type: form.recurrenceType || undefined
    });
  };

  const formattedRunDate = form.runDate
    ? new Date(form.runDate).toLocaleDateString()
    : "Select date";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg">
        <DialogHeader className="px-6 pt-6 pb-6">
          <div>
            <DialogTitle className="text-2xl text-text-primary font-medium">
              Schedule List Clear
            </DialogTitle>
            <DialogDescription className="mt-2 text-text-secondary">
              Set a time to clear this list automatically. Choose either a
              one-time scheduled clear or set a recurring schedule for this
              action.
            </DialogDescription>
          </div>
          <DialogIconClose className="size-8 [&_svg]:size-5 rounded-full" />
        </DialogHeader>

        <DialogBody className="space-y-6 px-6 py-6">
          <div>
            <p className={fieldLabelClassName}>Schedule Type</p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <RadioSelector
                checked={form.scheduleType === "one_time"}
                label="One-Time Clear"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    scheduleType: "one_time",
                    recurrenceType: "",
                    dayOfWeek: "",
                    weekOfMonth: ""
                  }))
                }
              />

              <RadioSelector
                checked={form.scheduleType === "recurring"}
                label="Recurring Schedule"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    scheduleType: "recurring"
                  }))
                }
              />
            </div>
          </div>

          {!isRecurring ? (
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className={fieldLabelClassName}>Date</span>
                <DropdownMenu open={isDateOpen} onOpenChange={setIsDateOpen}>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          triggerClassName,
                          "justify-between px-3 text-sm font-normal",
                          !form.runDate && "text-muted-foreground"
                        )}
                      >
                        {formattedRunDate}
                        <CalendarIcon className="size-4 text-muted-foreground" />
                      </Button>
                    }
                  />
                  <DateSelector
                    value={form.runDate ? new Date(form.runDate) : undefined}
                    setValue={(date) =>
                      setForm((prev) => ({
                        ...prev,
                        runDate: date.toISOString().slice(0, 10)
                      }))
                    }
                    onOpenChange={setIsDateOpen}
                    minDate={new Date()}
                  />
                </DropdownMenu>
              </label>
              <label className="block">
                <span className={fieldLabelClassName}>Time</span>
                <TimeSelector
                  open={isWeeklyTimeOpen}
                  onOpenChange={setIsWeeklyTimeOpen}
                  value={form.runTime || null}
                  setValue={(time) =>
                    setForm((prev) => ({
                      ...prev,
                      runTime: time
                    }))
                  }
                />
              </label>
            </div>
          ) : (
            <>
              <div>
                <p className={fieldLabelClassName}>Recurrence Type</p>
                <Select
                  value={form.recurrenceType}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      recurrenceType:
                        (value as ListCleanupRecurrenceType | null) ?? "",
                      dayOfWeek: "",
                      weekOfMonth: ""
                    }))
                  }
                >
                  <SelectTrigger className={triggerClassName}>
                    <SelectValue placeholder="Select type">
                      {
                        recurrenceOptions.find(
                          (e) => e.value === form.recurrenceType
                        )?.label
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className={selectContentClassName}>
                    {recurrenceOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className={selectItemClassName}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isWeekly ? (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <p className={fieldLabelClassName}>Day of the Week</p>
                    <Select
                      value={form.dayOfWeek}
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          dayOfWeek: value ?? ""
                        }))
                      }
                    >
                      <SelectTrigger className={triggerClassName}>
                        <SelectValue placeholder="Select day">
                          {
                            dayOptions.find(
                              (e) => Number(e.value) === Number(form.dayOfWeek)
                            )?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className={selectContentClassName}>
                        {dayOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className={selectItemClassName}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <label className="block">
                    <span className={fieldLabelClassName}>Time</span>
                    <TimeSelector
                      open={isWeeklyTimeOpen}
                      onOpenChange={setIsWeeklyTimeOpen}
                      value={form.runTime || null}
                      setValue={(time) =>
                        setForm((prev) => ({
                          ...prev,
                          runTime: time
                        }))
                      }
                    />
                  </label>
                </div>
              ) : null}

              {isMonthly ? (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div>
                    <p className={fieldLabelClassName}>Week of the Month</p>
                    <Select
                      value={form.weekOfMonth}
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          weekOfMonth: value ?? ""
                        }))
                      }
                    >
                      <SelectTrigger className={triggerClassName}>
                        <SelectValue placeholder="Select week">
                          {
                            weekOptions.find(
                              (e) =>
                                Number(e.value) === Number(form.weekOfMonth)
                            )?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className={selectContentClassName}>
                        {weekOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className={selectItemClassName}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <p className={fieldLabelClassName}>Day of the Week</p>
                    <Select
                      value={form.dayOfWeek}
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          dayOfWeek: value ?? ""
                        }))
                      }
                    >
                      <SelectTrigger className={triggerClassName}>
                        <SelectValue placeholder="Select day">
                          {
                            dayOptions.find(
                              (e) => Number(e.value) === Number(form.dayOfWeek)
                            )?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className={selectContentClassName}>
                        {dayOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className={selectItemClassName}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <label className="block">
                    <span className={fieldLabelClassName}>Time</span>
                    <TimeSelector
                      open={isMonthlyTimeOpen}
                      onOpenChange={setIsMonthlyTimeOpen}
                      value={form.runTime || null}
                      setValue={(time) =>
                        setForm((prev) => ({
                          ...prev,
                          runTime: time
                        }))
                      }
                    />
                  </label>
                </div>
              ) : null}
            </>
          )}
        </DialogBody>

        <DialogFooter className="justify-end gap-2 px-6 pb-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isCreateDisabled}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleListClearDialog;
