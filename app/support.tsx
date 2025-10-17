// app/support.tsx
import { useRouter } from "expo-router";
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BLUE = "#1E90FF";
const LINE = "#e5e7eb";

export default function Support() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Support</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick help</Text>

        <TouchableOpacity
          style={styles.action}
          onPress={() => router.push("/chatbot" as any)}
        >
          <Text style={styles.actionText}>Open Chatbot</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.action}
          onPress={() => Linking.openURL("mailto:support@asc.example")}
        >
          <Text style={styles.actionText}>Email Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.action}
          onPress={() => Linking.openURL("tel:+61123456789")}
        >
          <Text style={styles.actionText}>Call Support</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FAQs</Text>

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => router.push({ pathname: "/chatbot", params: { q: "what is ndis" } } as any)}
        >
          <Text style={styles.linkText}>What is the NDIS?</Text>
        </TouchableOpacity>
        <View style={styles.sep} />

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => router.push({ pathname: "/chatbot", params: { q: "support coordination" } } as any)}
        >
          <Text style={styles.linkText}>What is Support Coordination?</Text>
        </TouchableOpacity>
        <View style={styles.sep} />

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => router.push({ pathname: "/chatbot", params: { q: "how do i apply" } } as any)}
        >
          <Text style={styles.linkText}>How do I apply?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  title: { fontSize: 18, fontWeight: "700" },
  section: { padding: 16 },
  sectionTitle: { fontSize: 14, fontWeight: "700", marginBottom: 10, color: "#374151" },
  action: {
    backgroundColor: BLUE,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  actionText: { color: "#fff", fontWeight: "700", textAlign: "center" },
  linkRow: { paddingVertical: 12 },
  linkText: { color: BLUE, fontWeight: "600" },
  sep: { height: 1, backgroundColor: LINE },
});
