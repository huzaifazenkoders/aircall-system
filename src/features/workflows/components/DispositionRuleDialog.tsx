"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogIconClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  emptyWorkflowRuleFormValues,
  workflowDispositionOptions,
  workflowKeepNoteTemplates,
  workflowKeepTagOptions,
  workflowLeadStatusOptions,
  WorkflowRuleFormValues,
} from "@/features/workflows/data/workflowsData";
import { workflowsStyles } from "@/features/workflows/styles/workflowsStyles";

const FormRadioCard = ({
  value,
  label,
  selected,
  onSelect,
}: {
  value: string;
  label: string;
  selected: boolean;
  onSelect: (value: string) => void;
}) => {
  return (
    <button
      type="button"
      className={workflowsStyles.radioCard}
      data-checked={selected}
      onClick={() => onSelect(value)}
    >
      <span
        className={workflowsStyles.radioControl}
        aria-hidden="true"
        data-checked={selected}
      />
      <span>{label}</span>
    </button>
  );
};

const DispositionRuleDialog = ({
  open,
  onOpenChange,
  initialValues,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: WorkflowRuleFormValues;
  onSave: (values: WorkflowRuleFormValues) => void;
}) => {
  const [values, setValues] = React.useState<WorkflowRuleFormValues>(
    initialValues ?? emptyWorkflowRuleFormValues
  );

  React.useEffect(() => {
    if (!open) {
      setValues(initialValues ?? emptyWorkflowRuleFormValues);
      return;
    }

    setValues(initialValues ?? emptyWorkflowRuleFormValues);
  }, [initialValues, open]);

  const isCooldown = values.resultingLeadStatus === "Cooldown";
  const canSave = Boolean(values.dispositionType && values.resultingLeadStatus);

  const handleFieldChange = <K extends keyof WorkflowRuleFormValues>(
    field: K,
    nextValue: WorkflowRuleFormValues[K]
  ) => {
    setValues((current) => ({
      ...current,
      [field]: nextValue,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={workflowsStyles.formDialogContent}>
        <DialogHeader className={workflowsStyles.dialogHeader}>
          <div>
            <DialogTitle className={workflowsStyles.dialogTitle}>
              Add Disposition Rule
            </DialogTitle>
          </div>
          <DialogIconClose />
        </DialogHeader>

        <DialogBody className={workflowsStyles.dialogBody}>
          <div className={workflowsStyles.fieldStack}>
            <div className={workflowsStyles.fieldGrid}>
              <div className={workflowsStyles.field}>
                <span className={workflowsStyles.fieldLabel}>Disposition Type</span>
                <Select
                  value={values.dispositionType}
                  onValueChange={(value) => {
                    if (value) {
                      handleFieldChange("dispositionType", value);
                    }
                  }}
                >
                  <SelectTrigger className={workflowsStyles.selectTrigger}>
                    <SelectValue placeholder="Select disposition" />
                  </SelectTrigger>
                  <SelectContent className={workflowsStyles.selectContent} align="start">
                    {workflowDispositionOptions.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className={workflowsStyles.selectItem}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className={workflowsStyles.field}>
                <span className={workflowsStyles.fieldLabel}>Resulting Lead Status</span>
                <Select
                  value={values.resultingLeadStatus}
                  onValueChange={(value) => {
                    if (value) {
                      handleFieldChange("resultingLeadStatus", value);
                    }
                  }}
                >
                  <SelectTrigger className={workflowsStyles.selectTrigger}>
                    <SelectValue placeholder="Select lead action" />
                  </SelectTrigger>
                  <SelectContent className={workflowsStyles.selectContent} align="start">
                    {workflowLeadStatusOptions.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className={workflowsStyles.selectItem}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isCooldown ? (
              <>
                <div className={workflowsStyles.field}>
                  <span className={workflowsStyles.fieldLabel}>Retry Strategy</span>
                  <RadioGroup
                    value={values.retryStrategy}
                    className={workflowsStyles.radioGrid}
                    onValueChange={(value) =>
                      value
                        ? handleFieldChange(
                            "retryStrategy",
                            value as WorkflowRuleFormValues["retryStrategy"]
                          )
                        : undefined
                    }
                  >
                    <FormRadioCard
                      value="retry"
                      label="Retry"
                      selected={values.retryStrategy === "retry"}
                      onSelect={(value) =>
                        handleFieldChange(
                          "retryStrategy",
                          value as WorkflowRuleFormValues["retryStrategy"]
                        )
                      }
                    />
                    <FormRadioCard
                      value="do-not-retry"
                      label="Do Not Retry"
                      selected={values.retryStrategy === "do-not-retry"}
                      onSelect={(value) =>
                        handleFieldChange(
                          "retryStrategy",
                          value as WorkflowRuleFormValues["retryStrategy"]
                        )
                      }
                    />
                  </RadioGroup>
                </div>

                <label className={workflowsStyles.field}>
                  <span className={workflowsStyles.fieldLabel}>Maximum Attempts</span>
                  <div className={workflowsStyles.suffixFieldWrap}>
                    <input
                      className={workflowsStyles.textInput}
                      value={values.maxAttempts}
                      onChange={(event) =>
                        handleFieldChange("maxAttempts", event.target.value)
                      }
                    />
                    <span className={workflowsStyles.suffixText}>attempts</span>
                  </div>
                </label>

                <div className={workflowsStyles.field}>
                  <span className={workflowsStyles.fieldLabel}>Cooldown Behavior</span>
                  <RadioGroup
                    value={values.cooldownBehavior}
                    className={workflowsStyles.radioGrid}
                    onValueChange={(value) =>
                      value
                        ? handleFieldChange(
                            "cooldownBehavior",
                            value as WorkflowRuleFormValues["cooldownBehavior"]
                          )
                        : undefined
                    }
                  >
                    <FormRadioCard
                      value="default"
                      label="Use List Default Cooldown"
                      selected={values.cooldownBehavior === "default"}
                      onSelect={(value) =>
                        handleFieldChange(
                          "cooldownBehavior",
                          value as WorkflowRuleFormValues["cooldownBehavior"]
                        )
                      }
                    />
                    <FormRadioCard
                      value="custom"
                      label="Custom Cooldown"
                      selected={values.cooldownBehavior === "custom"}
                      onSelect={(value) =>
                        handleFieldChange(
                          "cooldownBehavior",
                          value as WorkflowRuleFormValues["cooldownBehavior"]
                        )
                      }
                    />
                  </RadioGroup>
                </div>

                <div className={workflowsStyles.fieldGrid}>
                  <label className={workflowsStyles.field}>
                    <span className={workflowsStyles.fieldLabel}>
                      Custom Cooldown (Hours)
                    </span>
                    <div className={workflowsStyles.suffixFieldWrap}>
                      <input
                        className={workflowsStyles.textInput}
                        value={values.cooldownHours}
                        onChange={(event) =>
                          handleFieldChange("cooldownHours", event.target.value)
                        }
                      />
                      <span className={workflowsStyles.suffixText}>hr</span>
                    </div>
                  </label>

                  <label className={workflowsStyles.field}>
                    <span className="sr-only">Custom Cooldown Minutes</span>
                    <div className={workflowsStyles.suffixFieldWrap}>
                      <input
                        className={workflowsStyles.textInput}
                        value={values.cooldownMinutes}
                        onChange={(event) =>
                          handleFieldChange("cooldownMinutes", event.target.value)
                        }
                      />
                      <span className={workflowsStyles.suffixText}>Min</span>
                    </div>
                  </label>
                </div>

                <div className={workflowsStyles.field}>
                  <span className={workflowsStyles.fieldLabel}>Maximum Attempts Reached</span>
                  <Select
                    value={values.maxAttemptsReached}
                    onValueChange={(value) => {
                      if (value) {
                        handleFieldChange("maxAttemptsReached", value);
                      }
                    }}
                  >
                    <SelectTrigger className={workflowsStyles.selectTrigger}>
                      <SelectValue placeholder="Completed" />
                    </SelectTrigger>
                    <SelectContent className={workflowsStyles.selectContent} align="start">
                      {["Completed", "Invalid", "Banned"].map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className={workflowsStyles.selectItem}
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : null}

            <div className={workflowsStyles.field}>
              <span className={workflowsStyles.fieldLabel}>Apply Keap Note Template</span>
              <Select
                value={values.keepNoteTemplate}
                onValueChange={(value) => {
                  if (value) {
                    handleFieldChange("keepNoteTemplate", value);
                  }
                }}
              >
                <SelectTrigger className={workflowsStyles.selectTrigger}>
                  <SelectValue placeholder="Select a keap note" />
                </SelectTrigger>
                <SelectContent className={workflowsStyles.selectContent} align="start">
                  {workflowKeepNoteTemplates.slice(1).map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className={workflowsStyles.selectItem}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={workflowsStyles.field}>
              <span className={workflowsStyles.fieldLabel}>Keap Tag</span>
              <Select
                value={values.keepTag}
                onValueChange={(value) => {
                  if (value) {
                    handleFieldChange("keepTag", value);
                  }
                }}
              >
                <SelectTrigger className={workflowsStyles.selectTrigger}>
                  <SelectValue placeholder="Add tag" />
                </SelectTrigger>
                <SelectContent className={workflowsStyles.selectContent} align="start">
                  {workflowKeepTagOptions.slice(1).map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className={workflowsStyles.selectItem}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogBody>

        <DialogFooter className={workflowsStyles.dialogFooter}>
          <Button
            variant="outline"
            className={workflowsStyles.cancelButton}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className={workflowsStyles.saveButton}
            disabled={!canSave}
            onClick={() => {
              onSave(values);
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DispositionRuleDialog;
