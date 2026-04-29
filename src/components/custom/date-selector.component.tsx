"use client";
import moment from "moment";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { VoidFunctionWithBooleanArg } from "@/types/common";

// --------------------------------------------------------------
//
//                  Types and Interfaces
//
// --------------------------------------------------------------

export type ViewType = "year" | "month" | "date";

interface MonthViewProps {
  viewDate: Date;
  onMonthSelect: (month: number) => void;
}

interface DateViewProps {
  viewDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

interface YearViewProps {
  viewDate: Date;
  onYearSelect: (year: number) => void;
}

interface ReturnClassessProps {
  dateDisabled: boolean;
  selected: boolean;
  isCurrentMonth: boolean;
  today: boolean;
}

interface Props {
  value?: Date;
  setValue?: (_args: Date) => void;
  onClear?: () => void;
  open?: boolean;
  onOpenChange?: VoidFunctionWithBooleanArg;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  triggerClassName?: string;
  /** When true, renders only DropdownMenuContent (caller owns the DropdownMenu + trigger) */
  hideTrigger?: boolean;
}

interface ButtonProps {
  onClick?: VoidFunction;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

// --------------------------------------------------------------
//
//                  Styles and Classes
//
// --------------------------------------------------------------

const MainBackground = "bg-primary/20";
const SecondaryBackground = "bg-background-secondary";
const BackgroundColor = "bg-white";

const TextColorMain = "text-text-primary";
const TextColorSecondary = "text-text-secondary";
const TextColorDisabled = "text-gray-400";

const MainBorder = "border-border-primary";

// --------------------------------------------------------------
//
//                          Components
//
// --------------------------------------------------------------

// ==================|| MAIN COMPONENT ||==================

const DateSelector = ({
  setValue,
  value,
  onClear,
  open,
  onOpenChange,
  disabledDates,
  minDate,
  maxDate,
  placeholder = "Select Date",
  triggerClassName,
  hideTrigger = false
}: Props) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;

  const handleOpenChange = (next: boolean) => {
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null);
  const [currentView, setCurrentView] = useState<ViewType>("date");
  const [viewDate, setViewDate] = useState<Date>(value ?? new Date());

  React.useEffect(() => {
    setSelectedDate(value ?? null);
  }, [value]);

  const goNext = () => {
    if (currentView === "date")
      setViewDate(moment(viewDate).add(1, "month").toDate());
    else if (currentView === "month")
      setViewDate(moment(viewDate).add(1, "year").toDate());
    else if (currentView === "year")
      setViewDate(moment(viewDate).add(10, "year").toDate());
  };

  const goPrev = () => {
    if (currentView === "date")
      setViewDate(moment(viewDate).subtract(1, "month").toDate());
    else if (currentView === "month")
      setViewDate(moment(viewDate).subtract(1, "year").toDate());
    else if (currentView === "year")
      setViewDate(moment(viewDate).subtract(10, "year").toDate());
  };

