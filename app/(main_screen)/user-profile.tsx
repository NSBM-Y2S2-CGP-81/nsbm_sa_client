import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import TopNavigationComponent from "@/components/topNavigationComponent";
import { ScrollView } from "react-native";

const UserProfile = () => {
  // Initialize states without default values, allowing user input
  const [studentId, setStudentId] = useState("123456");
  const [intake, setIntake] = useState("2023");
  const [name, setName] = useState("John Doe");
  const [nsbmEmail, setNsbmEmail] = useState("john.doe@nsbm.ac.lk");
  const [degree, setDegree] = useState("Computer Science");
  const [offeredBy, setOfferedBy] = useState("NSBM");
  const [nic, setNic] = useState("123456789V");
  const [email, setEmail] = useState("john.doe@gmail.com");
  const [mobile, setMobile] = useState("0771234567");

  return (
    <>
      <TopNavigationComponent
        title={"Seat Availability FOC"}
        subtitle={""}
        navigateTo={"/(main_screen)/seat-availability-main"}
      />
      <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.textBox}>{studentId}</Text>
            <Text style={styles.textBox}>{intake}</Text>
            <Text style={styles.textBox}>{name}</Text>
            <Text style={styles.textBox}>{nsbmEmail}</Text>
            <Text style={styles.textBox}>{degree}</Text>
            <Text style={styles.textBox}>{offeredBy}</Text>
            <Text style={styles.textBox}>{nic}</Text>
            <Text style={styles.textBox}>{email}</Text>
            <Text style={styles.textBox}>{mobile}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 15, // Adjust padding to align with the top navigation height
  },
  profileContainer: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 12, // Adjust for a softer rounded corner, matching common design styles
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
  },
  textBox: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8, // Rounded corners for text boxes
    marginBottom: 12, // Increased margin for better spacing
    fontSize: 16, // Adjust font size for readability
    backgroundColor: "#fafafa", // Light background color for text boxes
    color: "#333", // Text color
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2, // Added elevation for subtle shadow
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center", // Ensure text is centered
    fontSize: 16, // Increased font size for better readability
  },
});

export default UserProfile;
