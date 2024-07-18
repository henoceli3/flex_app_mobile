import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="transfert"
        options={{ headerTitle: "Envoyez de l'argent" }}
      />
      <Stack.Screen
        name="authentification"
        options={{ headerTitle: "Authentification", headerShown: false }}
      />
    </Stack>
  );
}
