import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ApiError,
  apiRequest,
  clearSession,
  readSession,
  writeSession,
  type AppUser,
  type Session,
} from "@/lib/api";

type AuthContextValue = {
  user: AppUser | null;
  token: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
  completeLogin: (session: Session) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AppAuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const initialSession = readSession();
  const [user, setUser] = useState<AppUser | null>(initialSession?.user ?? null);
  const [token, setToken] = useState<string | null>(initialSession?.token ?? null);
  const [loading, setLoading] = useState(Boolean(initialSession?.token));

  const refresh = useEffectEvent(async () => {
    const session = readSession();

    if (!session?.token) {
      setLoading(false);
      setUser(null);
      setToken(null);
      await navigate({ to: "/login" });
      return;
    }

    try {
      const response = await apiRequest<{ user: AppUser }>("/auth/me", {
        token: session.token,
      });

      writeSession({
        token: session.token,
        user: response.user,
      });
      startTransition(() => {
        setUser(response.user);
        setToken(session.token);
      });
    } catch (error) {
      const shouldClearSession =
        error instanceof ApiError && (error.status === 401 || error.status === 403);

      if (shouldClearSession) {
        clearSession();
        startTransition(() => {
          setUser(null);
          setToken(null);
        });
        await navigate({ to: "/login" });
      }
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (!readSession()?.token) {
      setLoading(false);
      void navigate({ to: "/login" });
      return;
    }

    void refresh();
  }, []);

  const value: AuthContextValue = {
    user,
    token,
    loading,
    refresh,
    completeLogin: (session) => {
      writeSession(session);
      setUser(session.user);
      setToken(session.token);
      setLoading(false);
    },
    logout: () => {
      clearSession();
      setUser(null);
      setToken(null);
      void navigate({ to: "/login" });
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAppAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAppAuth must be used inside AppAuthProvider.");
  }

  return value;
}
