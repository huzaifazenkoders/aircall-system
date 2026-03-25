import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";
import React from "react";
import LabelContainer from "./label-container";

const TextInput = ({
  label,
  error,
  value,
  setValue,
  startIcon,
  endIcon,
  containerClassName,
  labelClassName,
  ...rest
}: React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  value?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  setValue: ReactDispatch<string>;
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
          <span
            className={cn(
              "pointer-events-auto",
              "absolute",
              "left-4",
              "inline-flex",
              "items-center"
            )}
          >
            {startIcon}
          </span>
        )}
        <input
          {...rest}
          type="text"
          className={cn(
            "h-12",
            "w-full",
            "rounded-xl",
            "border",
            "border-border-primary",
            "bg-input",
            "px-4",
            "py-3",
            "text-base",
            "leading-6",
            "text-text-primary",
            "placeholder:text-text-secondary",
            "shadow-[0_1px_2px_rgba(16,24,40,0.05)]",
            "transition-colors",
            "outline-none",
            "focus:border-primary/40",
            "focus:ring-2",
            "focus:ring-primary/10",
            hasStartIcon && "pl-11",
            hasEndIcon && "pr-11",
            rest.className
          )}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            rest.onChange?.(e);
          }}
        />
        {hasEndIcon && (
          <span
            className={cn(
              "pointer-events-auto",
              "absolute",
              "right-4",
              "inline-flex",
              "items-center"
            )}
          >
            {endIcon}
          </span>
        )}
      </div>
    </LabelContainer>
  );
};

export default TextInput;
