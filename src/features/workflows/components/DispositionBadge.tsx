import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DispositionType } from "@/features/workflows/types/workflowTypes";

export const formatDispositionType = (type: DispositionType) =>
  type
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const dispositionVariantMap: Record<
  DispositionType,
  { variant: string; className?: string }
> = {
  no_answer: { variant: "no-answer" },
  connected_positive: { variant: "connected" },
  not_interested: { variant: "not-interested" },
  callback_scheduled: { variant: "callback" },
  voicemail_left: { variant: "cooldown" },
  wrong_number: { variant: "wrong-number" },
  do_not_call: { variant: "destructive" },
  ban_contact: { variant: "destructive" }
};

export const DispositionBadge = ({ type }: { type: DispositionType }) => {
  const { variant, className } =
    dispositionVariantMap[type] ?? { variant: "outline" };

  return (
    <Badge variant={variant as never} className={cn(className)}>
      {formatDispositionType(type)}
    </Badge>
  );
};
