import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  label?: string;
  error?: string;
  htmlFor?: string;
  required?: boolean;
}

const LabelContainer = ({
  children,
  error,
  label,
  htmlFor,
  required
}: Props) => {
  return (
    <div className={cn("flex flex-col gap-2")}>
      {label && (
        <label htmlFor={htmlFor}>
          {label}
          {required && <span className="text-xl text-red-600 ms-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default LabelContainer;
