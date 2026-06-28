/**
 * Tiny class-name joiner: filters out falsy values and joins with a space.
 * Avoids pulling in clsx/cva for a project this small.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
