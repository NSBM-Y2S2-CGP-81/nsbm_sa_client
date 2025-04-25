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
      <Stack.Screen 
        name="(main_screen)/food"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
