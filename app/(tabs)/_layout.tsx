// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="employee_home" options={{ title: "Home" }} />
      <Tabs.Screen name="catalogue" options={{ title: "Catalogue" }} />
      <Tabs.Screen name="chatbot" options={{ title: "Chatbot" }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
      <Tabs.Screen name="LoginScreen" options={{ href: null }} /> 
      {/* keep login in the group but hidden from tab bar */}
    </Tabs>
  );
}
