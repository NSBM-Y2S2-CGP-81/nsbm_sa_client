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
import Icon from "react-native-vector-icons/MaterialIcons"; // Import icon library

const { width } = Dimensions.get("window");

interface Event {
  id: string;
  event_name: string;
  event_date: string;
  event_time: string;
  event_venue: string;
  event_status: string;
  event_tickets: number;
  event_image: string;
  event_link: string;
}

const UpcomingEventsScreen = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortByDate, setSortByDate] = useState(true); // State for sorting
  const [buttonLoading, setButtonLoading] = useState(false); // State for button loading
  const [cardLoading, setCardLoading] = useState(false); // State for card loading

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
        if (result) {
          // Sort events by date if sortByDate is true
          const sortedEvents = sortByDate
            ? [...result].sort(
                (a, b) =>
                  new Date(a.event_date).getTime() -
                  new Date(b.event_date).getTime(),
              )
            : result;
          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [sortByDate]); // Re-fetch or re-sort when sortByDate changes

  const toggleSort = () => {
    setSortByDate(!sortByDate);
  };

  const handleCreateEventPress = async () => {
    setButtonLoading(true);
    try {
      // Simulate a delay or perform any necessary action here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/(main_screen)/event-reg-form");
    } catch (error) {
      console.error("Error navigating to event registration form:", error);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleEventCardPress = async (item: Event) => {
    setCardLoading(true);
    try {
      router.push({
        pathname: "/(main_screen)/event-details",
        params: {
          id: item.id,
          title: item.event_name,
          date: item.event_date,
          time: item.event_time,
          venue: item.event_venue,
          status: item.event_status,
          tickets: item.event_tickets,
          image: item.event_image,
          link: item.event_link,
        },
      });
    } catch (error) {
      console.error("Error navigating to event details:", error);
    } finally {
      setCardLoading(false);
    }
  };

  return (
    <>
      <TopNavigationComponent
        title="Upcoming Events"
        subtitle=""
        navigateTo="/(main_screen)/event-list"
      />
      {loading ? (
        <Loading />
      ) : cardLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          {/* Filter Icon Button */}
          <TouchableOpacity style={styles.filterButton} onPress={toggleSort}>
            <Icon
              name={sortByDate ? "filter-list-off" : "filter-list"}
              size={24}
              color="#39b54a"
            />
          </TouchableOpacity>
          <FlatList
            data={events}
            numColumns={1}
            ListHeaderComponent={<View style={{ height: 20 }} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleEventCardPress(item)}>
                <View style={styles.eventCard}>
                  <Image
                    source={{ uri: item.event_image }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventTitle}>{item.event_name}</Text>
                  <Text style={styles.eventDate}>{item.event_date}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          />
          {buttonLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              style={styles.createEventButton}
              onPress={handleCreateEventPress}
            >
              <Text style={styles.createEventText}>Create an Event</Text>
            </TouchableOpacity>
          )}
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
  filterButton: {
    position: "relative",
    padding: 10,
    paddingBottom: .9,
    zIndex: 1,
  },
});

export default UpcomingEventsScreen;