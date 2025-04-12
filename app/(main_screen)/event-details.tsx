import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import TopNavigationComponent from "@/components/topNavigationComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SERVER_ADDRESS from "@/config";
import { router } from "expo-router";

const EventDetails = () => {
  const params = useLocalSearchParams();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [registerCount, setRegisterCount] = useState(0);

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

  useEffect(() => {
    const fetchRegCount = async () => {
      if (authToken && params?.id) {
        const regCount = await getEventsRegCount();
        console.log("Fetched reg count:", regCount);
        setRegisterCount(regCount);
      }
    };

    fetchRegCount();
  }, [authToken, params.id]);

  const getEventsRegCount = async () => {
    try {
      const response = await fetch(
        `${SERVER_ADDRESS}/data/event_registrations/count?field=event_id&value=${params.id}&event_data_get=${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch registration count");
      }
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error("Error fetching registration count:", error);
      return 0;
    }
  };

  const handleRegister = async () => {
    // If link exists, open it instead of registering
    if (params.link && params.link !== "") {
      try {
        await Linking.openURL(params.link as string);
        return;
      } catch (error) {
        console.error("Error opening URL:", error);
        Alert.alert("Error", "Could not open the link.");
      }
    } else {
      try {
        const regCount = await getEventsRegCount();
        console.log(params.id);
        const userRegCountResponse = await fetch(
          `${SERVER_ADDRESS}/data/event_registrations/count?field=user_email&value=${userEmail}&event_data_get=${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        if (!userRegCountResponse.ok) {
          throw new Error("Failed to check user registration count");
        }

        const userRegCountData = await userRegCountResponse.json();
        const userRegCount = userRegCountData.count;

        if (params.event_tickets <= regCount) {
          Alert.alert("Error", "Event tickets are sold out.");
          return;
        }

        if (userRegCount > 0) {
          Alert.alert("Error", "You are already registered for this event.");
          return;
        }

        const payload = {
          event_id: params.id,
          event_name: params.title,
          event_date: params.date,
          event_time: params.time,
          event_venue: params.venue,
          event_status: params.status,
          user_email: userEmail,
          link: params.link,
        };

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
    }
  };

  const handleButtonPress = async () => {
    if (params.link && params.link !== "") {
      try {
        await Linking.openURL(params.link as string);
      } catch (error) {
        console.error("Error opening URL:", error);
        Alert.alert("Error", "Could not open the link.");
      }
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
          <Text style={styles.eventInfo}>
            Date:{" "}
            {params.status === "Rescheduled" || params.status === "Canceled"
              ? "N/A"
              : params.date || "N/A"}
          </Text>
          <Text style={styles.eventInfo}>
            Time:{" "}
            {params.status === "Rescheduled" || params.status === "Cancelled"
              ? "N/A"
              : params.time || "N/A"}
          </Text>
          <Text style={styles.eventInfo}>Venue: {params.venue || "N/A"}</Text>
          <Text style={styles.eventInfo}>Status: {params.status || "N/A"}</Text>

          <Text style={styles.eventInfo}>
            Tickets Available:{" "}
            {params.link && params.link !== ""
              ? "Registering through External Source"
              : isNaN(parseInt(params.tickets as string))
                ? "N/A"
                : parseInt(params.tickets as string) - registerCount}
          </Text>
        </View>
        {params.status === "Rescheduled" && (
          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: "#FFD700" }]}
            onPress={
              params.link && params.link !== "" ? handleButtonPress : undefined
            }
          >
            <Text style={styles.registerButtonText}>Event Rescheduled</Text>
          </TouchableOpacity>
        )}
        {params.status === "Cancelled" && (
          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: "#FF6347" }]}
            onPress={
              params.link && params.link !== "" ? handleButtonPress : undefined
            }
          >
            <Text style={styles.registerButtonText}>Event Canceled</Text>
          </TouchableOpacity>
        )}
        {params.status === "Completed" && (
          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: "#808080" }]}
            onPress={
              params.link && params.link !== "" ? handleButtonPress : undefined
            }
          >
            <Text style={styles.registerButtonText}>Event Completed</Text>
          </TouchableOpacity>
        )}
        {params.status === "Ongoing" && (
          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: "#4682B4" }]}
            onPress={
              params.link && params.link !== "" ? handleButtonPress : undefined
            }
          >
            <Text style={styles.registerButtonText}>Event In Progress</Text>
          </TouchableOpacity>
        )}
        {params.status !== "Rescheduled" &&
          params.status !== "Cancelled" &&
          params.status !== "Completed" &&
          params.status !== "Ongoing" && (
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>
                {params.link && params.link !== ""
                  ? "Open Event Link"
                  : "Register to this Event!"}
              </Text>
            </TouchableOpacity>
          )}
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
