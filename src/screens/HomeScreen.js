import { Button, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Welcome to Advance Support App!</Text>
      <Button
        title="Go to Providers"
        onPress={() => navigation.navigate("Providers")}
      />
    </View>
  );
}
