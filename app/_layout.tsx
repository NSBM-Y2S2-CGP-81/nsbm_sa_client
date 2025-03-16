import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="/(auth)/sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="/(auth)/sign-up" options={{ headerShown: false }} />
      <Stack.Screen
        name="/(main_screen)/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="/(main_screen)/seat-availability"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="/(main_screen)/service-menu"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="/(main_screen)/seat-availability-main"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(main_screen)/map" />
      <Stack.Screen
        name="(main_screen)/event-list"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(main_screen)/event-details"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(main_screen)/event-types"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(main_screen)/event-reg-form"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(main_screen)/user-profile"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
