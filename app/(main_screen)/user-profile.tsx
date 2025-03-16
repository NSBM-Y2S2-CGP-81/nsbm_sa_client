import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopNavigationComponent from "@/components/topNavigationComponent";
import { ScrollView } from "react-native";

const UserProfile = () => {
  // Initialize states without default values, allowing user input
  const [studentId, setStudentId] = useState("");
  const [intake, setIntake] = useState("");
  const [name, setName] = useState("");
  const [nsbmEmail, setNsbmEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [offeredBy, setOfferedBy] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Retrieve user data from AsyncStorage
  //
  const getUserData = async () => {
    try {
      const studentId = await AsyncStorage.getItem("student_id");
      const intake = await AsyncStorage.getItem("intake");
      const name = await AsyncStorage.getItem("full_name");
      const nsbmEmail = await AsyncStorage.getItem("email");
      const degree = await AsyncStorage.getItem("degree");
      const offeredBy = await AsyncStorage.getItem("university");
      const nic = await AsyncStorage.getItem("nic");
      const email = await AsyncStorage.getItem("email");
      const mobile = await AsyncStorage.getItem("phone_number");
      setStudentId(studentId);
      setIntake(intake);
      setName(name);
      setNsbmEmail(nsbmEmail);
      setDegree(degree);
      setOfferedBy(offeredBy);
      setNic(nic);
      setEmail(email);
      setMobile(mobile);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  getUserData(); // Call the function to retrieve user data

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all AsyncStorage data
      Alert.alert("Logged Out", "You have been logged out successfully.");
      // Optionally, navigate to login screen or reset state
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

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
            <Text style={styles.textBox}>StudentID: {studentId}</Text>
            <Text style={styles.textBox}>Intake: {intake}</Text>
            <Text style={styles.textBox}>Name: {name}</Text>
            <Text style={styles.textBox}>Email: {nsbmEmail}</Text>
            <Text style={styles.textBox}>Degree: {degree}</Text>
            <Text style={styles.textBox}>Offered By: {offeredBy}</Text>
            <Text style={styles.textBox}>NIC: {nic}</Text>
            <Text style={styles.textBox}>Email: {email}</Text>
            <Text style={styles.textBox}>Mobile: {mobile}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
