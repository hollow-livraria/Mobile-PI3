// app/_layout.tsx
import { TamaguiProvider } from "tamagui";
import config from "../../tamagui.config";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <TamaguiProvider config={config}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="cadastro" options={{ headerShown: false }} />
        <Stack.Screen name="forgetPass" options={{ headerShown: false }} />
        <Stack.Screen name="vitrine" options={{ headerShown: false }} />
        <Stack.Screen name="perfil" options={{ headerShown: false }} />
        <Stack.Screen name="verifyEmail" options={{headerShown: false}} />
      </Stack>
    </TamaguiProvider>
  );
}