  const handleDateSelect = (date: Date) => {
    const dateDisabled = checkIfDateDisabled(
      date,
      disabledDates,
      minDate,
      maxDate
    );
    if (dateDisabled) return;

    setSelectedDate(date);
    if (date && setValue) {
      setValue(date);
    }
    setCurrentView("date");
    handleOpenChange(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    onClear?.();
  };

  const hasDate = !!value;
  const triggerLabel = hasDate
    ? moment(value).format("DD MMM YYYY")
    : placeholder;

  const dropdownContent = (
    <DropdownMenuContent
      translate="no"
      className={cn("w-[310px] p-3", BackgroundColor, MainBorder)}
    >
      <div className="flex justify-between items-center mb-5">
        <button
          className={cn(
            TextColorMain,
            "font-semibold hover:underline cursor-pointer"
          )}
          onClick={() => {
            if (currentView === "date") setCurrentView("month");
            else if (currentView === "month") setCurrentView("year");
          }}
        >
          {currentView === "date" && moment(viewDate).format("MMMM YYYY")}
          {currentView === "month" && moment(viewDate).format("YYYY")}
          {currentView === "year" &&
            `${moment(viewDate).year() - 4} - ${moment(viewDate).year() + 5}`}
        </button>
        <div className="flex items-start gap-3">
          <button
            className={cn(TextColorMain, "cursor-pointer")}
            onClick={goPrev}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className={cn(TextColorMain, "cursor-pointer")}
            onClick={goNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {currentView === "year" && (
        <YearView
          viewDate={viewDate}
          onYearSelect={(year) => {
            setViewDate(moment(viewDate).year(year).toDate());
            setCurrentView("month");
          }}
        />
      )}
      {currentView === "month" && (
        <MonthView
          viewDate={viewDate}
          onMonthSelect={(month) => {
            setViewDate(moment(viewDate).month(month).toDate());
            setCurrentView("date");
          }}
        />
      )}
      {currentView === "date" && (
        <DateView
          viewDate={viewDate}
          selectedDate={selectedDate}
          onDateSelect={(date) => handleDateSelect(date)}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}

      {/* Footer */}
      {currentView === "date" && hasDate && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => {
              handleClear();
              handleOpenChange(false);
            }}
            className="flex items-center gap-1 rounded-md border border-primary px-2 py-1 text-xs font-medium text-primary hover:bg-primary/5 hover:text-primary cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}
    </DropdownMenuContent>
  );

  if (hideTrigger) return dropdownContent;

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <div className="relative inline-flex">
        <DropdownMenuTrigger
          className={cn(
            "bg-background-secondary px-3 py-2 pe-10 relative w-full",
            "text-base rounded-lg whitespace-nowrap cursor-pointer",
            "flex items-center justify-between gap-2",
            "h-11 border border-border-primary",
            hasDate ? "text-text-primary" : "text-text-secondary",
            triggerClassName
          )}
        >
          {triggerLabel}
          {!hasDate && (
            <Calendar className="size-5 absolute right-3 pointer-events-none" />
          )}
        </DropdownMenuTrigger>
        {hasDate && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full p-0.5 text-text-secondary hover:bg-border-primary hover:text-text-primary cursor-pointer"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      {dropdownContent}
    </DropdownMenu>
  );
};

// ==================|| UTILITY FUNCTION ||==================

const checkIfDateDisabled = (
  date: Date,
  disabledDates?: Date[],
  minDate?: Date,
  maxDate?: Date
): boolean => {
  if (
    disabledDates &&
    disabledDates.some((disabledDate) =>
      moment(date).isSame(disabledDate, "day")
    )
  ) {
    return true;
  }

  if (minDate && moment(date).isBefore(moment(minDate), "day")) {
    return true;
  }
  if (maxDate && moment(date).isAfter(moment(maxDate), "day")) {
    return true;
  }

  return false;
};

const returnClassess = ({
  dateDisabled,
  selected,
  isCurrentMonth,
  today
}: ReturnClassessProps) => {
  const main = "text-sm font-medium rounded-full";
  let sec = "";

  if (dateDisabled) {
    sec = `${TextColorDisabled} !cursor-not-allowed hover:${TextColorDisabled}`;
  } else if (selected) {
    sec = `${MainBackground} hover:${MainBackground} text-safed hover:text-safed font-bold`;
  } else if (today) {
    sec = `font-bold ${SecondaryBackground}`;
  } else if (isCurrentMonth) {
    sec = TextColorMain;
  } else {
    sec = TextColorSecondary;
  }

  return `${main} ${sec}`;
};

// ==================|| DATE COMPONENT ||==================

const DateView: React.FC<DateViewProps> = ({
  viewDate,
  selectedDate,
  onDateSelect,
  disabledDates,
  minDate,
  maxDate
}) => {
  const start = moment(viewDate).startOf("month").startOf("week");
  const end = moment(viewDate).endOf("month").add(6, "day");

  const days: Date[] = [];
  let current = moment(start);
  while (current.isSameOrBefore(end)) {
    days.push(current.toDate());
    current = current.add(1, "day");
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
        <div
          key={d}
          className={cn("text-center font-medium text-sm", TextColorSecondary)}
        >
          {d}
        </div>
      ))}
      {days.map((day) => {
        const isCurrentMonth =
          moment(day).format("MM") === moment(viewDate).format("MM");
        const selected = selectedDate
          ? moment(day).isSame(selectedDate, "day")
          : false;
        const today = moment(day).isSame(moment(), "day");
        const dateDisabled = checkIfDateDisabled(
          day,
          disabledDates,
          minDate,
          maxDate
        );

        return (
          <Button
            key={day.toString()}
            className={cn(
              returnClassess({
                dateDisabled,
                isCurrentMonth,
                selected,
                today
              })
            )}
            onClick={() => onDateSelect(day)}
            disabled={dateDisabled}
          >
            {moment(day).date()}
          </Button>
        );
      })}
    </div>
  );
};

// ==================|| MONTH COMPONENT ||==================

const MonthView: React.FC<MonthViewProps> = ({ viewDate, onMonthSelect }) => {
  const months = Array.from({ length: 12 }, (_, i) => ({
    label: moment(viewDate).month(i).format("MMM"),
    date: moment(viewDate).month(i).toDate()
  }));

  return (
    <div className="grid grid-cols-3 gap-2">
      {months.map(({ label, date }, i) => {
        const isCurrentMonth = moment(date).isSame(moment(), "month");

        return (
          <Button
            key={i}
            onClick={() => onMonthSelect(i)}
            className={cn(
              "font-medium",
              isCurrentMonth && `font-bold ${SecondaryBackground}`
            )}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

// ==================|| YEAR COMPONENT ||==================

const YearView: React.FC<YearViewProps> = ({ viewDate, onYearSelect }) => {
  const startYear = Math.floor(moment(viewDate).year() / 10) * 10 - 1;
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);

  return (
    <div className="grid grid-cols-3 gap-2">
      {years.map((year) => {
        const isCurrentYear = moment().year() === year;

        return (
          <Button
            key={year}
            onClick={() => onYearSelect(year)}
            className={cn(
              "font-medium",
              isCurrentYear && `font-bold ${SecondaryBackground}`
            )}
          >
            {year}
          </Button>
        );
      })}
    </div>
  );
};

// ==================|| BUTTON COMPONENT ||==================

const Button = ({ onClick, children, className, disabled }: ButtonProps) => (
  <button
    onClick={() => !disabled && onClick && onClick()}
    disabled={disabled}
    className={cn(
      "h-9 min-w-9",
      "p-3",
      "cursor-pointer",
      "flex items-center justify-center",
      "rounded-md",
      "text-sm",
      !disabled && `hover:${SecondaryBackground}`,
      !disabled && `hover:${TextColorMain}`,
      disabled && "cursor-not-allowed",
      className
    )}
  >
    {children}
  </button>
);

export default DateSelector;
