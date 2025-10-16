import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = { name: string; staffId: string } | null;

type AuthContextType = {
  user: User;
  initializing: boolean;
  login: (staffId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Prefer SecureStore, fallback to AsyncStorage (web/dev). */
async function storeGet(key: string) {
  try {
    if (await SecureStore.isAvailableAsync()) {
      return await SecureStore.getItemAsync(key);
    }
  } catch {}
  return await AsyncStorage.getItem(key);
}
async function storeSet(key: string, value: string) {
  try {
    if (await SecureStore.isAvailableAsync()) {
      return await SecureStore.setItemAsync(key, value);
    }
  } catch {}
  return await AsyncStorage.setItem(key, value);
}
async function storeDelete(key: string) {
  try {
    if (await SecureStore.isAvailableAsync()) {
      return await SecureStore.deleteItemAsync(key);
    }
  } catch {}
  return await AsyncStorage.removeItem(key);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await storeGet("auth_token");
      const name = await storeGet("user_name");
      const staffId = await storeGet("staff_id");
      if (token && name && staffId) setUser({ name, staffId });
      setInitializing(false);
    })();
  }, []);

  const login = async (staffId: string, password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    const isValid = staffId === "4568744884" && password === "password123";
    if (!isValid) throw new Error("Invalid credentials");

    const token = "demo.jwt.token";
    const name = "Zain Ward";

    await storeSet("auth_token", token);
    await storeSet("user_name", name);
    await storeSet("staff_id", staffId);
    setUser({ name, staffId });
  };

  const logout = async () => {
    await storeDelete("auth_token");
    await storeDelete("user_name");
    await storeDelete("staff_id");
    setUser(null);
  };

  const value = useMemo(() => ({ user, initializing, login, logout }), [user, initializing]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
