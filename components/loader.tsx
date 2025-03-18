import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loading = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1B5E20" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#1B5E20",
  },
});

export default Loading;
