import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopNavigationComponent from "@/components/topNavigationComponent";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import SERVER_ADDRESS from "@/config";

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
  const [userId, setUserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      const userId = await AsyncStorage.getItem("userid");

      setStudentId(studentId || "");
      setIntake(intake || "");
      setName(name || "");
      setNsbmEmail(nsbmEmail || "");
      setDegree(degree || "");
      setOfferedBy(offeredBy || "");
      setNic(nic || "");
      setEmail(email || "");
      setMobile(mobile || "");
      setUserId(userId || "");
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

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const updateUserData = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID not found. Cannot update profile.");
      return;
    }

    setIsLoading(true);

    try {
      const token = await AsyncStorage.getItem("apiKey");

      if (!token) {
        Alert.alert(
          "Error",
          "Authentication token not found. Please login again.",
        );
        return;
      }

      const updatedUserData = {
        student_id: studentId,
        intake: intake,
        full_name: name,
        email: email,
        degree: degree,
        university: offeredBy,
        nic: nic,
        phone_number: mobile,
        // Removed _id field to prevent the immutable field modification error
      };

      const response = await axios.put(
        `${SERVER_ADDRESS}/data/users/update/${userId}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        // Update AsyncStorage with new data
        await AsyncStorage.setItem("student_id", studentId);
        await AsyncStorage.setItem("intake", intake);
        await AsyncStorage.setItem("full_name", name);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("degree", degree);
        await AsyncStorage.setItem("university", offeredBy);
        await AsyncStorage.setItem("nic", nic);
        await AsyncStorage.setItem("phone_number", mobile);

        Alert.alert("Success", "Profile updated successfully");
        setIsEditing(false);
      } else {
        Alert.alert("Error", "Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      Alert.alert(
        "Error",
        "Failed to update profile. " +
          (error.response?.data?.error ||
            "Please check your connection and try again."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (label, value, setter) => {
    return isEditing ? (
      <TextInput
        style={styles.inputBox}
        value={value}
        onChangeText={setter}
        placeholder={label}
      />
    ) : (
      <Text style={styles.textBox}>
        {label}: {value}
      </Text>
    );
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
            {renderField("StudentID", studentId, setStudentId)}
            {renderField("Intake", intake, setIntake)}
            {renderField("Name", name, setName)}
            {renderField("Email", email, setEmail)}
            {renderField("Degree", degree, setDegree)}
            {renderField("Offered By", offeredBy, setOfferedBy)}
            {renderField("NIC", nic, setNic)}
            {renderField("Mobile", mobile, setMobile)}
          </View>

          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#5cb85c" />
            ) : isEditing ? (
              <>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={updateUserData}
                >
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={toggleEditMode}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={toggleEditMode}
              >
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
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
  inputBox: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#5cb85c",
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#5cb85c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#5cb85c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#f0ad4e",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 10,
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
