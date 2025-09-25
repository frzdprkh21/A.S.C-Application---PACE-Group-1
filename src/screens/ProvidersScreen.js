import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function ProvidersScreen() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/providers")
      .then((res) => res.json())
      .then((data) => {
        setProviders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching providers:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading providers...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Service Providers</Text>
      <FlatList
        data={providers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: "#f0f0f0",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.providerName || item.name}</Text>
            <Text>{item.serviceType || item.service}</Text>
            <Text style={{ color: "gray" }}>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}
