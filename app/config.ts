// Central API base URL resolution.
// Priority:
// 1) EXPO_PUBLIC_API_BASE_URL env (works across web/native at build time)
// 2) On web, use current host with port 4000
// 3) Simulator defaults (iOS localhost, Android emulator 10.0.2.2)
import { Platform } from "react-native";

const webDefault = ((): string | undefined => {
  try {
    // Use the same hostname you opened the web app on, but port 4000
    if (typeof window !== "undefined" && window.location?.hostname) {
      return `http://${window.location.hostname}:4000`;
    }
  } catch {}
  return undefined;
})();

const simulatorDefault = Platform.select({
  ios: "http://localhost:4000",
  android: "http://10.0.2.2:4000", // Android emulator localhost
  default: "http://localhost:4000",
});

export const API_BASE_URL =
  (process.env.EXPO_PUBLIC_API_BASE_URL as string | undefined) ||
  webDefault ||
  (simulatorDefault as string);

