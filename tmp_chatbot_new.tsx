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
import { API_BASE_URL } from "../config";

const BLUE = "#1E90FF";
const PURPLE = "#8A2BE2";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot" as const,
      text:
        "Hi, I'm here to answer your NDIS and disability-related questions. You can ask me about funding, eligibility, services, or supports.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fontSize] = useState(14);
  const [highContrast] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user" as const,
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);
    try {
      const resp = await fetch(`${API_BASE_URL}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });
      let reply = "Sorry, I couldn't get a response right now.";
      if (resp.ok) {
        const data = await resp.json();
        reply = (data?.reply || "").toString();
      }
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "_bot", sender: "bot", text: reply },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "_bot", sender: "bot", text: "Network error. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // auto-scroll to latest
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={[styles.screen, highContrast && { backgroundColor: "#000" }]}>
      {/* HEADER */}
      <LinearGradient
        colors={[BLUE, PURPLE]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Image
            source={require("../../assets/images/logo_small.png")}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>NDIS Help Bot</Text>
        </View>

        <View style={styles.headerButtons}>
          <Text style={styles.headerBtn}>-</Text>
          <Text style={styles.headerBtn}>+</Text>
          <Text style={styles.headerBtn}>X</Text>
        </View>
      </LinearGradient>

      {/* Chat area */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
              highContrast && {
                backgroundColor: item.sender === "user" ? "#00A" : "#222",
              },
            ]}
          >
            <Text
              style={[
                styles.messageText,
                { fontSize },
                highContrast && { color: "#fff" },
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
      />

      {isTyping && (
        <Text style={[styles.typing, highContrast && { color: "#fff" }]}>
          Bot is typing...
        </Text>
      )}

      {/* Input row */}
      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            highContrast && {
              backgroundColor: "#111",
              color: "#fff",
              borderColor: "#555",
            },
          ]}
          placeholder="Type message here..."
          placeholderTextColor={highContrast ? "#aaa" : "#666"}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    elevation: 4,
  },
  headerContent: { flexDirection: "row", alignItems: "center" },
  logo: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  headerButtons: { flexDirection: "row", gap: 8 },
  headerBtn: { color: "#fff", fontSize: 18 },

  accessibility: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  accessibilityTitle: { fontWeight: "600", marginBottom: 6 },
  optionBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  optionText: { fontSize: 14, fontWeight: "500" },

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
  messageText: { color: "#000", fontSize: 14 },
  typing: { fontStyle: "italic", color: "#555", paddingLeft: 12, marginBottom: 5 },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 8,
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
