import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const events = [
  {
    id: "1",
    title: "ICTAR 2025",
    date: "31st January 2025",
    image: require("@/assets/images/ictar.jpg"),
  },
  {
    id: "2",
    title: "NSBM COLOURS NIGHT 2023",
    date: "23rd June 2023",
    image: require("@/assets/images/nsbm_logo.png"),
  },
  {
    id: "3",
    title: "ICOBI 2025",
    date: "24th November 2024",
    image: require("@/assets/images/nsbm_logo.png"),
  },
  {
    id: "4",
    title: "TIDAC 2024",
    date: "23rd August 2024",
    image: require("@/assets/images/nsbm_logo.png"),
  },
  {
    id: "5",
    title: "Kinetic Fire ’24",
    date: "26th September 2024",
    image: require("@/assets/images/nsbm_logo.png"),
  },
  {
    id: "6",
    title: "Pongal Vizha ’24",
    date: "22nd January 2024",
    image: require("@/assets/images/nsbm_logo.png"),
  },
  {
    id: "7",
    title: "Rasoga - Musical Event",
    date: "18th February 2023",
    image: require("@/assets/images/nsbm_logo.png"),
  },
];

const UpcomingEventsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EventsAndStalls")}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Upcoming Events</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons
            name="person-circle-outline"
            size={28}
            color="white"
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Page Fold */}
      <View style={styles.pageFold} />

      {/* Create Event Button */}
      <TouchableOpacity
        style={styles.createEventButton}
        onPress={() => navigation.navigate("CreateEvent")}
      >
        <Text style={styles.createEventText}>Create an Event</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#afd9af",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#39b54a",
    paddingVertical: 15,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backIcon: {
    position: "absolute",
    left: 10,
  },
  profileIcon: {
    position: "absolute",
    right: 10,
  },
  pageFold: {
    width: 40,
    height: 20,
    backgroundColor: "#39b54a",
    borderTopLeftRadius: 10,
    marginTop: -10,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  createEventButton: {
    marginTop: 50,
    backgroundColor: "#39b54a",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  createEventText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
