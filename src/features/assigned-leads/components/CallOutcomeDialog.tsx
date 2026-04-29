"use client";

import { CalendarIcon } from "lucide-react";
import moment from "moment";
import React from "react";

import DateSelector from "@/components/custom/date-selector.component";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import LabelContainer from "@/components/ui/label-container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import TextArea from "@/components/ui/text-area";
import TextInput from "@/components/ui/text-input";
import TimeSelector from "@/components/ui/time-selector";
import { useGetWorkflowDispositions } from "@/features/assigned-leads/services/assignedLeadService";
import { Loader2Icon } from "lucide-react";

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
  const dispositions = dispositionsData?.data?.dispositions ?? [];

  const isCallback = dispositions.some(
    (t) =>
      (t.disposition_type === "callback_scheduled" && t.id === disposition) ||
      (t.resulting_lead_status === "scheduled" && t.id === disposition)
  );

  const isPastDateTime = React.useMemo(() => {
    if (!isCallback || !callbackDate || !callbackTime) return false;
    const combined =
      moment(callbackDate).format("YYYY-MM-DD") + " " + callbackTime;
    return moment(combined, "YYYY-MM-DD HH:mm").isBefore(moment());
  }, [isCallback, callbackDate, callbackTime]);

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
    <Dialog open={open}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-147 rounded-[20px] p-0 gap-0">
        {/* Header */}
        <div className="px-4 pt-6 pb-5 flex justify-between items-start sm:px-8 sm:pt-8 sm:pb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-text-primary leading-8">
              Call Outcome
            </h2>
            <p className="text-sm text-muted-foreground leading-5">
              Record the result of this call to update the lead status.
            </p>
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Form body */}
        <div className="px-4 py-5 flex flex-col gap-5 sm:px-8 sm:py-6">
          {/* Disposition */}
          <LabelContainer label="Disposition" required>
            <Select value={disposition} onValueChange={setDisposition}>
              <SelectTrigger className="w-full h-11 text-base border-border-primary">
                <SelectValue
                  placeholder="Select disposition"
                  className={"capitalize"}
                >
                  {dispositions
                    .find((t) => t.id === disposition)
                    ?.disposition_type.replaceAll("_", " ")}
                </SelectValue>
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
                      value={d.id}
                      className="px-3 py-2 text-sm text-text-primary capitalize"
                    >
                      {d.disposition_type.replaceAll("_", " ")}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {disposition && (
              <p className="text-xs text-muted-foreground mt-1 capitalize">
                Resulting lead status:
                {dispositions
                  .find((_) => _.id === disposition)
                  ?.resulting_lead_status?.replaceAll("_", " ")}
              </p>
            )}
            {isCallback && (
              <p className="text-xs text-muted-foreground mt-1">
                You will schedule the next call time.
              </p>
            )}
          </LabelContainer>

          {/* Date & Time — only shown for Callback Scheduled */}
          {isCallback && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LabelContainer label="Date" required>
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
                    hideTrigger
                    value={callbackDate ?? undefined}
                    setValue={setCallbackDate}
                    onClear={() => setCallbackDate(null)}
                    minDate={new Date()}
                  />
                </DropdownMenu>
              </LabelContainer>

              <LabelContainer label="Time" required>
                <TimeSelector
                  value={callbackTime}
                  setValue={setCallbackTime}
                  minTime={
                    callbackDate && moment(callbackDate).isSame(moment(), "day")
                      ? moment().format("HH:mm")
                      : null
                  }
                />
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
          <TextInput
            label="Apply Keap Note Template"
            value={keapNoteTemplate || ""}
            setValue={(r) => setKeapNoteTemplate(r)}
            placeholder="Select a keap note"
          />

          {/* Keap Tag */}
          <TextInput
            label="Keap Tag"
            value={keapTag || ""}
            setValue={(r) => setKeapTag(r)}
            placeholder="Select a keap tag"
          />
        </div>

        <div className="border-t border-border" />

        <DialogFooter className="px-4 py-4 flex-col items-end gap-2 sm:px-8 sm:py-5">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!disposition || isPending || isPastDateTime}
          >
            Submit
          </Button>
          {isPastDateTime && (
            <p className="text-sm text-destructive">
              Cannot select date/time in the past
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallOutcomeDialog;
