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
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="users/login" options={{ headerShown: false }} />
          <Stack.Screen name="users/signUp" options={{ headerShown: false }} />
          <Stack.Screen
            name="transations/transfert"
            options={{ headerTitle: "Envoyez de l'argent" }}
          />
          <Stack.Screen
            name="auth/authentification"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="transations/[transaction]"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="qrcode/qrcode"
            options={{
              headerShown: true,
            }}
          />
        </Stack>
      </PaperProvider>
    </>
  );
}
