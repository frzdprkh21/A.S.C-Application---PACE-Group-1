import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_BASE_URL } from "../config";

type Provider = {
  id: number;
  providerName: string;
  serviceType: string;
  location: string;
  description?: string;
};

export default function Catalogue() {
  const router = useRouter();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/providers`);
      if (!res.ok) throw new Error(`Failed to load providers (${res.status})`);
      const data: Provider[] = await res.json();
      setProviders(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || "Failed to load providers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const filtered = useMemo(() => {
    if (!search.trim()) return providers;
    const q = search.toLowerCase();
    return providers.filter(
      (p) =>
        p.providerName.toLowerCase().includes(q) ||
        p.serviceType.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
    );
  }, [search, providers]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Disability Services</Text>

      <TextInput
        style={styles.search}
        placeholder="Search by provider, service, or location"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={styles.hint}>Loading providers…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>Error: {error}</Text>
          <TouchableOpacity style={styles.retry} onPress={load}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.hint}>No matching providers</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              // onPress={() => router.push(`/catalogue/${item.id}` as const)}
            >
              <Text style={styles.name}>{item.providerName}</Text>
              <Text style={styles.service}>{item.serviceType}</Text>
              <Text style={styles.location}>{item.location}</Text>
              {!!item.description && (
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
              )}
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  search: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 as any },
  hint: { color: "#6b7280" },
  error: { color: "#b91c1c", fontWeight: "600" },
  retry: {
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#1E90FF",
    borderRadius: 6,
  },
  retryText: { color: "#fff", fontWeight: "700" },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#f9fafb",
  },
  name: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  service: { fontSize: 14, color: "#111827", marginTop: 4 },
  location: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  description: { fontSize: 13, color: "#374151", marginTop: 6 },
});

