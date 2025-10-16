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

    const onLogin = "/(tabs)/LoginScreen";
    const onHome = "/(tabs)/employee_home";

    if (!user && pathname !== onLogin) {
      router.replace(onLogin);
      return;
    }

    if (user && (pathname === onLogin || pathname === "/" || pathname === "")) {
      router.replace(onHome);
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
