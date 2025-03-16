import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { Stack } from "expo-router";
import TopNavigationComponent from "@/components/topNavigationComponent";


export default function UniversityMap() {

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <TopNavigationComponent
        title={"University Map"}
        subtitle={""}
        navigateTo={"/(main_screen)/service-menu"}
      />
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://www.google.com/maps?q=NSBM+Green+University&t=k" }}
        style={styles.map}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F5E9" },
  backButton: { position: "absolute", top: 40, left: 20, zIndex: 10 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
    marginVertical: 10,
  },
  map: { flex: 1 },
});
