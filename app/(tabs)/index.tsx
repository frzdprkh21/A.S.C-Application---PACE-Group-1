import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/download.jpg")}
          style={{ width: 160, height: 80, resizeMode: "contain", marginBottom: 10 }}
        />

        {/* Feature Section with Cyan Background */}
        <View style={styles.featureSection}>
          <View style={styles.featuresRow}>
            {["Local Services", "Qualified Experts", "Established Networks", "NDIS Registered"].map((label, i) => (
              <View key={i} style={styles.featureCard}>
                <View style={styles.imagePlaceholder} />
                <Text style={styles.featureText}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Slogan */}
        <Text style={styles.sloganLine1}>The ability to</Text>
        <Text style={styles.sloganLine2}>choose, the ability</Text>
        <Text style={styles.sloganLine2}>to change</Text>

        {/* Questions */}
        <View style={{ marginTop: 15 }}>
          {[
            "Do you need help with navigating the NDIS?",
            "Are you struggling to find service providers?",
            "We’re here to help!",
          ].map((line, i) => (
            <Text key={i} style={styles.question}>{line}</Text>
          ))}
        </View>

        {/* Contact Button */}
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Us!</Text>
        </TouchableOpacity>

        {/* Navigate to About Page */}
        <TouchableOpacity
          style={[styles.contactButton, { marginTop: 10, backgroundColor: "#00BCD4" }]}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.contactButtonText}>Go to About Page</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  featureSection: {
    backgroundColor: "#00BCD4", // cyan background for section
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 20,
    width: "100%",
  },
  featuresRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  featureCard: {
    width: "40%",
    height: 100,
    backgroundColor: "#fff", // keep cards white
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    color: "#000",
  },
  imagePlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 20,
  },
  sloganLine1: {
    fontSize: 18,
    fontWeight: "600",
  },
  sloganLine2: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  question: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  contactButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
