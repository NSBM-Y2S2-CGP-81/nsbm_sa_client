import React, { useLayoutEffect } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import LectureScheduleViewer from "@/components/lectureScheduling/LectureScheduleViewer"
import TopNavigationComponent from "@/components/topNavigationComponent"

export default function LectureSchedulingScreen() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  return (
    <>
      <TopNavigationComponent
        title={"Lecture Scheduling"}
        subtitle={""}
        navigateTo={"/(main_screen)/service-menu"}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <LectureScheduleViewer />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff"
  }
})
