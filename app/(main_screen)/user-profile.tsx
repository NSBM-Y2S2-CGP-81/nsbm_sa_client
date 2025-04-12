import React, { useState, useEffect } from "react"; // Added useEffect
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
import { router } from "expo-router"; // Import router from expo-router

const UserProfile = () => {
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
      setStudentId(studentId || "");
      setIntake(intake || "");
      setName(name || "");
      setNsbmEmail(nsbmEmail || "");
      setDegree(degree || "");
      setOfferedBy(offeredBy || "");
      setNic(nic || "");
      setEmail(email || "");
      setMobile(mobile || "");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getUserData();
  }, []); // Empty dependency array to run once on mount

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all AsyncStorage data
      Alert.alert("Logged Out", "You have been logged out successfully.", [
        {
          text: "OK",
          onPress: () => {
            router.replace("/(auth)/sign-in"); // Navigate to login screen
          },
        },
      ]);
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <>
    
      <TopNavigationComponent
        title={"User Profile"}
        subtitle={""}
        navigateTo={"/(main_screen)/"}
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
    paddingTop: 15,
  },
  profileContainer: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 12,
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
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: "#333",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default UserProfile;