// app/messages.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type MessageStatus = "pending" | "past";

type Msg = {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string; // ISO or friendly string
  status: MessageStatus;
};

const BLUE = "#1E90FF";
const LINE = "#e5e7eb";

export default function Messages() {
  const router = useRouter();
  const params = useLocalSearchParams<{ status?: MessageStatus }>();
  const initialTab = (params.status === "past" ? "past" : "pending") as MessageStatus;

  // demo data
  const [items, setItems] = useState<Msg[]>([
    {
      id: "m1",
      from: "Alex Parker",
      subject: "Plan review help",
      preview: "Hi, I need help understanding my plan review...",
      date: "2025-09-10",
      status: "pending",
    },
    {
      id: "m2",
      from: "Jill Nguyen",
      subject: "Provider list request",
      preview: "Could you send the updated list of local providers?",
      date: "2025-09-08",
      status: "pending",
    },
    {
      id: "m3",
      from: "Coast Allied",
      subject: "Follow-up scheduled",
      preview: "Thanks, we’ve booked a follow-up for next week.",
      date: "2025-08-28",
      status: "past",
    },
  ]);

  const [tab, setTab] = useState<MessageStatus>(initialTab);

  const data = useMemo(() => items.filter((m) => m.status === tab), [items, tab]);

  const markDone = (id: string) => {
    setItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "past" } : m))
    );
  };

  const renderRow = ({ item }: { item: Msg }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        // (optional) navigate to a detail screen later
        // router.push({ pathname: "/message/[id]", params: { id: item.id } } as any);
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.from}>{item.from}</Text>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.preview} numberOfLines={1}>
          {item.preview}
        </Text>
      </View>

      <View style={styles.rowRight}>
        <Text style={styles.date}>{item.date}</Text>
        {item.status === "pending" && (
          <TouchableOpacity onPress={() => markDone(item.id)} style={styles.doneBtn}>
            <Text style={styles.doneText}>Mark done</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === "pending" && styles.tabActive]}
          onPress={() => setTab("pending")}
        >
          <Text style={[styles.tabText, tab === "pending" && styles.tabTextActive]}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === "past" && styles.tabActive]}
          onPress={() => setTab("past")}
        >
          <Text style={[styles.tabText, tab === "past" && styles.tabTextActive]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {data.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            {tab === "pending" ? "No pending messages." : "No past messages."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(m) => m.id}
          renderItem={renderRow}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
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
  tabs: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: LINE,
    backgroundColor: "#fff",
  },
  tabActive: { borderColor: BLUE, backgroundColor: "#eaf3ff" },
  tabText: { color: "#111827", fontWeight: "600" },
  tabTextActive: { color: BLUE },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  from: { fontSize: 14, fontWeight: "700", color: "#111827" },
  subject: { fontSize: 13, color: "#1f2937", marginTop: 2 },
  preview: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  rowRight: { alignItems: "flex-end", marginLeft: 12 },
  date: { fontSize: 11, color: "#6b7280", marginBottom: 6 },
  doneBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: BLUE,
    borderRadius: 8,
  },
  doneText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  sep: { height: 1, backgroundColor: LINE },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: "#6b7280" },
});
