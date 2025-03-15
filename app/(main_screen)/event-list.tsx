import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Stack, useRouter, router } from "expo-router";
import CustomText from "@/components/CustomText";

import { Ionicons } from "@expo/vector-icons";
import TopNavigationComponent from "@/components/topNavigationComponent";
import EventSearchAndGallery from "@/components/eventsAndGallery";

const events = [
  {
    title: "NSBM Green Fiesta 2025",
    date: "2025-02-13", // Corrected format for Calendar component
    time: "3PM",
    venue: "Phase 1 Ground",
    image: require("../../assets/images/green_fiesta.jpg"),
  },
  {
    title: "NSBM Sports Fiesta 2025",
    date: "2025-02-23",
    time: "5PM",
    venue: "Main Stadium",
    image: require("../../assets/images/sports_fiesta.jpg"),
  },
];

const EventList = () => {
  const router = useRouter();
  const [markedDates, setMarkedDates] = useState<
    Record<string, { event: any }>
  >({});

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
        title: "Test",
        date: "Test",
        time: "Test",
        venue: "Test",
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
        <EventSearchAndGallery />

        {/* <View style={styles.headerContainer}>
          <Text style={styles.header}>Set an event</Text>
        </View> */}
        <TouchableOpacity>
          <CustomText style={styles.seeMore}>See More</CustomText>
          onPress={() => router.replace("/(main_screen)/event-types")}
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
              ); // Fallback in case date is undefined

            const event = events.find((e) => e.date === date.dateString);

            return (
              <View>
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
                      {date.day ?? "-"} {/* Ensure `day` is not undefined */}
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
    // position: "absolute",
    backgroundColor: "#FFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "300",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#AFD9AF",
  },
  headerContainer: {
    padding: "2%",
  },
  eventCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(144, 238, 144)",
  },

  eventHighlighted: {
    backgroundColor: "orange",
  },
  calendarText: { fontSize: 16 },

  ServicesMenu: {
    alignItems: "center",
    justifyContent: "center", // This will vertically center the content
    // width: 40,
    // height: 40,
    borderRadius: 5,
    backgroundColor: "#C8E6C9",
  },
  seeMore: {
    textAlign: "center",
    color: "#4CAF50",
    margin: 2,
    marginBottom: 10,
    fontWeight: "200",
    fontSize: 14,
  },
});

export default EventList;
