import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { providers as mockData } from "../src/data/providers"; // if using local JSON

export default function Catalogue() {
  const [providers, setProviders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 👉 Option A: For local JSON
    // setProviders(mockData);

    // 👉 Option B: For backend API
    fetch("http://<your-ip>:4000/providers")
      .then((res) => res.json())
      .then((data) => setProviders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Disability Services</Text>

      <FlatList
        data={providers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            //onPress={() => router.push(`/catalogue/${item.id}`)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.service}>{item.service}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  name: { fontSize: 16, fontWeight: "bold" },
  service: { fontSize: 14, color: "#333" },
  location: { fontSize: 14, color: "#666" },
});
