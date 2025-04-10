import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import TopNavigationComponent from "@/components/topNavigationComponent";
import SERVER_ADDRESS from "@/config";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";

const CreateEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // Fetch the auth token from AsyncStorage
  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("apiKey");
        console.log(token);
        if (token) setAuthToken(token);
        const email = await AsyncStorage.getItem("email");
        setUserEmail(email);
      } catch (error) {
        console.error("Error fetching auth token:", error);
      }
    };
    getAuthToken();
  }, []);

  // Function to convert file to base64
  const fileToBase64 = async (fileUri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Error converting file to base64:", error);
      return null;
    }
  };

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png", "application/pdf"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.assets && result.assets.length > 0) {
        const doc = result.assets[0];
        setFile(doc);
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick document.");
    }
  };

  const pickImage = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.assets && result.assets.length > 0) {
        const img = result.assets[0];
        setImage(img);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image.");
    }
  };

  // Function to submit event
  const submitEvent = async () => {
    if (!eventName || !description || !selectedDate || !location) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (!authToken) {
      Alert.alert("Error", "User authentication failed.");
      return;
    }

    // Create payload object instead of FormData
    const payload = {
      eventName,
      description,
      selectedDate,
      location,
    };

    // Add file as base64 if it exists
    if (file) {
      const fileBase64 = await fileToBase64(file.uri);
      if (fileBase64) {
        payload.file = {
          data: fileBase64,
          name: file.name,
          type: file.mimeType || "application/octet-stream",
        };
      }
    }

    // Add image as base64 if it exists
    if (image) {
      const imageBase64 = await fileToBase64(image.uri);
      if (imageBase64) {
        payload.image = {
          data: imageBase64,
          name: image.name || "event_image.jpg",
          type: image.mimeType || "image/jpeg",
        };
      }
    }

    try {
      const response = await fetch(
        `${SERVER_ADDRESS}/data/event_requests/store`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          "Success",
          "Event Creation Request Added !, An approval email will be sent to your NSBM email !",
        );
        router.push("/(main_screen)/event-list");
      } else {
        Alert.alert("Error", `Failed to create event: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while creating the event.");
    }
  };

  return (
    <>
      <TopNavigationComponent
        title={"Schedule an Event"}
        subtitle={""}
        navigateTo={"/(main_screen)/event-list"}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={pickImage}
            style={{ alignSelf: "flex-end", marginBottom: 10 }}
          >
            <Ionicons name="image" size={24} color="black" />
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 100, height: 100, marginBottom: 10 }}
            />
          )}

          <TextInput
            placeholder="Event Name"
            value={eventName}
            onChangeText={setEventName}
            style={{
              borderBottomWidth: 1,
              marginBottom: 10,
              paddingVertical: 10,
            }}
          />

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={200}
            style={{
              borderBottomWidth: 1,
              marginBottom: 15,
              paddingVertical: 10,
            }}
          />

          <Text style={{ fontWeight: "600" }}>Select Date</Text>
          <TouchableOpacity
            onPress={() => setShowCalendar(!showCalendar)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Text style={{ flex: 1 }}>
              {selectedDate ? selectedDate : "Pick a date"}
            </Text>
            <Ionicons name="calendar" size={20} color="black" />
          </TouchableOpacity>

          {showCalendar && (
            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setShowCalendar(false);
              }}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: "green" },
              }}
            />
          )}

          <Text style={{ fontWeight: "600" }}>Location</Text>
          <TextInput
            placeholder="Enter event location"
            value={location}
            onChangeText={setLocation}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
          />

          <TouchableOpacity
            onPress={pickDocument}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#A3D8A5",
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Ionicons
              name="attach"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: "white" }}>Attach File</Text>
          </TouchableOpacity>

          {file && <Text>Attached: {file.name}</Text>}

          <TouchableOpacity
            onPress={submitEvent}
            style={{
              backgroundColor: "#34A853",
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Create Event
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default CreateEventScreen;
