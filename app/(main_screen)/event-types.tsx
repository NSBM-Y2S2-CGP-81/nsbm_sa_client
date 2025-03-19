import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import TopNavigationComponent from "@/components/topNavigationComponent";
import fetchData from "../services/fetcher";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "@/components/loader";

const { width } = Dimensions.get("window");

const UpcomingEventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const key = await AsyncStorage.getItem("apiKey");
        if (!key) {
          console.error("API Key not found");
          return;
        }
        setLoading(true);
        const result = await fetchData("events", key);
        if (result) setEvents(result);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <TopNavigationComponent
        title="Upcoming Events"
        subtitle=""
        navigateTo="/(main_screen)/event-list"
      />
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={events}
            numColumns={1}
            ListHeaderComponent={<View style={{ height: 20 }} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <Image
                  source={{ uri: item.event_image }}
                  style={styles.eventImage}
                />
                <Text style={styles.eventTitle}>{item.event_name}</Text>
                <Text style={styles.eventDate}>{item.event_date}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.createEventButton}
            onPress={() => router.push("/(main_screen)/event-reg-form")}
          >
            <Text style={styles.createEventText}>Create an Event</Text>
          </TouchableOpacity>
        </View>
      )}
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
