import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BLUE = "#1E90FF";
const PURPLE = "#800080";

export default function Landing() {
  const router = useRouter();
  const [providers, setProviders] = useState<any[]>([]);
  const [search, setSearch] = useState(""); // search query
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    const mockProviders = [
      {
        id: 1,
        name: "Care First",
        service: "Disability Support",
        location: "Forster",
      },
      {
        id: 2,
        name: "Better Living",
        service: "Occupational Therapy",
        location: "Tuncurry",
      },
      {
        id: 3,
        name: "Freedom Mobility",
        service: "Physiotherapy",
        location: "Coomba Park",
      },
    ];
    setProviders(mockProviders);
    setFiltered(mockProviders);

  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(providers);
    } else {
      const query = search.toLowerCase();
      setFiltered(
        providers.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.service.toLowerCase().includes(query) ||
            p.location.toLowerCase().includes(query)
        )
      );
    }
  }, [search, providers]);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={[styles.pill, styles.pillOutline]}>
            <Text style={[styles.pillText, { color: BLUE }]}>Our Team</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity style={[styles.pill, styles.pillOutline]}>
            <Text style={[styles.pillText, { color: BLUE }]}>Contact Us</Text>
          </TouchableOpacity>

          


        </View>

        {/* Feature band */}
        <View style={styles.band}>
          <View style={styles.featuresRow}>
            <Feature
              label="Local Services"
              img={require("../../assets/images/local.png")}
            />
            <Feature
              label="Qualified Experts"
              img={require("../../assets/images/experts.png")}
            />
            <Feature
              label="Established Networks"
              img={require("../../assets/images/network.png")}
            />
            <Feature
              label="NDIS Registered"
              img={require("../../assets/images/ndis.png")}
            />
          </View>
        </View>

        {/* Headline + facts */}
        <View style={styles.headlineWrap}>
          <Text style={styles.headline}>
            The ability to choose, the ability to change
          </Text>

          <View style={styles.factList}>
            <Text style={styles.fact}>Do you have an NDIS plan?</Text>
            <Text style={styles.fact}>
              Have you been funded for Support Coordination?
            </Text>
            <Text style={styles.fact}>
              Do you want an expert that can help you navigate NDIS?
            </Text>
            <Text style={styles.fact}>Do you want value for money?</Text>
          </View>

          <TouchableOpacity style={styles.cta}>
            <Text style={styles.ctaText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Catalogue Section */}
        <View style={styles.catalogueSection}>
          <Text style={styles.catalogueTitle}>Browse Disability Services</Text>

          {/* Search Bar */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            value={search}
            onChangeText={setSearch}
          />

          {filtered.length === 0 ? (
            <Text style={styles.noResults}>No results found</Text>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  //onPress={() => router.push(`/catalogue/${item.id}` as const)}
                >
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.service}>{item.service}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>

      {/* Floating help */}
      <TouchableOpacity
        style={styles.chatbotFab}
        onPress={() => router.push("/chatbot")}
      >
        <Text style={styles.chatbotFabText}>🤖</Text>
      </TouchableOpacity>
    </View>
  );
}

function Feature({
  label,
  img,
}: {
  label: string;
  img: ImageSourcePropType;
}) {
  return (
    <View style={styles.feature}>
      <View style={styles.circle}>
        <Image source={img} style={styles.circleImg} />
      </View>
      <Text style={styles.featureText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: { paddingBottom: 80 },
  header: {
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pill: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  pillOutline: { borderWidth: 2, borderColor: BLUE, backgroundColor: "#fff" },
  pillText: { fontWeight: "700", fontSize: 12 },
  logo: { width: 200, height: 100, marginVertical: 10 },
  band: {
    backgroundColor: BLUE,
    paddingVertical: 40,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  featuresRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  feature: { width: "24%", alignItems: "center" },
  circle: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: "#fff",
    overflow: "hidden", alignItems: "center", justifyContent: "center", marginBottom: 8,
  },
  circleImg: { width: "100%", height: "100%", resizeMode: "cover" },
  featureText: { color: "#fff", fontSize: 12, fontWeight: "700", textAlign: "center" },
  headlineWrap: { paddingHorizontal: 18, paddingTop: 20, alignItems: "center" },
  headline: { color: BLUE, fontSize: 18, fontWeight: "800", textAlign: "center" },
  factList: { marginTop: 20, alignItems: "center", gap: 8 as any },
  fact: { fontSize: 16, textAlign: "center", color: "#333" },
  cta: { marginTop: 16, backgroundColor: "#333", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 18 },
  ctaText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  catalogueSection: { marginTop: 30, paddingHorizontal: 16 },
  catalogueTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: BLUE },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  noResults: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontSize: 16, fontWeight: "bold" },
  service: { fontSize: 14, color: "#333" },
  location: { fontSize: 14, color: "#666" },
  fab: {
    position: "absolute", right: 18, bottom: 18, width: 54, height: 54,
    borderRadius: 27, alignItems: "center", justifyContent: "center",
    backgroundColor: PURPLE, elevation: 6,
    shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fabText: { color: "#fff", fontSize: 22, fontWeight: "800" },
  chatbotFab: {
    position: "absolute",
    left: 18,              // 👈 bottom-left
    bottom: 8,
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E90FF", // blue
    elevation: 6,              // Android shadow
    shadowColor: "#000",       // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  chatbotFabText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

});
