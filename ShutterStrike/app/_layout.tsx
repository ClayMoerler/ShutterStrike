import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="lobby_host" options={{ headerShown: false }} />
          <Stack.Screen name="lobby_player" options={{ headerShown: false }} />
          <Stack.Screen name="gameScreen_0" options={{ headerShown: false }} />
          <Stack.Screen name="gameScreen_1" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
