import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import TopNavigationComponent from "@/components/topNavigationComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SERVER_ADDRESS from "@/config";
import { router } from "expo-router";

const EventDetails = () => {
  const params = useLocalSearchParams();
  const [authToken, setAuthToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("apiKey");
        const email = await AsyncStorage.getItem("email");
        if (token) setAuthToken(token);
        if (email) setUserEmail(email);
      } catch (error) {
        console.error("Error fetching auth token:", error);
      }
    };
    getAuthToken();
  }, []);

  const handleRegister = async () => {
    const payload = {
      event_id: params.id,
      event_name: params.title,
      event_date: params.date,
      event_time: params.time,
      event_venue: params.venue,
      user_email: userEmail, // use userEmail from state
    };

    try {
      const response = await fetch(
        `${SERVER_ADDRESS}/data/event_registrations/store`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          "Success",
          "Registration Completed! Further details will be sent to your email.",
        );
        router.push("/(main_screen)/event-list");
      } else {
        Alert.alert("Error", `Failed to register: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while registering.");
    }
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
          <Text style={styles.registerButtonText}>Register to this Event!</Text>
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
