
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./Auth/Authentication";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, initializing } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;

    const inTabs = segments[0] === "(tabs)";

    if (!user && !inTabs) {
      router.replace("/(tabs)/LoginScreen");
      return;
    }
    if (user && !inTabs) {
      router.replace("/(tabs)/employee_home");
    }
  }, [user, initializing, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthGate>
    </AuthProvider>
  );
}
