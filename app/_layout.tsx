import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { AppProvider } from "@/app/services/GlobalContext"; // Import your AppProvider
import { StatusBar } from "expo-status-bar"; // Optional: for status bar styling

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="dark" backgroundColor="#AFD9AF" />
          <Stack>
            <Stack.Screen
              name="/(auth)/sign-in"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="/(auth)/sign-up"
              options={{ headerShown: false }}
            />
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
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Matches HomeScreen container background
  },
});