"use client";

import * as React from "react";
import moment from "moment";

import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "./dropdown-menu";
import { ClockIcon } from "lucide-react";

type TimeValue = string;

interface BaseSelectorProps {
  hideTrigger?: boolean;
  open?: boolean;
  onOpenChange?: ReactDispatch<boolean>;
}

const MainBackground = "bg-primary/10";
const BackgroundColor = "bg-background";
const MainBorder = "border-border-primary";

const selectorTriggerClassName = cn(
  "bg-background-secondary px-3 py-2 pr-10 relative w-full",
  "text-base text-text-primary flex items-center justify-start",
  "rounded-lg whitespace-nowrap cursor-pointer",
  "h-11",
  "w-full",
  "rounded-lg",
  "border",
  "border-border-primary",
  "bg-input",
  "text-base",
  "text-text-primary",
  "placeholder:text-text-secondary"
);

const selectorContentClassName = cn(
  "w-[310px] rounded-lg border p-3 shadow-md",
  BackgroundColor,
  MainBorder
);

const SelectorButton = React.forwardRef<
  HTMLButtonElement,
  {
    onClick?: VoidFunction;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
  }
>(({ onClick, children, className, disabled }, ref) => (
  <button
    ref={ref}
    type="button"
    disabled={disabled}
    onClick={() => !disabled && onClick?.()}
    className={cn(
      "flex h-9 min-w-9 items-center justify-center rounded-md p-3 text-sm whitespace-nowrap",
      disabled
        ? "cursor-not-allowed opacity-40"
        : "cursor-pointer hover:bg-background-secondary hover:text-text-primary",
      className
    )}
  >
    {children}
  </button>
));

SelectorButton.displayName = "SelectorButton";

const formatTimeValue = (time?: string | null) =>
  time ? moment(time, "HH:mm").format("hh:mm A") : "";

const detectSystem24HourFormat = () => {
  try {
    const formatter = new Intl.DateTimeFormat(undefined, { hour: "numeric" });

    return !formatter
      .formatToParts(new Date(2026, 0, 1, 13, 0))
      .some((part) => part.type === "dayPeriod");
  } catch {
    return false;
  }
};

const parseTimeParts = (value?: string | null) => {
  const parsed = value ? moment(value, "HH:mm") : moment("00:00", "HH:mm");

  return {
    hour24: parsed.hour(),
    minute: parsed.minute(),
    hour12: parsed.format("hh"),
    period: parsed.format("A") as "AM" | "PM"
  };
};

const composeTimeValue = ({
  hour24,
  hour12,
  minute,
  period,
  is24Hour
}: {
  hour24: number;
  hour12: string;
  minute: number;
  period: "AM" | "PM";
  is24Hour: boolean;
}) => {
  if (is24Hour) {
    return moment({ hour: hour24, minute }).format("HH:mm");
  }

  const normalizedHour = Number(hour12) % 12;
  const nextHour24 = period === "PM" ? normalizedHour + 12 : normalizedHour;

  return moment({ hour: nextHour24, minute }).format("HH:mm");
};

const getEffectiveHour24 = (hour12: string, period: "AM" | "PM") => {
  const h = Number(hour12) % 12; // 12 -> 0
  return period === "PM" ? h + 12 : h;
};

