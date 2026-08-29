import { Bitcoin, Landmark, Smartphone, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Shared icon mapping for the member-facing payment / withdrawal method
 * types used across plans, create-account, and wallet. Keep in sync with
 * whatever the type strings are on each screen:
 * - "bank" (join/plan payment methods) and "bank_transfer" (withdrawals)
 * - "jazzcash"
 * - "easypaisa"
 * - "binance"
 */
export function getPaymentMethodIcon(type: string): LucideIcon {
  switch (type) {
    case "bank":
    case "bank_transfer":
      return Landmark;
    case "jazzcash":
      return Smartphone;
    case "easypaisa":
      return Wallet;
    case "binance":
      return Bitcoin;
    default:
      return Landmark;
  }
}
