import { cn } from "@/lib/utils";

export const authStyles = {
  authLayoutRoot: cn(
    "min-h-screen",
    "w-full",
    "grid",
    "grid-cols-1",
    "md:grid-cols-2"
  ),
  heroPanel: cn(
    "hidden",
    "md:flex",
    "bg-[url('/assets/auth/auth-bg.png')]",
    "bg-cover",
    "bg-center",
    "flex-col",
    "gap-5",
    "px-12",
    "pt-24"
  ),
  heroTop: cn("flex", "flex-col", "gap-20"),
  brandRow: cn("flex", "items-center", "gap-3"),
  brandBadge: cn(
    "flex",
    "size-8",
    "items-center",
    "justify-center",
    "rounded-xl",
    "bg-brand-accent",
    "text-primary"
  ),
  brandText: cn("text-[2rem]", "font-semibold", "leading-none", "text-white"),
  heroCopy: cn("flex", "max-w-2xl", "flex-col", "gap-6"),
  heroTitle: cn(
    "max-w-xl",
    "text-5xl",
    "font-semibold",
    "leading-[1.1]",
    "text-white"
  ),
  heroSubtitle: cn(
    "max-w-xl",
    "text-base",
    "leading-6",
    "text-text-inverse-muted"
  ),
  heroPreviewWrap: cn(
    "flex",
    "min-h-0",
    "items-end",
    "justify-center",
    "overflow-hidden"
  ),
  heroPreviewFrame: cn(
    "flex",
    "h-[36rem]",
    "w-full",
    "max-w-[52rem]",
    "translate-y-8",
    "overflow-hidden",
    "rounded-t-[1.9rem]",
    "border",
    "border-white/20",
    "bg-white/14",
    "p-4",
    "backdrop-blur-sm"
  ),
  heroPreviewCard: cn(
    "grid",
    "min-h-0",
    "w-full",
    "grid-cols-[3.6rem_minmax(0,1fr)]",
    "overflow-hidden",
    "rounded-[1.4rem]",
    "bg-white"
  ),
  heroPreviewSidebar: cn(
    "flex",
    "flex-col",
    "items-center",
    "gap-10",
    "bg-primary",
    "px-3",
    "py-6",
    "text-white"
  ),
  heroPreviewSidebarTop: cn("flex", "flex-col", "items-center", "gap-6"),
  heroPreviewSidebarLogo: cn(
    "flex",
    "size-10",
    "items-center",
    "justify-center",
    "rounded-xl",
    "bg-brand-accent",
    "text-primary"
  ),
  heroPreviewNav: cn("flex", "flex-col", "items-center", "gap-7"),
  heroPreviewNavItem: cn(
    "flex",
    "flex-col",
    "items-center",
    "gap-1.5",
    "text-[0.68rem]"
  ),
  heroPreviewMain: cn("grid", "min-h-0", "grid-rows-[auto_1fr]", "bg-white"),
  heroPreviewToolbar: cn(
    "flex",
    "items-center",
    "justify-between",
    "gap-4",
    "border-b",
    "border-border/60",
    "bg-aircall-callbar",
    "px-5",
    "py-4",
    "text-white"
  ),
  heroPreviewCaller: cn("flex", "items-center", "gap-3"),
  heroPreviewCallerBadge: cn(
    "flex",
    "size-9",
    "items-center",
    "justify-center",
    "rounded-full",
    "bg-brand-accent",
    "text-white"
  ),
  heroPreviewMeta: cn("flex", "flex-col", "gap-1"),
  heroPreviewMetaTitle: cn("text-[1.1rem]", "font-medium", "leading-none"),
  heroPreviewMetaText: cn("text-sm", "text-white/65"),
  heroPreviewActions: cn("flex", "items-center", "gap-3"),
  heroPreviewActionCircle: cn(
    "flex",
    "size-9",
    "items-center",
    "justify-center",
    "rounded-full",
    "bg-white/12",
    "text-white/80"
  ),
  heroPreviewContent: cn(
    "grid",
    "min-h-0",
    "grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.78fr)]",
    "gap-6",
    "px-5",
    "py-5"
  ),
  heroPreviewSection: cn(
    "rounded-2xl",
    "border",
    "border-border/60",
    "bg-white",
    "p-4"
  ),
  heroPreviewSectionTitle: cn(
    "text-xs",
    "font-semibold",
    "tracking-[0.12em]",
    "text-text-primary"
  ),
  heroPreviewInfoGrid: cn("mt-4", "grid", "grid-cols-3", "gap-x-6", "gap-y-4"),
  heroPreviewInfoBlock: cn("flex", "flex-col", "gap-1"),
  heroPreviewLabel: cn("text-[0.72rem]", "text-text-secondary"),
  heroPreviewValue: cn("text-sm", "font-medium", "text-text-primary"),
  heroPreviewBottomGrid: cn("grid", "gap-4"),
  heroPreviewTable: cn(
    "mt-4",
    "overflow-hidden",
    "rounded-xl",
    "border",
    "border-border/60"
  ),
  heroPreviewTableHead: cn(
    "grid",
    "grid-cols-3",
    "bg-background",
    "px-4",
    "py-3",
    "text-[0.72rem]",
    "font-medium",
    "text-text-secondary"
  ),
  heroPreviewTableRow: cn(
    "grid",
    "grid-cols-3",
    "border-t",
    "border-border/60",
    "px-4",
    "py-3",
    "text-sm",
    "text-text-primary"
  ),
  heroPreviewTimeline: cn("flex", "flex-col", "gap-4"),
  heroPreviewTimelineItem: cn("flex", "items-start", "gap-3"),
  heroPreviewTimelineDot: cn(
    "mt-1",
    "flex",
    "size-7",
    "shrink-0",
    "items-center",
    "justify-center",
    "rounded-full",
    "bg-success-soft",
    "text-success-fg"
  ),
  heroPreviewTimelineCopy: cn("flex", "flex-col", "gap-1"),
  heroPreviewTimelineTitle: cn("text-sm", "font-medium", "text-text-primary"),
  heroPreviewTimelineText: cn("text-[0.72rem]", "text-text-secondary"),
  authContentPanel: cn(
    "flex",
    "min-h-screen",
    "w-full",
    "flex-col",
    "bg-background"
  ),

  pageRoot: cn("flex", "min-h-screen", "w-full", "flex-col"),
  pageTopBar: cn("px-8", "pt-8"),
  pageContent: cn(
    "flex",
    "flex-1",
    "items-center",
    "justify-center",
    "px-8",
    "pb-10"
  ),
  pageContentNoTopBar: cn(
    "flex",
    "flex-1",
    "items-start",
    "justify-center",
    "px-8",
    "pb-10",
    "pt-32",
    "md:px-14",
    "md:pt-56"
  ),

  backButton: cn(
    "inline-flex",
    "items-center",
    "gap-2",
    "text-sm",
    "font-medium",
    "text-text-primary",
    "transition-colors",
    "hover:text-secondary"
  ),
  backIcon: cn("size-4"),

  formRoot: cn("w-full", "max-w-114", "space-y-10"),
  formSection: cn("space-y-8"),
  titleBlock: cn("space-y-1.5"),
  title: cn("text-[28px]", "font-semibold", "text-text-primary"),
  subtitle: cn("text-base", "text-text-secondary"),
  ctaButton: cn("w-full mt-5"),
  inputIcon: cn("size-5", "text-primary"),

  resetFields: cn("space-y-5"),
  loginFields: cn("space-y-4.5"),
  passwordBlock: cn("space-y-2"),
  forgotLinkWrap: cn("flex", "justify-end"),
  forgotLink: cn("text-sm", "font-medium", "text-secondary"),
  otpIntro: cn("text-[1.05rem]", "leading-8", "text-text-secondary"),
  otpStrong: cn("font-semibold", "text-primary"),
  otpGrid: cn("grid", "grid-cols-6", "gap-3"),
  otpCell: cn(
    "flex",
    "h-14",
    "items-center",
    "justify-center",
    "rounded-xl",
    "border",
    "border-border-primary",
    "bg-white",
    "text-[1.65rem]",
    "font-medium",
    "text-text-secondary",
    "placeholder:text-text-secondary",
    "shadow-[0_1px_2px_rgba(16,24,40,0.05)]",
    "outline-none",
    "transition-colors",
    "focus:border-primary/40",
    "focus:ring-2",
    "focus:ring-primary/10"
  ),
  otpCellActive: cn("border-primary", "bg-success-soft", "text-primary"),
  otpActions: cn("flex", "flex-col", "gap-4"),
  otpFooter: cn("text-center", "text-[1.05rem]", "text-text-secondary"),
  otpResend: cn(
    "font-medium",
    "text-secondary",
    "underline",
    "underline-offset-2"
  )
};
