import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import TopNavigationComponent from "@/components/topNavigationComponent";

const CreateEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "application/pdf"],
    });
    if (result.type !== "cancel") {
      setFile(result);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.uri);
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
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>

          <TextInput
            placeholder="Event Name"
            value={eventName}
            onChangeText={setEventName}
            style={{
              borderBottomWidth: 1,
              marginBottom: 10,
              paddingVertical: 20,
            }}
          />

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={100}
            style={{
              borderBottomWidth: 1,
              marginBottom: 15,
              paddingVertical: 20,
            }}
          />

          <Text style={{ fontWeight: "100" }}> Select Date </Text>
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
            <Text style={{ flex: 1 }}>{selectedDate ? selectedDate : ""}</Text>
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

          <Text style={{ fontWeight: "100" }}> Select Location </Text>
          <TextInput
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Text style={{ flex: 1 }}></Text>
          </TextInput>

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
            style={{
              backgroundColor: "#34A853",
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Create your event
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default CreateEventScreen;
