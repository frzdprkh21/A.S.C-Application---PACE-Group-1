import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#1E90FF",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
  },
  sender: { fontSize: 10, fontWeight: "bold", marginBottom: 2 },
  messageText: { color: "#000", fontSize: 14 },
  typing: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: 5,
    marginLeft: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 6,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 20,
  },
  sendText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
