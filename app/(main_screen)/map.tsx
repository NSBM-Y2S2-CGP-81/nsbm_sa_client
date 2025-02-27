import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function UniversityMap() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Ionicons
        name="arrow-back"
        size={30}
        color="#1B5E20"
        style={styles.backButton}
        onPress={() => router.back()}
      />

      <Text style={styles.title}>University Map</Text>

      {/* Google Maps Embed */}
      <WebView
        source={{ uri: "https://www.google.com/maps?q=NSBM+Green+University" }}
        style={styles.map}
      />
    </View>
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
