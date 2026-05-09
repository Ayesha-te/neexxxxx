export const BRAND_NAME = import.meta.env.VITE_APP_NAME || "Nexo Women Earning System";
export const BRAND_SHORT_NAME = import.meta.env.VITE_APP_SHORT_NAME || "Nexo Women";
export const BRAND_TAGLINE = "Women Earning System";
export const BRAND_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION ||
  "A transparent earning platform with fixed plans, 3-level referral income, rank rewards, and simple withdrawal rules for women.";

export function pageTitle(page: string) {
  return `${page} - ${BRAND_NAME}`;
}
