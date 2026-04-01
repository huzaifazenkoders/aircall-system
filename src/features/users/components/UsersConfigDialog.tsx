"use client";

import React from "react";
import { ArrowLeftIcon, ChevronUpIcon } from "lucide-react";

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import TextInput from "@/components/ui/text-input";
import { cn } from "@/lib/utils";
import { usersStyles } from "@/features/users/styles/usersStyles";

const workflowOptions = [
  { label: "Default Sales Workflow", suffix: "(Default)" },
  { label: "High-Intent Lead Closer" },
  { label: "Trial User Conversion" }
];

const groupOptions = ["Sales", "Support", "Retention"];

const UsersConfigDialog = ({
  open,
  onOpenChange
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [keapId, setKeapId] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [selectedGroup, setSelectedGroup] = React.useState("");
  const [selectedWorkflow, setSelectedWorkflow] = React.useState(
    workflowOptions[0].label
  );

  React.useEffect(() => {
    if (!open) {
      setStep(1);
      setKeapId("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setSelectedGroup("");
      setSelectedWorkflow(workflowOptions[0].label);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={usersStyles.modalContent}>
        <DialogHeader className={usersStyles.modalHeader}>
          <div className="flex-1">
            <DialogTitle className={usersStyles.modalTitle}>
              {step === 1 ? (
                <>
                  <span>Add New User</span>
                </>
              ) : (
                <>
                  <ArrowLeftIcon className="mt-1 size-5 mb-3 shrink-0 text-[#64748B]" />
                  <span>List Configuration</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription className={usersStyles.modalSubtitle}>
              {step === 1
                ? "Create a new account and assign access permissions."
                : "Assign workflow template and configure cooldown for IDV list."}
            </DialogDescription>
          </div>

          <DialogIconClose
            className="mt-1 size-10 rounded-full text-[#64748B] hover:bg-muted"
            onClick={() => onOpenChange(false)}
          />
        </DialogHeader>

        <DialogBody className={usersStyles.modalBody}>
          {step === 1 ? (
            <div className="grid gap-5">
              <TextInput
                label="Keap Id"
                value={keapId}
                setValue={setKeapId}
                placeholder="eg. 123"
              />
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="First Name"
                  value={firstName}
                  setValue={setFirstName}
                  placeholder="eg. James"
                />
                <TextInput
                  label="Last Name"
                  value={lastName}
                  setValue={setLastName}
                  placeholder="eg. Williams"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Email"
                  value={email}
                  setValue={setEmail}
                  placeholder="eg. james@gmail.com"
                />
                <TextInput
                  label="Phone number"
                  value={phone}
                  setValue={setPhone}
                  placeholder="eg. +1 224 776 885"
                />
              </div>

              <div>
                <label className={usersStyles.sectionLabel}>
                  Add to Groups
                </label>
                <Select
                  value={selectedGroup}
                  onValueChange={(value) => setSelectedGroup(value ?? "")}
                >
                  <SelectTrigger className={usersStyles.triggerField}>
                    <SelectValue placeholder="Select groups" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupOptions.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <label className={usersStyles.sectionLabel}>
                  Assign Workflow Template
                </label>
                <Select
                  value={selectedWorkflow}
                  onValueChange={(value) => setSelectedWorkflow(value ?? "")}
                >
                  <SelectTrigger className={usersStyles.triggerField}>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {workflowOptions.map((option) => (
                      <SelectItem key={option.label} value={option.label}>
                        <span>{option.label}</span>
                        {option.suffix ? (
                          <span className={usersStyles.menuItemMuted}>
                            {option.suffix}
                          </span>
                        ) : null}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-8">
                <label className={usersStyles.sectionLabel}>
                  Minimum Hours Between Calls
                </label>
                <div className={usersStyles.cooldownGrid}>
                  <div className={usersStyles.timeField}>
                    <span className={usersStyles.timeValue}>12</span>
                    <span className={usersStyles.timeUnit}>hr</span>
                  </div>
                  <div className={usersStyles.timeField}>
                    <span className={usersStyles.timeValue}>30</span>
                    <span className={usersStyles.timeUnit}>Min</span>
                  </div>
                </div>

                <p className={usersStyles.helperText}>
                  Prevents the same contact from being called multiple times
                  within this time frame.
                </p>
              </div>
            </div>
          )}
        </DialogBody>

        <DialogFooter className={usersStyles.modalFooter}>
          {step === 2 ? (
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          )}
          <Button
            onClick={() => {
              if (step === 1) {
                setStep(2);
                return;
              }
              onOpenChange(false);
            }}
          >
            {step === 1 ? "Continue" : "Send Invitation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UsersConfigDialog;
