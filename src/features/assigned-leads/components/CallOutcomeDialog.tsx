"use client";

import React from "react";
import moment from "moment";
import { CalendarIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogIconClose,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import TextArea from "@/components/ui/text-area";
import TimeSelector from "@/components/ui/time-selector";
import LabelContainer from "@/components/ui/label-container";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import DateSelector from "@/components/custom/date-selector.component";
import { useGetWorkflowDispositions } from "@/features/assigned-leads/services/assignedLeadService";
import { Loader2Icon } from "lucide-react";

const KEAP_NOTE_TEMPLATES = [
  "Follow-up template",
  "No answer template",
  "Callback template"
] as const;

const KEAP_TAGS = [
  "CALLBACK_SCHEDULED",
  "NO_ANSWER",
  "NOT_INTERESTED",
  "CONNECTED"
] as const;

type CallOutcomeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPending?: boolean;
  workflowId: string;
  onSubmit?: (data: {
    disposition: string;
    callbackDate: Date | null;
    callbackTime: string;
    personalNote: string;
    keapNoteTemplate: string;
    keapTag: string;
  }) => void;
};

const CallOutcomeDialog = ({
  open,
  onOpenChange,
  isPending,
  workflowId,
  onSubmit
}: CallOutcomeDialogProps) => {
  const [disposition, setDisposition] = React.useState<string | null>(null);
  const [callbackDate, setCallbackDate] = React.useState<Date | null>(null);
  const [callbackTime, setCallbackTime] = React.useState("");
  const [personalNote, setPersonalNote] = React.useState("");
  const [keapNoteTemplate, setKeapNoteTemplate] = React.useState<string | null>(
    null
  );
  const [keapTag, setKeapTag] = React.useState<string | null>(null);

  const { data: dispositionsData, isPending: isLoadingDispositions } =
    useGetWorkflowDispositions(workflowId);
  const dispositions = dispositionsData?.data ?? [];

  console.log("dispositions", dispositions);

  const isCallback = disposition === "Callback Scheduled";

  const handleSubmit = () => {
    onSubmit?.({
      disposition: String(disposition),
      callbackDate,
      callbackTime,
      personalNote,
      keapNoteTemplate: String(keapNoteTemplate),
      keapTag: String(keapTag)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[588px] rounded-[20px] p-0 gap-0">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-text-primary leading-8">
              Call Outcome
            </h2>
            <p className="text-sm text-muted-foreground leading-5">
              Record the result of this call to update the lead status.
            </p>
          </div>
          <DialogIconClose className="-mt-1 -mr-1 shrink-0" />
        </div>

        <div className="border-t border-border" />

        {/* Form body */}
        <div className="px-8 py-6 flex flex-col gap-5">
          {/* Disposition */}
          <LabelContainer label="Disposition">
            <Select value={disposition} onValueChange={setDisposition}>
              <SelectTrigger className="w-full h-11 text-base border-border-primary">
                <SelectValue placeholder="Select disposition" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-border bg-input py-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
                {isLoadingDispositions ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  dispositions.map((d) => (
                    <SelectItem
                      key={d.id}
                      value={d.name}
                      className="px-3 py-2 text-sm text-text-primary"
                    >
                      {d.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {isCallback && (
              <p className="text-xs text-muted-foreground mt-1">
                You will schedule the next call time.
              </p>
            )}
          </LabelContainer>

          {/* Date & Time — only shown for Callback Scheduled */}
          {isCallback && (
            <div className="grid grid-cols-2 gap-4">
              <LabelContainer label="Date">
                <DropdownMenu>
                  <DropdownMenuTrigger className="h-11 w-full rounded-lg border border-border-primary bg-input px-3 py-2 text-base text-left flex items-center justify-between">
                    <span
                      className={
                        callbackDate
                          ? "text-text-primary"
                          : "text-text-secondary"
                      }
                    >
                      {callbackDate
                        ? moment(callbackDate).format("DD MMM YYYY")
                        : "Select date"}
                    </span>
                    <CalendarIcon className="size-5 text-text-secondary shrink-0" />
                  </DropdownMenuTrigger>
                  <DateSelector
                    value={callbackDate ?? undefined}
                    setValue={setCallbackDate}
                  />
                </DropdownMenu>
              </LabelContainer>

              <LabelContainer label="Time">
                <TimeSelector value={callbackTime} setValue={setCallbackTime} />
              </LabelContainer>
            </div>
          )}

          {/* Personal Note */}
          <TextArea
            label="Personal Note"
            value={personalNote}
            setValue={setPersonalNote}
            placeholder="Add a personal note about this call..."
            rows={4}
          />

          {/* Apply Keap Note Template */}
          <LabelContainer label="Apply Keap Note Template">
            <Select
              value={keapNoteTemplate}
              onValueChange={setKeapNoteTemplate}
            >
              <SelectTrigger className="w-full h-11 text-base border-border-primary">
                <SelectValue placeholder="Select a keap note" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-border bg-input py-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
                {KEAP_NOTE_TEMPLATES.map((t) => (
                  <SelectItem
                    key={t}
                    value={t}
                    className="px-3 py-2 text-sm text-text-primary"
                  >
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </LabelContainer>

          {/* Keap Tag */}
          <LabelContainer label="Keap Tag">
            <Select value={keapTag} onValueChange={setKeapTag}>
              <SelectTrigger className="w-full h-11 text-base border-border-primary">
                <SelectValue placeholder="Select a keap tag" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-border bg-input py-2 shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
                {KEAP_TAGS.map((t) => (
                  <SelectItem
                    key={t}
                    value={t}
                    className="px-3 py-2 text-sm text-text-primary"
                  >
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </LabelContainer>
        </div>

        <div className="border-t border-border" />

        <DialogFooter className="px-8 py-5">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!disposition || isPending}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallOutcomeDialog;
