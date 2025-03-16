import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
// import { RouteProp } from "@react-navigation/native";
import { ImageSourcePropType } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

// Define the Event type, including the image property
type Event = {
  title: string;
  date: string;
  time: string;
  venue: string;
  image: ImageSourcePropType; // Use ImageSourcePropType for dynamic image sources
};

// Define the navigation stack param list
type RootStackParamList = {
  EventDetails: { event: Event };
};

// Define the route type for EventDetails
type EventDetailsRouteProp = RouteProp<RootStackParamList, "EventDetails">;

interface EventDetailsProps {
  route: EventDetailsRouteProp;
}

const EventDetails: React.FC<EventDetailsProps> = ({ route }) => {
  const params = useLocalSearchParams();
  console.log(params);
  // const { event } = params; // Now 'event' is properly typed
  // console.log(event);

  return (
    <View style={styles.container}>
      {params.image && (
        <Image source={{ uri: params.image }} style={styles.eventImage} />
      )}
      <Text style={styles.eventTitle}>{params.title}</Text>
      <Text style={styles.eventInfo}>Date: {params.date}</Text>
      <Text style={styles.eventInfo}>Time: {params.time}</Text>
      <Text style={styles.eventInfo}>Venue: {params.venue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#FFFFF",
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default EventDetails;
