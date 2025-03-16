<<<<<<< HEAD
// components/lectureScheduling/LectureScheduleViewer.tsx
=======
>>>>>>> cd4a1bb (Add LectureScheduleViewer and LectureAttendance components for lecture scheduling screen)
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function LectureScheduleViewer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

<<<<<<< HEAD
  // Dummy lecture data
=======
  // Dummy lecture data for the selected date
>>>>>>> cd4a1bb (Add LectureScheduleViewer and LectureAttendance components for lecture scheduling screen)
  const lectures = [
    { id: 1, module: 'Mathematics', hall: 'Hall 1' },
    { id: 2, module: 'Physics', hall: 'Hall 2' },
  ];

  const onChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
<<<<<<< HEAD
    if (date) setSelectedDate(date);
=======
    if (date) {
      setSelectedDate(date);
    }
>>>>>>> cd4a1bb (Add LectureScheduleViewer and LectureAttendance components for lecture scheduling screen)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.heading}>
          Select Date: {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
<<<<<<< HEAD
      
=======
>>>>>>> cd4a1bb (Add LectureScheduleViewer and LectureAttendance components for lecture scheduling screen)
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
<<<<<<< HEAD
      
=======
>>>>>>> cd4a1bb (Add LectureScheduleViewer and LectureAttendance components for lecture scheduling screen)
      <View style={styles.lectureList}>
        {lectures.map((lecture) => (
          <View key={lecture.id} style={styles.lectureItem}>
            <Text style={styles.moduleText}>{lecture.module}</Text>
            <Text style={styles.hallText}>({lecture.hall})</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lectureList: {
    marginTop: 10,
  },
  lectureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
  },
  moduleText: {
    fontSize: 16,
  },
  hallText: {
    fontSize: 16,
    color: 'gray',
  },
});
