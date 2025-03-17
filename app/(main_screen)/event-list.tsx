import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Stack, useRouter } from "expo-router";
import CustomText from "@/components/CustomText";
import fetchData from "../services/fetcher";
import TopNavigationComponent from "@/components/topNavigationComponent";
import EventSearchAndGallery from "@/components/eventsAndGallery";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState<
    Record<string, { event: any }>
  >({});
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const key = await AsyncStorage.getItem("apiKey");
      const result = await fetchData("events", key);
      // console.log(result);
      setEvents(result);
    };

    fetchEvents();
  }, []);

  const handleEventSelection = (selectedDate: string, selectedEvent: any) => {
    if (!selectedDate) return;
    setMarkedDates((prev) => ({
      ...prev,
      [selectedDate]: { event: selectedEvent },
    }));
  };

  const goToEventDetails = (event: any) => {
    router.push({
      pathname: "/(main_screen)/event-details",
      params: {
        title: event.event_name,
        date: event.event_date,
        time: event.event_time,
        venue: event.event_venue,
        image: event.event_image,
      },
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopNavigationComponent
        title={"Events and Stalls"}
        subtitle={""}
        navigateTo={"/(main_screen)/service-menu"}
      />
      <ScrollView style={styles.container}>
        <EventSearchAndGallery events={events} />

        <TouchableOpacity
          onPress={() => router.replace("/(main_screen)/event-types")}
        >
          <CustomText style={styles.seeMore}>See More</CustomText>
        </TouchableOpacity>

        <Calendar
          markedDates={markedDates}
          onDayPress={(day) => {
            const selectedEvent = events.find((e) => e.date === day.dateString);
            if (selectedEvent) {
              goToEventDetails(selectedEvent);
            }
          }}
          dayComponent={({ date, state }) => {
            if (!date?.dateString)
              return (
                <View>
                  <Text>-</Text>
                </View>
              );

            const event = events.find((e) => e.event_date === date.dateString);

            return (
              <View style={styles.calendarDay}>
                <TouchableOpacity
                  onPress={() => event && goToEventDetails(event)}
                >
                  <View
                    style={[
                      styles.eventCircle,
                      event ? styles.eventHighlighted : {},
                    ]}
                  >
                    <Text
                      style={[
                        styles.calendarText,
                        state === "disabled" ? { color: "gray" } : {},
                      ]}
                    >
                      {date.day ?? "-"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
});

export default EventList;
