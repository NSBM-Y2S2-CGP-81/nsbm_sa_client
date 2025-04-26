import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import TopNavigationComponent from "@/components/topNavigationComponent";
import SERVER_ADDRESS from "@/config";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [maxTickets, setMaxTickets] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // New states for event type dropdown and society name
  const [eventType, setEventType] = useState("");
  const [societyName, setSocietyName] = useState("");
  const [showEventTypeModal, setShowEventTypeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("");
  // Registration form link state
  const [registrationLink, setRegistrationLink] = useState("");

  // Event type options
  const eventTypes = [
    "Event Held by a Club",
    "Event Held by a Society",
    "A Stall",
  ];

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

  // Function to handle max tickets input, allowing only numbers
  const handleMaxTicketsChange = (text) => {
    // Only allow numeric input
    if (/^\d*$/.test(text)) {
      setMaxTickets(text);
    }
  };

  // Time picker handlers
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShowTimePicker(Platform.OS === "ios");
    setSelectedTime(currentTime);
  };

  // Format time for display
  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to submit event
  const submitEvent = async () => {
    if (
      !eventName ||
      !description ||
      !selectedDate ||
      !location ||
      !maxTickets ||
      !eventType
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    // Check if society name is required but not filled
    if (
      (eventType === "Event Held by a Club" ||
        eventType === "Event Held by a Society") &&
      !societyName
    ) {
      Alert.alert("Error", "Please enter the society or club name.");
      return;
    }

    if (!authToken) {
      Alert.alert("Error", "User authentication failed.");
      return;
    }

    setIsLoading(true);

    // Format the selected time (HH:MM:SS)
    const hours = selectedTime.getHours().toString().padStart(2, "0");
    const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
    const seconds = selectedTime.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Create payload with separate date and time
    const payload = {
      eventName,
      description,
      selectedDate, // YYYY-MM-DD
      selectedTime: formattedTime, // HH:MM:SS
      location,
      maxTickets: parseInt(maxTickets, 10),
      eventType,
      societyName: eventType === "A Stall" ? "" : societyName,
    };

    // Add registration link if event is not a stall
    if (eventType !== "A Stall" && registrationLink) {
      payload.registrationLink = registrationLink;
    }

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
      setIsLoading(false);

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
      setIsLoading(false);
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

          {/* Event Type Dropdown */}
          <Text style={{ fontWeight: "600" }}>This Event is a...</Text>
          <TouchableOpacity
            onPress={() => setShowEventTypeModal(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 15,
            }}
          >
            <Text style={{ flex: 1 }}>
              {eventType ? eventType : "Select Type"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="black" />
          </TouchableOpacity>

          {/* Event Type Modal */}
          <Modal
            visible={showEventTypeModal}
            transparent={true}
            animationType="slide"
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: "80%",
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 15,
                    textAlign: "center",
                  }}
                >
                  This Event is a ...
                </Text>
                {eventTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => {
                      setEventType(type);
                      setShowEventTypeModal(false);
                    }}
                    style={{
                      padding: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: "#eeeeee",
                    }}
                  >
                    <Text>{type}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() => setShowEventTypeModal(false)}
                  style={{
                    padding: 15,
                    alignItems: "center",
                    marginTop: 10,
                    backgroundColor: "#f8f8f8",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "#555" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Society Name (conditionally shown based on event type) */}
          {(eventType === "Event Held by a Club" ||
            eventType === "Event Held by a Society") && (
            <>
              <Text style={{ fontWeight: "600" }}>
                {eventType === "Event Held by a Club"
                  ? "Club Name"
                  : "Society Name"}
              </Text>
              <TextInput
                placeholder={`Enter ${eventType === "Event Held by a Club" ? "club" : "society"} name`}
                value={societyName}
                onChangeText={setSocietyName}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 15,
                }}
              />
            </>
          )}

          {/* Registration Form Link (shown only if not a stall) */}
          {eventType !== "A Stall" && eventType !== "" && (
            <>
              <Text style={{ fontWeight: "600" }}>
                Registration Form Link (Optional)
              </Text>
              <TextInput
                placeholder="Enter registration form URL"
                value={registrationLink}
                onChangeText={setRegistrationLink}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 15,
                }}
              />
            </>
          )}

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

          <Text style={{ fontWeight: "600" }}>Select Time</Text>
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
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
              {selectedTime ? formatTime(selectedTime) : "Pick a time"}
            </Text>
            <Ionicons name="time-outline" size={20} color="black" />
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={onTimeChange}
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

          <Text style={{ fontWeight: "600", marginTop: 10 }}>
            Maximum Tickets Available
          </Text>
          <TextInput
            placeholder="Enter maximum number of tickets"
            value={maxTickets}
            onChangeText={handleMaxTicketsChange}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              marginBottom: 15,
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
            disabled={isLoading}
            style={{
              backgroundColor: "#34A853",
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {isLoading ? (
              <>
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  Creating Event...
                </Text>
              </>
            ) : (
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Create Event
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default CreateEventScreen;
