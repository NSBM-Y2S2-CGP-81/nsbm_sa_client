"use effect";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function EventsAndStallsScroller({ heading, subtitle, venues }) {
  return (
    <View style={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.headingText}>{heading}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
        <Text style={styles.venueText}>{venues} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#d6e1ed",
    height: 200, // Adjusted for better visibility
    width: 330,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  headingText: {
    fontSize: 24, // Largest font size for heading
    fontWeight: "400",
    color: "#0D47A1",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 25, // Smaller font size for subtitle
    fontWeight: "200",
    color: "#0D47A1",
    textAlign: "center",
  },
  venueText: {
    fontSize: 10, // Smallest font size for venue
    fontWeight: "100",
    color: "#0D47A1",
    textAlign: "center",
  },
});
