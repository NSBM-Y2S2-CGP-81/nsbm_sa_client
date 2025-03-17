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

export default function EventSearchAndGallery({ events }) {
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
            <Image
              source={{ uri: `${event.event_image}` }}
              style={styles.eventImage}
            />
            <Text style={styles.galleryText}>{event.event_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
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
    textAlign: "center", // Ensures the text is centered under the image
    flexWrap: "wrap", // Allows the title to wrap to the next line
    width: 100, // Keeps the text container width fixed to match the image
  },
  eventCard: {
    marginRight: 10,
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#D1EED5",
    flex: 1,
  },
  eventImage: {
    borderRadius: 5,
    width: 100,
    height: 100,
  },
});
