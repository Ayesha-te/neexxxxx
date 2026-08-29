export const BRAND_NAME = import.meta.env.VITE_APP_NAME || "NexoRise";
export const BRAND_SHORT_NAME = import.meta.env.VITE_APP_SHORT_NAME || "NexoRise";
export const BRAND_TAGLINE = "Rise With Purpose";
export const BRAND_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION ||
  "A transparent earning platform with fixed plans, 3-step referral income, rank rewards, and simple withdrawal rules.";

export function pageTitle(page: string) {
  return `${page} - ${BRAND_NAME}`;
}
