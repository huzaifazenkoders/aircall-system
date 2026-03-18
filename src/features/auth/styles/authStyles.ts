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
  heroTitle: cn(
    "max-w-xl",
    "text-5xl",
    "font-semibold",
    "leading-[1.1]",
    "text-brand-accent"
  ),
  heroSubtitle: cn("max-w-xl", "text-base", "leading-6", "text-text-inverse-muted"),
  authContentPanel: cn("flex", "min-h-screen", "w-full", "flex-col", "bg-background"),

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
  ctaButton: cn("w-full"),
  inputIcon: cn("size-5", "text-primary"),

  resetFields: cn("space-y-5"),
  loginFields: cn("space-y-4.5"),
  passwordBlock: cn("space-y-2"),
  forgotLinkWrap: cn("flex", "justify-end"),
  forgotLink: cn("text-sm", "font-medium", "text-secondary")
};

