import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

export default function LectureScheduleViewer() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Static dataset for frontend rendering — will later be replaced with Excel parsing
  const lectures = [
    { id: 1, module: "Data Structures and Algorithms", hall: "FOC-C2-105", date: "2025-04-01" },
    { id: 2, module: "Database Management Systems", hall: "FOC-C2-L101", date: "2025-04-01" },
    { id: 3, module: "Software Engineering", hall: "FOC-C2-L102", date: "2025-04-02" },
    { id: 4, module: "Web Application Development", hall: "FOC-C2-003", date: "2025-04-03" },
    { id: 5, module: "Computer Networks", hall: "FOB-C1-L104", date: "2025-04-03" },
    { id: 6, module: "Operating Systems", hall: "FOB-C1-004", date: "2025-04-04" }
  ]

  const formattedDate = selectedDate.toISOString().split("T")[0]
  const filteredLectures = lectures.filter(l => l.date === formattedDate)

  const handleDateChange = (event: any, newDate?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false)
    if (newDate) setSelectedDate(newDate)
  }

  return (
    <View style={styles.container}>
      {/* Date selection header */}
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

      {/* Filtered lecture cards */}
      <View style={styles.lectureList}>
        {filteredLectures.length > 0 ? (
          filteredLectures.map(lecture => (
            <View key={lecture.id} style={styles.lectureItem}>
              <Text style={styles.moduleText}>{lecture.module}</Text>
              <Text style={styles.hallText}>{lecture.hall}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noLectureText}>No lectures scheduled</Text>
        )}
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginBottom: 8,
    borderRadius: 6
  },
  moduleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000"
  },
  hallText: {
    fontSize: 16,
    color: "#555"
  },
  noLectureText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20
  }
})
