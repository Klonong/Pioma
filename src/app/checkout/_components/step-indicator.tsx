import { cn } from "@/lib/utils";

const STEPS = [
  { label: "SHIPPING", number: "01" },
  { label: "PAYMENT", number: "02" },
  { label: "REVIEW", number: "03" },
];

export function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center px-8">
            <span
              className={cn(
                "text-xs tracking-widest font-medium transition-colors",
                current === i
                  ? "text-primary"
                  : current > i
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50",
              )}
            >
              {step.number} {step.label}
            </span>
            <div
              className={cn(
                "mt-1.5 h-0.5 w-20 rounded-full transition-colors",
                current === i
                  ? "bg-primary"
                  : current > i
                    ? "bg-muted-foreground/40"
                    : "bg-muted-foreground/20",
              )}
            />
          </div>
          {i < STEPS.length - 1 && (
            <div className="w-8 h-px bg-muted-foreground/20 -mt-2" />
          )}
        </div>
      ))}
    </div>
  );
}
