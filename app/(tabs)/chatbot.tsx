import { useState } from "react";
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
    { id: "1", sender: "bot", text: "Hi 👋 I'm here to answer your NDIS questions!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // simple canned response (fake AI logic)
    let reply = "I'm just a demo bot. Try asking about NDIS services!";
    if (input.toLowerCase().includes("ndis")) {
      reply = "The NDIS provides funding for people with disability to access supports.";
    } else if (input.toLowerCase().includes("hello")) {
      reply = "Hello! How can I help you today?";
    }

    const botMessage = { id: Date.now().toString() + "_bot", sender: "bot", text: reply };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

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
    borderRadius: 8,
    marginVertical: 4,
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
  messageText: { color: "#000" },
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
