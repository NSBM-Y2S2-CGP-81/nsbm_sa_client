import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import scheduleData from "@/data/lectureSchedule.json" 

export default function LectureScheduleViewer() {
  const currentUserId = "PLY123" //Simulation Purposes

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const formattedDate = selectedDate.toISOString().split("T")[0]

  // Step 1: Filter by Student ID
  const userLectures = scheduleData.filter(
    (lecture) => lecture.StudentID === currentUserId
  )

  // Step 2: Filter by selected date
  const filteredLectures = userLectures.filter((lecture) =>
    Object.values(lecture).includes(formattedDate)
  )

  // Step 3: Finding the day key
  const matchedDay = (lecture: any) =>
    Object.entries(lecture)
      .filter(([key, value]) => value === formattedDate)
      .map(([key]) => key)[0]

  const handleDateChange = (event: any, newDate?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false)
    if (newDate) setSelectedDate(newDate)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.heading}>
          Select Date: {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <ScrollView style={styles.lectureList}>
        {filteredLectures.length > 0 ? (
          filteredLectures.map((lecture, index) => (
            <View key={index} style={styles.lectureItem}>
              <Text style={styles.moduleText}>{lecture["Module Name"]}</Text>
              <Text style={styles.lecturerText}>Lecturer: {lecture["Lecturer"]}</Text>
              <Text style={styles.dayText}>Day: {matchedDay(lecture)}</Text>
              <Text style={styles.dateText}>Date: {formattedDate}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noLectureText}>No lectures scheduled</Text>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  lectureList: {
    marginTop: 15
  },
  lectureItem: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8
  },
  moduleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000"
  },
  lecturerText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2
  },
  dayText: {
    fontSize: 14,
    color: "#888",
    marginTop: 2
  },
  dateText: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4
  },
  noLectureText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20
  }
})
