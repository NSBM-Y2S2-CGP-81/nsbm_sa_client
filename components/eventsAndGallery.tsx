import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

const events = [
  {
    title: "NSBM Green Fiesta 2025",
    image: require("@/assets/images/green_fiesta.jpg"),
  },
  {
    title: "NSBM Sports Fiesta 2025",
    image: require("@/assets/images/sports_fiesta.jpg"),
  },
  {
    title: "Food Festival 2025",
    image: require("@/assets/images/sports_fiesta.jpg"),
  },
];

const EventSearchAndGallery = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search Event"
        placeholderTextColor="#888"
      />
      <ScrollView horizontal style={styles.galleryContainer}>
        {events.map((event, index) => (
          <TouchableOpacity key={index} style={styles.eventCard}>
            <Image source={event.image} style={styles.eventImage} />
            <Text style={styles.galleryText}>Event Placeholder</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  searchBox: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#F0F0F0",
    borderColor: "#DDD",
    borderWidth: 1,
  },
  galleryContainer: {
    marginVertical: 10,
  },
  galleryText: {
    paddingTop: 10,
    fontWeight: "300",
  },
  eventCard: {
    marginRight: 10,
    borderRadius: 10,
    // padding: 20,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#D1EED5",
    // borderWidth: 2,
    // borderColor: "purple", // Highlight border (change as needed)
  },
  eventImage: {
    borderRadius: 5,
    width: 100,
    height: 100,
  },
});

export default EventSearchAndGallery;
