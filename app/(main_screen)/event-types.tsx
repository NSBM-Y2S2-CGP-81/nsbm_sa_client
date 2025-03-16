import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Link, router } from "expo-router";
// import { useNavigation } from "@react-navigation/native";
import TopNavigationComponent from "@/components/topNavigationComponent";

const { width } = Dimensions.get("window");

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
  // const navigation = useNavigation();

  return (
    <>
      <TopNavigationComponent
        title={"Upcoming Events"}
        subtitle={""}
        navigateTo={"/(main_screen)/service-menu"}
      />
      <View style={styles.container}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          numColumns={1}
          ListHeaderComponent={<View style={{ height: 20 }} />} // Creates space below the header
          contentContainerStyle={{ paddingBottom: 100 }} // Avoids clipping at the bottom
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Image source={item.image} style={styles.eventImage} />
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
            </View>
          )}
        />

        {/* Floating Button */}
        <TouchableOpacity
          style={styles.createEventButton}
          onPress={() => router.push("/(main_screen)/event-reg-form")}
        >
          <Text style={styles.createEventText}>Create an Event</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  eventCard: {
    backgroundColor: "#d6e1ed",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.9,
    alignSelf: "center",

    // elevation: 2,
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  eventDate: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 5,
  },
  createEventButton: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    backgroundColor: "#39b54a",
    padding: 15,
    alignItems: "center",
    borderRadius: 25,
    elevation: 5,
  },
  createEventText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UpcomingEventsScreen;
