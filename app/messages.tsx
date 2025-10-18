import { useRouter } from "expo-router";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BLUE = "#1E90FF";

const messages = [
  {
    id: "1",
    name: "Camila Kelly",
    text: "Would you like to speak to a Support Coordinator?",
    avatar: require("../assets/images/example_profile.png"),
  },
  {
    id: "2",
    name: "Camila Kelly",
    text: "Thanks for confirming — your case has been closed.",
    avatar: require("../assets/images/example_profile.png"),
  },
  {
    id: "3",
    name: "Camila Kelly",
    text: "We’ve updated your service plan as requested.",
    avatar: require("../assets/images/example_profile.png"),
  },
  {
    id: "4",
    name: "Camila Kelly",
    text: "Glad we could help! Let us know if you have more questions.",
    avatar: require("../assets/images/example_profile.png"),
  },
  {
    id: "5",
    name: "Camila Kelly",
    text: "Your request has been confirmed!",
    avatar: require("../assets/images/example_profile.png"),
  },
];

export default function Messages() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header*/}
      <View style={styles.header}>
    <TouchableOpacity
      onPress={() => router.replace("/employee_home")}
      style={styles.backButton}
    >
      <Text style={styles.backArrow}>←</Text>
    </TouchableOpacity>

    <Image
      source={require("../assets/images/logo.png")}
      style={styles.logo}
      resizeMode="contain"
    />

    <View style={{ width: 45 }} />
  </View>

      <Text style={styles.pageTitle}>Messages</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageRow}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
backButton: {
  width: 50,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
},

backArrow: {
  fontSize: 36,       
  fontWeight: "900",   
  color: BLUE,
  lineHeight: 42,
  textShadowColor: BLUE,  
  textShadowOffset: { width: 0.5, height: 0.5 },
  textShadowRadius: 1.5,
},
  logo: {
    width: 160,
    height: 60,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: BLUE,
    marginVertical: 10,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 10 },
  textContainer: { flex: 1 },
  name: { fontWeight: "700", fontSize: 15, color: "#111827" },
  text: { fontSize: 13, color: "#374151", marginTop: 2 },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 6,
  },
});
