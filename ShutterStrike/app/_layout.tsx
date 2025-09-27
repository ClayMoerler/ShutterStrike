import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="lobby_host" options={{ headerShown: false }} />
      <Stack.Screen name="lobby_player" options={{ headerShown: false }} />

    </Stack>
  );
}
