/*
  Global type augmentations.

  GTM creates `window.dataLayer` at runtime, so it is typed as optional: any
  code that pushes to it must guard with `?.` in case GTM has not initialized
  yet (e.g. blocked by an ad blocker or still loading).
*/

export {};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
