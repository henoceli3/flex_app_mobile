import { AppColors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <>
      <PaperProvider
        theme={{
          colors: {
            primary: AppColors.primary,
            secondary: AppColors.secondary,
            tertiary: AppColors.tertiary,
          },
        }}
      >
        <Stack>
          {/* point d'entrée */}
          <Stack.Screen name="index" options={{ headerShown: false }} />

          {/* authentification */}
          <Stack.Screen
            name="auth/authentification"
            options={{ headerShown: false }}
          />

          {/* profil standard */}
          <Stack.Screen
            name="profiles/standard/qrcode/qrcode"
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="profiles/standard/standard-home"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profiles/standard/transations/transfert"
            options={{ headerTitle: "Envoyez de l'argent" }}
          />
          <Stack.Screen
            name="profiles/standard/transations/[transaction]"
            options={{
              headerShown: false,
            }}
          />

          {/* profiles agents  */}
          <Stack.Screen
            name="profiles/agents/agent-home"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profiles/agents/transactions/depot"
            options={{ headerTitle: "Deposer de l'argent" }}
          />
          <Stack.Screen
            name="profiles/agents/transactions/retrait"
            options={{ headerShown: false }}
          />

          {/* gestion des utilisateurs */}
          <Stack.Screen name="users/login" options={{ headerShown: false }} />
          <Stack.Screen name="users/sign-up" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </>
  );
}
