import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./Auth/Authentication";

const BLUE = "#1E90FF";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");   // ⬅️ inline error message

  const onSubmit = async () => {
    if (!staffId.trim() || !password.trim()) {
      Alert.alert("Missing info", "Please enter both Staff ID and Password.");
      return;
    }

    setBusy(true);
    setError(""); // clear any old error

    try {
      await login(staffId.trim(), password);
      router.replace("/employee_home");
    } catch {
      // ⬅️ show inline banner instead of an Alert
      setError("Wrong Credentials: Invalid username or password");
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <View style={styles.wrap}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Please Login with your{"\n"}
          <Text style={{ fontWeight: "800" }}>Staff ID</Text>
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Staff ID</Text>
          <TextInput
            style={styles.input}
            value={staffId}
            onChangeText={setStaffId}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoComplete="username"
            placeholder="e.g. 4568744884"
            returnKeyType="next"
          />

          <Text style={[styles.label, { marginTop: 10 }]}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            placeholder="••••••••"
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />

          {/* 🔴 Inline error banner */}
          {error ? (
            <View style={styles.errorBox} accessibilityRole="alert">
              <Text style={styles.errorTitle}>Wrong Credentials</Text>
              <Text style={styles.errorMsg}>Invalid username or password</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.btn, busy && { opacity: 0.7 }]}
            onPress={onSubmit}
            disabled={busy}
          >
            <Text style={styles.btnText}>
              {busy ? "Signing in…" : "Log In"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  logo: { width: 160, height: 80, marginBottom: 6 },
  title: {
    textAlign: "center",
    color: BLUE,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: { fontSize: 12, color: "#6b7280", marginBottom: 4 },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  // 🔴 Error banner styles (matches your reference)
  errorBox: {
    borderWidth: 1,
    borderColor: "#e11d48",
    backgroundColor: "#ffe4e6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: "100%",
    marginTop: 12,
  },
  errorTitle: {
    color: "#b91c1c",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 2,
  },
  errorMsg: {
    color: "#991b1b",
    textAlign: "center",
    fontSize: 12,
  },

  btn: {
    marginTop: 14,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BLUE,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
