import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }}/>
      <Stack.Screen
        name="transations/transfert"
        options={{ headerTitle: "Envoyez de l'argent" }}
      />
      <Stack.Screen
        name="auth/authentification"
        options={{ headerTitle: "Authentification", headerShown: false }}
      />
    </Stack>
  );
}
