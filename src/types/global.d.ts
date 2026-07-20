/*
  Global type augmentations.

  GTM creates `window.dataLayer` and the Meta Pixel creates `window.fbq` at
  runtime, so both are typed as optional: any code using them must guard with
  `?.` in case the script has not initialized yet (e.g. blocked by an ad blocker
  or still loading).
*/

export {};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}
