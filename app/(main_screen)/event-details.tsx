import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import TopNavigationComponent from "@/components/topNavigationComponent";

const EventDetails: React.FC = () => {
  const params = useLocalSearchParams();
  // console.log(params.image);

  const handleRegister = () => {
    alert("Registered successfully!"); // Replace with actual registration logic
  };

  return (
    <>
      <TopNavigationComponent
        title={"Event Details"}
        subtitle={""}
        navigateTo={"/(main_screen)/event-list"}
      />
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={{ uri: `${params.image}` }}
            style={styles.eventImage}
          />
          <Text style={styles.eventTitle}>{params.title || "Event Title"}</Text>
          <Text style={styles.eventInfo}>Date: {params.date || "N/A"}</Text>
          <Text style={styles.eventInfo}>Time: {params.time || "N/A"}</Text>
          <Text style={styles.eventInfo}>Venue: {params.venue || "N/A"}</Text>
        </View>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>
            Register to this Event !
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    alignItems: "center",
    width: "100%",
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#D6D6D6",
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  eventInfo: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  registerButton: {
    marginTop: 15,
    backgroundColor: "#AFD9AF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EventDetails;
