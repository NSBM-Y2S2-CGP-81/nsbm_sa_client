import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Stack, useRouter } from "expo-router";
import CustomText from "@/components/CustomText";
import fetchData from "../services/fetcher";
import TopNavigationComponent from "@/components/topNavigationComponent";
import EventSearchAndGallery from "@/components/eventsAndGallery";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SERVER_ADDRESS from "@/config";

interface Event {
  _id: string;
  event_name: string;
  event_date: string;
  event_time: string;
  event_venue: string;
  event_image: string;
  event_status: string;
  event_link?: string;
  event_tickets?: string;
  event_id?: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [markedDates, setMarkedDates] = useState<
    Record<string, { marked: boolean; dots: any[] }>
  >({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);
  const [eventLoading, setEventLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const key = await AsyncStorage.getItem("apiKey");
        const result = await fetchData("events", key);

        // Filter out events with status "Declined"
        const approvedEvents = result.filter(
          (event: Event) => event.event_status !== "Declined",
        );
        setEvents(approvedEvents);

        // Create marked dates object for the calendar
        const dates: Record<string, { marked: boolean; dots: any[] }> = {};
        approvedEvents.forEach((event: Event) => {
          if (event.event_date) {
            if (!dates[event.event_date]) {
              dates[event.event_date] = {
                marked: true,
                dots: [{ color: "#FF7043" }],
              };
            } else {
              // Add another dot for multiple events on the same day
              dates[event.event_date].dots.push({ color: "#FF7043" });
            }
          }
        });
        setMarkedDates(dates);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    const selectedDate = day.dateString;
    // Set loading state while processing the selection
    setEventLoading(true);

    // Find all events for the selected date
    const eventsOnDay = events.filter((e) => e.event_date === selectedDate);

    // Simulate a slight delay to show loading screen
    setTimeout(() => {
      if (eventsOnDay.length > 0) {
        if (eventsOnDay.length === 1) {
          // If only one event, go directly to event details
          goToEventDetails(eventsOnDay[0]);
        } else {
          // If multiple events, show modal
          setSelectedDateEvents(eventsOnDay);
          setModalVisible(true);
        }
      }
      setEventLoading(false);
    }, 800); // Small delay to show loading state
  };

  const getEventsRegCount = async (event: Event) => {
    try {
      const response = await fetch(
        `${SERVER_ADDRESS}/data/event_registrations/count?field=event_id&value=${event.event_id}`,
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

  const goToEventDetails = (event: Event) => {
    setModalVisible(false);
    setEventLoading(true); // Show loading throbber

    // Navigate after a small delay to ensure the loading state is visible
    setTimeout(() => {
      router.push({
        pathname: "/(main_screen)/event-details",
        params: {
          id: event._id,
          tickets: event.event_tickets,
          title: event.event_name,
          date: event.event_date,
          time: event.event_time,
          venue: event.event_venue,
          image: event.event_image,
          status: event.event_status,
          link: event.event_link,
        },
      });
    }, 1000);
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => goToEventDetails(item)}
    >
      <Text style={styles.eventName}>{item.event_name}</Text>
      <Text style={styles.eventTime}>{item.event_time}</Text>
      <Text style={styles.eventVenue}>{item.event_venue}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopNavigationComponent
        title={"Events and Stalls"}
        subtitle={""}
        navigateTo={"/(main_screen)/service-menu"}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1B5E20" />
          <Text style={styles.loadingText}>Fetching Event Details...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <EventSearchAndGallery events={events} />

          <TouchableOpacity
            onPress={() => router.replace("/(main_screen)/event-types")}
          >
            <CustomText style={styles.seeMore}>See More</CustomText>
          </TouchableOpacity>

          <Calendar
            markedDates={markedDates}
            markingType={"multi-dot"}
            onDayPress={handleDayPress}
          />

          {/* Event loading overlay */}
          {eventLoading && (
            <View style={styles.eventLoadingOverlay}>
              <View style={styles.eventLoadingContainer}>
                <ActivityIndicator size="large" color="#1B5E20" />
                <Text style={styles.loadingText}>Loading Event...</Text>
              </View>
            </View>
          )}

          {/* Modal for multiple events on the same day */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                  Events on{" "}
                  {selectedDateEvents.length > 0
                    ? selectedDateEvents[0].event_date
                    : ""}
                </Text>

                <FlatList
                  data={selectedDateEvents}
                  renderItem={renderEventItem}
                  keyExtractor={(item, index) => index.toString()}
                  style={styles.eventsList}
                />

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  eventCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(144, 238, 144)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  eventHighlighted: {
    backgroundColor: "#FF7043",
    borderWidth: 2,
    borderColor: "#FF5722",
  },
  calendarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  calendarDay: {
    justifyContent: "center",
    alignItems: "center",
  },
  seeMore: {
    textAlign: "center",
    color: "#4CAF50",
    margin: 10,
    fontWeight: "600",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1B5E20",
  },
  eventsList: {
    width: "100%",
  },
  eventItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    width: "100%",
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  eventTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  eventVenue: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  closeButton: {
    backgroundColor: "#1B5E20",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    width: "50%",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  eventLoadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  eventLoadingContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default EventList;
