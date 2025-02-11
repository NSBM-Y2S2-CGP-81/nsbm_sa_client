import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="/(auth)/sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="/(main_screen)/index" options={{ headerShown: false }} />
    </Stack>
  );
}