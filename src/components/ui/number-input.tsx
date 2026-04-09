import { cn } from "@/lib/utils";
import React from "react";
import LabelContainer from "./label-container";

const NumberInput = ({
  label,
  error,
  value,
  setValue,
  startIcon,
  endIcon,
  containerClassName,
  labelClassName,
  ...rest
}: Omit<React.ComponentProps<"input">, "value" | "setValue" | "type"> & {
  label?: string;
  error?: string;
  value?: number | "";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  setValue: (value: number | "") => void;
  containerClassName?: string;
  labelClassName?: string;
}) => {
  const hasStartIcon = Boolean(startIcon);
  const hasEndIcon = Boolean(endIcon);

  return (
    <LabelContainer
      error={error}
      htmlFor={rest.id}
      label={label}
      className={containerClassName}
      labelClassName={labelClassName}
      required={rest.required}
    >
      <div className={cn("relative", "flex", "items-center")}>
        {hasStartIcon && (
          <span className="pointer-events-auto absolute left-3 inline-flex items-center">
            {startIcon}
          </span>
        )}
        <input
          {...rest}
          type="number"
          inputMode="numeric"
          className={cn(
            "h-11",
            "w-full",
            "rounded-lg",
            "border",
            "border-border-primary",
            "bg-input",
            "px-3",
            "py-2",
            "text-base",
            "text-text-primary",
            "placeholder:text-text-secondary",
            hasStartIcon && "pl-10",
            hasEndIcon && "pr-10",
            rest.className
          )}
          value={value}
          onKeyDown={(e) => {
            if (
              !/^[0-9]$/.test(e.key) &&
              !["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)
            ) {
              e.preventDefault();
            }
            rest.onKeyDown?.(e);
          }}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              setValue("");
            } else {
              const num = Number(raw);
              if (!Number.isNaN(num)) setValue(num);
            }
            rest.onChange?.(e);
          }}
        />
        {hasEndIcon && (
          <span className="pointer-events-auto absolute right-3 inline-flex items-center">
            {endIcon}
          </span>
        )}
      </div>
    </LabelContainer>
  );
};

export default NumberInput;
