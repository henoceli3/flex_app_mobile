import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="Transfert"
        options={{ headerTitle: "Envoyez de l'argent" }}
      />
      {/* <Stack.Screen name="SelectContact" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
