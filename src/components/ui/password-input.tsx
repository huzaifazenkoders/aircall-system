import { cn } from "@/lib/utils";
import { ReactDispatch } from "@/types/common";
import React from "react";
import LabelContainer from "./label-container";

const PasswordInput = ({
  label,
  error,
  value,
  setValue,
  startIcon,
  containerClassName,
  labelClassName,
  showToggle = true,
  ...rest
}: Omit<React.ComponentProps<"input">, "type"> & {
  label?: string;
  error?: string;
  value?: string;
  startIcon?: React.ReactNode;
  setValue: ReactDispatch<string>;
  containerClassName?: string;
  labelClassName?: string;
  showToggle?: boolean;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const hasStartIcon = Boolean(startIcon);

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
          type={isVisible ? "text" : "password"}
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
            showToggle ? "pr-11" : "pr-4",
            rest.className
          )}
          {...rest}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            rest.onChange?.(e);
          }}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            className={cn(
              "absolute",
              "right-4",
              "inline-flex",
              "items-center",
              "text-text-secondary",
              "transition-colors",
              "hover:text-text-primary"
            )}
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? (
              <svg
                className={cn("size-5")}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 12c2.1-4.2 5.7-6.3 9-6.3s6.9 2.1 9 6.3c-2.1 4.2-5.7 6.3-9 6.3S5.1 16.2 3 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            ) : (
              <svg
                className={cn("size-5")}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 5.5 20 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9.9 9.9a3 3 0 0 0 4.24 4.24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6.4 6.4C4.9 7.6 3.7 9.4 3 12c2.1 4.2 5.7 6.3 9 6.3 1.6 0 3.2-.5 4.7-1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10.2 5.8c.6-.1 1.2-.2 1.8-.2 3.3 0 6.9 2.1 9 6.3-.5 1.1-1.1 2.1-1.8 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </LabelContainer>
  );
};

export default PasswordInput;
