import { cn } from "@/lib/utils";

export const dialerAuthStyles = {
  layoutRoot: cn(
    "min-h-screen",
    "bg-[var(--dialer-auth-page)]",
    "lg:grid",
    "lg:grid-cols-[minmax(0,1.1fr)_minmax(30rem,0.9fr)]"
  ),
  heroPanel: cn(
    "hidden",
    "min-h-screen",
    "overflow-hidden",
    "bg-[linear-gradient(180deg,var(--dialer-auth-hero)_0%,var(--dialer-auth-hero-alt)_100%)]",
    "lg:flex",
    "lg:flex-col"
  ),
  heroInner: cn(
    "flex",
    "min-h-screen",
    "flex-col",
    "gap-12",
    "px-10",
    "pb-0",
    "pt-12",
    "xl:px-16",
    "xl:pt-14"
  ),
  brandRow: cn("flex", "items-center", "gap-3"),
  brandText: cn(
    "text-[2rem]",
    "font-semibold",
    "leading-none",
    "text-primary-foreground"
  ),
  heroImage: cn("absolute", "-bottom-0 -right-0"),
  heroCopy: cn("flex", "max-w-xl", "flex-col", "gap-5"),
  heroTitle: cn("text-[36px]", "font-semibold", "text-white"),
  heroSubtitle: cn(
    "max-w-lg",
    "text-base",
    "text-[color:var(--text-inverse-muted)]"
  ),
  heroPreviewWrap: cn("flex", "items-end", "justify-center"),
  heroPreviewShell: cn(
    "flex",
    "w-full",
    "max-w-[51rem]",
    "translate-y-8",
    "rounded-t-[2rem]",
    "border",
    "border-[color:var(--dialer-auth-hero-border)]",
    "bg-[color:var(--dialer-auth-hero-shell)]",
    "p-3",
    "shadow-[0_24px_60px_var(--dialer-auth-hero-shadow)]",
    "backdrop-blur-[10px]"
  ),
  heroPreviewCard: cn(
    "grid",
    "min-h-[26rem]",
    "w-full",
    "grid-cols-[3.75rem_minmax(0,1fr)]",
    "overflow-hidden",
    "rounded-t-[1.6rem]",
    "bg-[var(--dialer-auth-surface)]"
  ),
  heroSidebar: cn(
    "flex",
    "flex-col",
    "items-center",
    "justify-between",
    "bg-primary",
    "px-3",
    "py-4"
  ),
  heroSidebarTop: cn("flex", "flex-col", "items-center", "gap-5"),
  heroSidebarLogo: cn(
    "flex",
    "size-9",
    "items-center",
    "justify-center",
    "rounded-xl",
    "bg-brand-accent",
    "text-primary"
  ),
  heroSidebarNav: cn("flex", "flex-col", "gap-5"),
  heroSidebarItem: cn(
    "flex",
    "flex-col",
    "items-center",
    "gap-1.5",
    "text-primary-foreground"
  ),
  heroSidebarItemLabel: cn(
    "text-[0.6rem]",
    "font-medium",
    "text-[color:var(--text-inverse-muted)]"
  ),
  heroMain: cn("grid", "grid-rows-[auto_1fr]", "bg-card"),
  heroToolbar: cn(
    "flex",
    "items-center",
    "justify-between",
    "gap-4",
    "bg-aircall-callbar",
    "px-4",
    "py-3"
  ),
  heroToolbarUser: cn("flex", "items-center", "gap-3"),
  heroToolbarAvatar: cn(
    "flex",
    "size-9",
    "items-center",
    "justify-center",
    "rounded-full",
    "bg-brand-accent",
    "text-primary-foreground"
  ),
  heroToolbarMeta: cn("flex", "flex-col", "gap-0.5"),
  heroToolbarName: cn("text-sm", "font-semibold", "text-primary-foreground"),
  heroToolbarPhone: cn(
    "text-[0.69rem]",
    "text-[color:var(--text-inverse-muted)]"
  ),
  heroToolbarActions: cn("flex", "items-center", "gap-2"),
  heroToolbarAction: cn(
    "flex",
    "size-8",
    "items-center",
    "justify-center",
    "rounded-full",
    "bg-[color:var(--overlay-strong)]",
    "text-primary-foreground"
  ),
  heroContent: cn(
    "grid",
    "grid-cols-[minmax(0,1.7fr)_minmax(11rem,0.78fr)]",
    "gap-4",
    "bg-card",
    "px-4",
    "py-4"
  ),
  heroCard: cn(
    "rounded-2xl",
    "border",
    "border-border",
    "bg-card",
    "shadow-[0_1px_2px_var(--dialer-auth-input-shadow)]"
  ),
  heroCardPad: cn("p-4"),
  heroSectionTitle: cn(
    "text-[0.62rem]",
    "font-semibold",
    "tracking-[0.1em]",
    "text-text-primary"
  ),
  heroInfoGrid: cn("mt-4", "grid", "grid-cols-3", "gap-x-5", "gap-y-4"),
  heroInfoBlock: cn("flex", "flex-col", "gap-1"),
  heroLabel: cn("text-[0.62rem]", "leading-4", "text-text-secondary"),
  heroValue: cn(
    "text-[0.7rem]",
    "font-medium",
    "leading-4",
    "text-text-primary"
  ),
  heroStack: cn("grid", "gap-4"),
  heroTable: cn(
    "mt-4",
    "overflow-hidden",
    "rounded-xl",
    "border",
    "border-border"
  ),
  heroTableHead: cn(
    "grid",
    "grid-cols-3",
    "bg-background",
    "px-4",
    "py-2.5",
    "text-[0.62rem]",
    "font-medium",
    "text-text-secondary"
  ),
  heroTableRow: cn(
    "grid",
    "grid-cols-3",
    "border-t",
    "border-border",
    "px-4",
    "py-2.5",
    "text-[0.7rem]",
    "text-text-primary"
  ),
  heroStatValue: cn("text-right", "font-semibold", "text-brand-accent"),
  heroTimeline: cn("flex", "flex-col", "gap-4"),
  heroTimelineItem: cn("flex", "items-start", "gap-3"),
  heroTimelineDot: cn(
    "mt-0.5",
    "flex",
    "size-6",
    "shrink-0",
    "items-center",
    "justify-center",
    "rounded-full",
    "bg-success-soft",
    "text-success-fg"
  ),
  heroTimelineCopy: cn("flex", "flex-col", "gap-0.5"),
  heroTimelineTitle: cn("text-[0.7rem]", "font-medium", "text-text-primary"),
  heroTimelineText: cn("text-[0.62rem]", "leading-4", "text-text-secondary"),
  heroTimelineSubtle: cn("text-[0.58rem]", "leading-4", "text-text-secondary"),

  contentPanel: cn(
    "flex",
    "min-h-screen",
    "flex-col",
    "bg-[var(--dialer-auth-page)]"
  ),
  pageRoot: cn("flex", "min-h-screen", "flex-col"),
  pageTopBar: cn("px-8", "pt-10", "md:px-16"),
  pageContent: cn(
    "flex",
    "flex-1",
    "items-center",
    "justify-center",
    "px-6",
    "pb-10",
    "pt-10",
    "md:px-16"
  ),
  pageContentNoTopBar: cn(
    "flex",
    "flex-1",
    "items-center",
    "justify-center",
    "px-6",
    "pb-10",
    "pt-12",
    "md:px-16"
  ),
  formRoot: cn("flex", "w-full", "max-w-[23.75rem]", "flex-col", "gap-10"),
  formSection: cn("flex", "flex-col", "gap-8"),
  titleBlock: cn("flex", "flex-col", "gap-2"),
  title: cn(
    "text-[2.125rem]",
    "font-semibold",
    "leading-[1.1]",
    "tracking-[-0.03em]",
    "text-text-primary"
  ),
  subtitle: cn("text-lg", "leading-7", "text-text-secondary"),
  fieldStack: cn("flex", "flex-col", "gap-4"),
  backLink: cn(
    "inline-flex",
    "items-center",
    "gap-2",
    "text-base",
    "font-medium",
    "text-text-primary",
    "transition-colors",
    "hover:text-secondary"
  ),
  backIcon: cn("size-4"),
  helperRow: cn("flex", "justify-end"),
  helperLink: cn(
    "text-sm",
    "font-medium",
    "text-secondary",
    "underline",
    "underline-offset-2"
  ),
  otpIntro: cn("text-lg", "leading-7", "text-text-secondary"),
  otpStrong: cn("font-semibold", "text-primary"),
  otpGrid: cn("grid", "grid-cols-6", "gap-3"),
  otpCell: cn(
    "h-11",
    "rounded-lg",
    "border",
    "border-border",
    "bg-[var(--dialer-auth-surface)]",
    "text-center",
    "text-xl",
    "font-medium",
    "text-text-secondary",
    "shadow-[0_1px_2px_var(--dialer-auth-input-shadow)]",
    "outline-none",
    "transition-colors",
    "placeholder:text-text-secondary",
    "focus:border-secondary",
    "focus:ring-2",
    "focus:ring-[color:var(--dialer-auth-otp-border)]/25"
  ),
  otpCellActive: cn(
    "border-[color:var(--dialer-auth-otp-border)]",
    "bg-[var(--dialer-auth-otp-active)]",
    "text-primary"
  ),
  otpFooter: cn("text-center", "text-lg", "leading-7", "text-text-secondary"),
  otpFooterLink: cn(
    "font-medium",
    "text-secondary",
    "underline",
    "underline-offset-2"
  )
};
