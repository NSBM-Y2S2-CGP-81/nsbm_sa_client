import 'react-native-gesture-handler';
import React from "react";
import { Stack, router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { AppProvider } from "@/app/services/GlobalContext"; // Keep AppProvider for other context needs
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  // Check authentication status on mount and redirect if not logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const apiKey = await AsyncStorage.getItem("apiKey");
        if (!apiKey) {
          router.replace("/(auth)/sign-in"); // Redirect to login if no apiKey
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        router.replace("/(auth)/sign-in"); // Fallback to login on error
      }
    };
    checkAuth();
  }, []); // Empty dependency array to run once on mount

  return (
    <SafeAreaProvider>
      <AppProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="dark" backgroundColor="#AFD9AF" />
          <Stack>
            <Stack.Screen name="/(auth)/sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="/(auth)/sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="/(main_screen)/index" options={{ headerShown: false }} />
            <Stack.Screen name="/(main_screen)/seat-availability" options={{ headerShown: false }} />
            <Stack.Screen name="/(main_screen)/service-menu" options={{ headerShown: false }} />
            <Stack.Screen name="/(main_screen)/seat-availability-main" options={{ headerShown: false }} />
            <Stack.Screen name="(main_screen)/map" options={{ headerShown: false }} />
            <Stack.Screen name="(main_screen)/event-list" options={{ headerShown: false }} />
            <Stack.Screen name="(main_screen)/event-details" options={{ headerShown: false }} />
            <Stack.Screen name="(main_screen)/event-types" options={{ headerShown: false }} />
            <Stack.Screen name="(main_screen)/event-reg-form" options={{ headerShown: false }} />
            <Stack.Screen name="(main_screen)/user-profile" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Static background color
  },
});