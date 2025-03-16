// components/lectureScheduling/LectureAttendance.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LectureAttendance() {
  // We have dummy data for subjects and semester progress, but gotta make it to fetch it from the server
  const subjects = [
    { id: 1, name: 'CS101', attendance: 72 },
    { id: 2, name: 'CS102', attendance: 85 },
    { id: 3, name: 'CS103', attendance: 68 },
  ];

  const semesterProgress = 60; // Example: 60% completed

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Attendance</Text>
      {subjects.map((subject) => (
        <View key={subject.id} style={styles.subjectRow}>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text style={styles.subjectAttendance}>{subject.attendance}%</Text>
        </View>
      ))}

      <View style={styles.progressBarContainer}>
        <Text style={styles.progressText}>Semester Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${semesterProgress}%` }]} />
        </View>
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
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
  },
  subjectName: {
    fontSize: 16,
  },
  subjectAttendance: {
    fontSize: 16,
    color: 'gray',
  },
  progressBarContainer: {
    marginTop: 15,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
});
