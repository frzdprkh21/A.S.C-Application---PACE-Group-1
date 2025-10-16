// app/(tabs)/employee_home.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { useAuth } from "../Auth/Authentication";

const LINE = "#e5e7eb";

export default function EmployeeHome() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const [localUser] = useState({
    name: user?.name ?? "Staff Member",
    avatar: require("../../assets/images/example_profile.png"),
  });

  const Row = ({
    title,
    onPress,
    danger,
  }: {
    title: string;
    onPress: () => void;
    danger?: boolean;
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Text style={[styles.rowText, danger && { color: "#e11d48", fontWeight: "700" }]}>
        {title}
      </Text>
      <Text style={[styles.chevron, danger && { color: "#e11d48" }]}>{">"}</Text>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    if (Platform.OS === "web") {
      const ok = typeof window !== "undefined" && window.confirm("Log out now?");
      if (ok) logout();
      return;
    }
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await logout(); // AuthGate will handle redirect automatically
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Image source={localUser.avatar} style={styles.avatar} />
          <Text style={styles.name}>{localUser.name}</Text>
        </View>

        

        <Row title="Log out" onPress={handleLogout} danger />
      </View>

      <View style={styles.bodyPlaceholder} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  card: {
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: LINE,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  name: { fontSize: 16, fontWeight: "600", color: "#111827" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 44,
    borderTopWidth: 1,
    borderTopColor: LINE,
    backgroundColor: "#fff",
  },
  rowText: { flex: 1, fontSize: 15, color: "#111827" },
  chevron: { fontSize: 18, color: "#6b7280" },
  bodyPlaceholder: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: LINE,
    backgroundColor: "#fafafa",
  },
});
