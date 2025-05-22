import { cn } from "@/shared/lib/css";

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className={cn("inline-block relative shrink-0 size-6", className)}>
      <div className="w-full h-full rounded-full border-solid animate-spin border-2 border-[currentColor_currentColor_currentColor_transparent]" />
    </div>
  );
}
