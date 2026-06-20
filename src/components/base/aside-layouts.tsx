import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// ─── Left Aside Layout ───────────────────────────────────────────────────────
// 1/4 left sidebar + 3/4 main content, sidebar hidden on mobile
interface LeftAsideLayoutProps {
  aside: ReactNode;
  children: ReactNode;
  className?: string;
}

export function LeftAsideLayout({
  aside,
  children,
  className,
}: LeftAsideLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8",
        className,
      )}
    >
      <aside className="col-span-1 hidden md:block">{aside}</aside>
      <div className="col-span-1 md:col-span-3">{children}</div>
    </div>
  );
}

// ─── Right Aside Layout ──────────────────────────────────────────────────────
// main content + fixed-width right aside, stacks on mobile
interface RightAsideLayoutProps {
  aside: ReactNode;
  children: ReactNode;
  /** Width of the right aside column, e.g. "340px" or "380px". Default: "340px" */
  asideWidth?: string;
  className?: string;
}

export function RightAsideLayout({
  aside,
  children,
  asideWidth = "340px",
  className,
}: RightAsideLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 xl:grid-cols-[1fr_var(--aside-w)] gap-8 xl:gap-12",
        className,
      )}
      style={{ "--aside-w": asideWidth } as React.CSSProperties}
    >
      <div>{children}</div>
      <aside>{aside}</aside>
    </div>
  );
}
