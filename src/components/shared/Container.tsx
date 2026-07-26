import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Narrower max-width for manifesto / text-focused blocks. */
  narrow?: boolean;
};

/**
 * Centered content wrapper with consistent horizontal padding.
 * Keeps every section aligned to the same editorial grid.
 */
export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8",
        narrow ? "max-w-3xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
