// app/lecture-scheduling.tsx
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import LectureScheduleViewer from '../components/lectureScheduling/LectureScheduleViewer';
import LectureAttendance from '../components/lectureScheduling/LectureAttendance';

export default function LectureSchedulingScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lecture Scheduling</Text>
      
      {/* Display the calendar and lecture list */}
      <LectureScheduleViewer />
      
      {/* Display attendance details and progress */}
      <LectureAttendance />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