const TimeGrid = ({
  selectedValue,
  minuteStep = 1,
  minTime,
  onSelect
}: {
  selectedValue?: string | null;
  minuteStep?: number;
  minTime?: string | null;
  onSelect: (time: string) => void;
}) => {
  const [is24Hour, setIs24Hour] = React.useState(() =>
    detectSystem24HourFormat()
  );
  const hourRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const minuteRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const periodRefs = React.useRef<
    Record<"AM" | "PM", HTMLButtonElement | null>
  >({
    AM: null,
    PM: null
  });

  React.useEffect(() => {
    setIs24Hour(detectSystem24HourFormat());
  }, []);

  const parsed = parseTimeParts(selectedValue);
  const safeMinuteStep = Math.max(1, minuteStep);
  const parsedMin = minTime ? parseTimeParts(minTime) : null;

  const isHourDisabled = (hour: string) => {
    if (!parsedMin) return false;
    const effective = is24Hour
      ? Number(hour)
      : getEffectiveHour24(hour, parsed.period);
    return effective < parsedMin.hour24;
  };

  const isMinuteDisabled = (minute: string) => {
    if (!parsedMin) return false;
    const effectiveHour = is24Hour
      ? parsed.hour24
      : getEffectiveHour24(parsed.hour12, parsed.period);
    if (effectiveHour > parsedMin.hour24) return false;
    if (effectiveHour < parsedMin.hour24) return true;
    return Number(minute) < parsedMin.minute;
  };

  const isPeriodDisabled = (period: "AM" | "PM") => {
    if (!parsedMin) return false;
    // AM covers 00:00–11:59; disabled entirely if minTime is 12:00 or later
    if (period === "AM") return parsedMin.hour24 >= 12;
    return false;
  };

  const hours = is24Hour
    ? Array.from({ length: 24 }, (_, hour) => hour.toString().padStart(2, "0"))
    : Array.from({ length: 12 }, (_, index) =>
        (index + 1).toString().padStart(2, "0")
      );

  const minutes = Array.from(
    { length: Math.ceil(60 / safeMinuteStep) },
    (_, index) => (index * safeMinuteStep).toString().padStart(2, "0")
  ).filter((minute) => Number(minute) < 60);

  React.useEffect(() => {
    const selectedHourKey = is24Hour
      ? parsed.hour24.toString().padStart(2, "0")
      : parsed.hour12;
    const selectedMinuteKey = parsed.minute.toString().padStart(2, "0");

    hourRefs.current[selectedHourKey]?.scrollIntoView({ block: "center" });
    minuteRefs.current[selectedMinuteKey]?.scrollIntoView({ block: "center" });

    if (!is24Hour) {
      periodRefs.current[parsed.period]?.scrollIntoView({ block: "center" });
    }
  }, [is24Hour, parsed.hour12, parsed.hour24, parsed.minute, parsed.period]);

  const columnClassName =
    "max-h-56 overflow-y-auto rounded-md border border-border-primary p-1 pt-0 custom-scrollbar";

  return (
    <div
      className={cn(
        "grid gap-3 px-3",
        is24Hour ? "grid-cols-2" : "grid-cols-3"
      )}
    >
      <div className={columnClassName}>
        <p className="sticky top-0 z-10 mb-2 bg-background px-2 py-1 pt-2 text-xs font-medium text-text-secondary">
          Hour
        </p>
        <hr className="border-border-primary" />
        <div className="flex flex-col gap-1">
          {hours.map((hour) => {
            const isSelected = is24Hour
              ? parsed.hour24 === Number(hour)
              : parsed.hour12 === hour;
            const hourDisabled = isHourDisabled(hour);

            return (
              <SelectorButton
                key={hour}
                ref={(node) => {
                  hourRefs.current[hour] = node;
                }}
                disabled={hourDisabled}
                onClick={() =>
                  onSelect(
                    composeTimeValue({
                      hour24: Number(hour),
                      hour12: hour,
                      minute: parsed.minute,
                      period: parsed.period,
                      is24Hour
                    })
                  )
                }
                className={cn(
                  "justify-start font-medium",
                  isSelected &&
                    `${MainBackground} text-safed hover:${MainBackground}`
                )}
              >
                {hour}
              </SelectorButton>
            );
          })}
        </div>
      </div>

      <div className={columnClassName}>
        <p className="sticky top-0 z-10 mb-2 bg-background px-2 py-1 pt-2 text-xs font-medium text-text-secondary">
          Minute
        </p>
        <hr className="border-border-primary" />
        <div className="flex flex-col gap-1">
          {minutes.map((minute) => {
            const isSelected = parsed.minute === Number(minute);
            const minuteDisabled = isMinuteDisabled(minute);

            return (
              <SelectorButton
                key={minute}
                ref={(node) => {
                  minuteRefs.current[minute] = node;
                }}
                disabled={minuteDisabled}
                onClick={() =>
                  onSelect(
                    composeTimeValue({
                      hour24: parsed.hour24,
                      hour12: parsed.hour12,
                      minute: Number(minute),
                      period: parsed.period,
                      is24Hour
                    })
                  )
                }
                className={cn(
                  "justify-start font-medium",
                  isSelected &&
                    `${MainBackground} text-safed hover:${MainBackground}`
                )}
              >
                {minute}
              </SelectorButton>
            );
          })}
        </div>
      </div>

      {!is24Hour && (
        <div className={columnClassName}>
          <p className="sticky top-0 z-10 mb-2 bg-background px-2 py-1 pt-2 text-xs font-medium text-text-secondary">
            Period
          </p>
          <hr className="border-border-primary" />
          <div className="flex flex-col gap-1">
            {(["AM", "PM"] as const).map((period) => {
              const isSelected = parsed.period === period;
              const periodDisabled = isPeriodDisabled(period);

              return (
                <SelectorButton
                  key={period}
                  ref={(node) => {
                    periodRefs.current[period] = node;
                  }}
                  disabled={periodDisabled}
                  onClick={() =>
                    onSelect(
                      composeTimeValue({
                        hour24: parsed.hour24,
                        hour12: parsed.hour12,
                        minute: parsed.minute,
                        period,
                        is24Hour: false
                      })
                    )
                  }
                  className={cn(
                    "justify-start font-medium",
                    isSelected &&
                      `${MainBackground} text-safed hover:${MainBackground}`
                  )}
                >
                  {period}
                </SelectorButton>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const SelectorContent = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <DropdownMenuContent
    translate="no"
    sideOffset={8}
    className={cn(selectorContentClassName, className)}
  >
    {children}
  </DropdownMenuContent>
);

const SelectorRoot = ({
  hideTrigger,
  open,
  onOpenChange,
  triggerLabel,
  children,
  triggerClassName
}: BaseSelectorProps & {
  triggerLabel: string;
  children: React.ReactNode;
  triggerClassName?: string;
}) => (
  <DropdownMenu open={open} onOpenChange={onOpenChange}>
    {hideTrigger ? null : (
      <DropdownMenuTrigger
        translate="no"
        className={cn(selectorTriggerClassName, triggerClassName)}
      >
        {triggerLabel}
        <ClockIcon className="size-5 absolute right-3 text-text-secondary" />
      </DropdownMenuTrigger>
    )}
    {children}
  </DropdownMenu>
);

interface Props extends BaseSelectorProps {
  value?: TimeValue | null;
  setValue?: (value: TimeValue) => void;
  minuteStep?: number;
  minTime?: string | null;
}

const TimeSelector = ({ value, setValue, minuteStep = 1, minTime, ...rest }: Props) => {
  return (
    <SelectorRoot
      {...rest}
      triggerLabel={value ? formatTimeValue(value) : "Select Time"}
      triggerClassName={value ? "text-text-primary" : "text-text-secondary"}
    >
      <SelectorContent className="w-[320px] px-0">
        <TimeGrid
          selectedValue={value}
          minuteStep={minuteStep}
          minTime={minTime}
          onSelect={(time) => {
            setValue?.(time);
            rest.onOpenChange?.(false);
          }}
        />
      </SelectorContent>
    </SelectorRoot>
  );
};

export default TimeSelector;
