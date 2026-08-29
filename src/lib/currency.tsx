import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest, formatCurrency, type CurrencyCode } from "@/lib/api";

const STORAGE_KEY = "nexo-currency-v1";

type CurrencyContextValue = {
  currency: CurrencyCode;
  rate: number;
  toggle: () => void;
  format: (amount: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function readStoredCurrency(): CurrencyCode {
  if (typeof window === "undefined") {
    return "PKR";
  }

  return window.localStorage.getItem(STORAGE_KEY) === "USD" ? "USD" : "PKR";
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>(() => readStoredCurrency());
  const [rate, setRate] = useState(1);

  useEffect(() => {
    apiRequest<{ usdExchangeRate?: number }>("/public/site-info")
      .then((response) => {
        if (typeof response.usdExchangeRate === "number" && response.usdExchangeRate > 0) {
          setRate(response.usdExchangeRate);
        }
      })
      .catch(() => null);
  }, []);

  const toggle = () => {
    setCurrency((current) => {
      const next: CurrencyCode = current === "PKR" ? "USD" : "PKR";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  };

  const value: CurrencyContextValue = {
    currency,
    rate,
    toggle,
    format: (amount: number) => formatCurrency(amount, currency, rate),
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const value = useContext(CurrencyContext);

  if (!value) {
    throw new Error("useCurrency must be used inside CurrencyProvider.");
  }

  return value;
}
