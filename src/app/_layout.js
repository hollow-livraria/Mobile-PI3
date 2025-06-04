import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFF",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="login" options={{headerShown: false}} />
        <Stack.Screen name="cadastro" options={{headerShown: false}} />
        </Stack>
    </TamaguiProvider>
  );
}
