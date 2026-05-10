export const API_BASE_URL = "https://nexobackend3.vercel.app/api".replace(/\/+$/, "");

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export type AppUser = {
  id: string;
  role: "user" | "admin";
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referredByUserId: string | null;
  sponsorName: string | null;
  sponsorReferralCode: string | null;
  referralLinkEnabled: boolean;
  referralLink: string | null;
  accountType: "prospect" | "lucky_draw" | "investor" | "hybrid";
  walletBalance: number;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};

export type Session = {
  token: string;
  user: AppUser;
};

const SESSION_STORAGE_KEY = "nexo-user-session-v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function readSession(): Session | null {
  if (!isBrowser()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as Session;
  } catch {
    return null;
  }
}

export function writeSession(session: Session) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

export async function apiRequest<T>(
  path: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    token?: string | null;
    body?: unknown;
  },
) {
  const isFormData = typeof FormData !== "undefined" && options?.body instanceof FormData;
  const hasBody = options?.body !== undefined && options?.body !== null;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options?.method ?? "GET",
    headers: {
      ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(hasBody && !isFormData ? { "Content-Type": "application/json" } : {}),
    },
    body: hasBody
      ? isFormData
        ? (options.body as FormData)
        : JSON.stringify(options.body)
      : undefined,
  });

  const data = (await response.json().catch(() => null)) as T & { message?: string };

  if (!response.ok) {
    throw new ApiError(
      (data as { message?: string } | null)?.message ?? "Request failed.",
      response.status,
      data,
    );
  }

  return data;
}

export function formatCurrency(value: number) {
  const currency = "PKR";
  const locale = "en-PK";
  const currencySymbol = currency === "PKR" ? "Rs" : currency;
  
  return `${currencySymbol} ${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(value)}`;
}
