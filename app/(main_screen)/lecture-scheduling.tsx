import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LectureScheduleViewer from "@/components/lectureScheduling/LectureScheduleViewer";
import LectureAttendance from "@/components/LectureAttendance";
import TopNavigationComponent from "@/components/topNavigationComponent";

export default function LectureSchedulingScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <>
      <TopNavigationComponent
        title={"Lecture Scheduling"}
        subtitle={""}
        navigateTo={"/(main_screen)/service-menu"}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <LectureScheduleViewer />
        <LectureAttendance />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
