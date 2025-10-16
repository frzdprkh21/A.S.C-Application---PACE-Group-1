import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "./Auth/Authentication";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, initializing } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (initializing) return;

    // Canonical paths without the group name.
    const loginPath = "/LoginScreen";
    const staffPath = "/employee_home";

    // When not authenticated, only protect staff routes; allow landing/home.
    if (!user) {
      if (pathname === staffPath) {
        router.replace(loginPath);
      }
      return;
    }

    // When authenticated, don't trap users on staff; just prevent visiting login.
    if (pathname === loginPath) {
      router.replace(staffPath);
    }
  }, [user, initializing, pathname]);

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

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
