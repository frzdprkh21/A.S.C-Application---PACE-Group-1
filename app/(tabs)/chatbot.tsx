import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BLUE = "#1E90FF";
const PURPLE = "#7B1FA2";
const LIGHT_BG = "#FFFFFF";
const DARK_BG = "#000000";
const BUBBLE_GREY = "#EEEEEE";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: "1", sender: "bot", text: "Hi 👋 I'm your support assistant. Ask me about NDIS or services!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // small FAQ bank for demo
  const faq: Record<string, string> = {
    "what is ndis": "The NDIS (National Disability Insurance Scheme) provides funding for Australians with disability to access supports and services.",
    "find providers": "You can browse providers in the catalogue section of the app.",
    "contact": "You can reach out to our team via the Contact Us button on the home screen.",
    "hello": "Hello! How can I help you today?",
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // simulate typing delay
    setIsTyping(true);
    setTimeout(() => {
      let reply = "Hmm, I’m not sure about that — but I can connect you with our support team.";
      const query = input.toLowerCase();
      const key = Object.keys(faq).find((k) => query.includes(k));
      if (key) reply = faq[key];

      const botMessage = { id: Date.now().toString() + "_bot", sender: "bot", text: reply };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // always scroll to bottom when messages change
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    
    <View style={styles.container}>
{/* 🔹 Gradient Header */}
<LinearGradient
  colors={["#1E90FF", "#7B1FA2"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.header}
>
   <View style={styles.headerLeft}>
    <Image
      source={require("../../assets/images/logo_small.png")}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.headerText}>NDIS Help Bot</Text>
  </View>

  <View style={styles.headerActions}>
    {/*Place holder for buttons*/}
    <Text style={styles.headerButton}>…</Text>
    <Text style={styles.headerButton}>–</Text>
    <Text style={styles.headerButton}>✕</Text>
  </View>

</LinearGradient>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.sender}>
              {item.sender === "user" ? "You" : "Bot"}
            </Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      {isTyping && <Text style={styles.typing}>Bot is typing...</Text>}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },

header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 18,
  paddingHorizontal: 22,
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 3,
  borderBottomWidth: 0,
  minHeight: 75, 
},
headerLeft: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
},
logo: {
  width: 45,
  height: 41,
  borderRadius: 20,
  backgroundColor: "#fff", 
},
headerText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 20,
  letterSpacing: 0.5,
},
headerActions: {
  flexDirection: "row",
  gap: 14,
},
headerButton: {
  color: "#000",
  fontSize: 22,
  fontWeight: "700",
},

  /* (Accessibility ) */
  accessPanel: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6 },
  accessTitle: { fontWeight: "700", color: "#1b1b1b", marginBottom: 8 },
  accessBtn: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#B8C7E0",
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: "#fff",
  },
  activeBtn: { borderColor: "#1E90FF", backgroundColor: "#EAF3FF" },
  accessBtnText: { fontWeight: "600", color: "#1e1e1e", fontSize: 13 },

  suggestedTitle: {
    fontWeight: "700",
    color: "#1b1b1b",
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 8,
  },
  promptGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  promptBox: {
    width: "48%",
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  promptText: { fontWeight: "500", color: "#222", fontSize: 13, lineHeight: 18 },

  /* Messages */
  message: {
    padding: 12,
    borderRadius: 14,
    marginVertical: 6,
    maxWidth: "80%",
    marginHorizontal: 12,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#1E90FF",
    borderBottomRightRadius: 4,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E6E6EB",   // light grey like the mock
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#D6D6DA",
  },
  sender: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#555",
  },
  messageText: { fontSize: 15, color: "#000", lineHeight: 20 },

  typing: {
    fontStyle: "italic",
    color: "#5f6b7a",
    marginTop: 4,
    marginLeft: 16,
  },

  /* Input row */
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#DADDE3",
    backgroundColor: "#E7F0FF",   // pale blue bar like mock
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  emoji: { fontSize: 22, marginRight: 6 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#C9CFD8",
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sendText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
