import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Calendar } from "react-native-calendars";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import TopNavigationComponent from "@/components/topNavigationComponent";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

const CreateEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [location, setLocation] = useState("Select Here");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleDescriptionChange = (text) => {
    const words = text.trim().split(/\s+/).length;
    if (words > 100) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      setDescription(text);
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf"],
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
        title={"Create an Event"}
        subtitle={""}
        navigateTo={"/(main_screen)/service-menu"}
      />
      <ScrollView
        // contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1, padding: 0, backgroundColor: "#FFFFFF" }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            // borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            // shadowRadius: 5,
            // elevation: 5,
          }}
        >
          <TouchableOpacity
            onPress={pickImage}
            style={{ alignItems: "center", marginBottom: 15 }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: "#ddd",
                  padding: 15,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="camera"
                  size={24}
                  color="black"
                  style={{ marginRight: 10 }}
                />
                <Text>Pick an Image</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Event Name"
            value={eventName}
            onChangeText={setEventName}
            style={{
              borderBottomWidth: 1,
              marginBottom: 15,
              paddingVertical: 5,
            }}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={handleDescriptionChange}
              multiline
              style={{
                borderBottomWidth: 1,
                marginBottom: 15,
                flex: 1,
                paddingVertical: 5,
              }}
            />
            {showWarning && (
              <Text style={{ color: "red", marginLeft: 5 }}>⚠️</Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => setShowCalendar(!showCalendar)}
            style={{ marginBottom: 15 }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {selectedDate ? selectedDate : "Select Date"}
            </Text>
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

          <TouchableOpacity
            onPress={() => setLocation("Sample Location")}
            style={{ marginBottom: 15 }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{location}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickDocument}
            style={{
              padding: 10,
              backgroundColor: "#28A745",
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Attach File</Text>
          </TouchableOpacity>

          {file && (
            <Text style={{ fontSize: 14, color: "#555" }}>
              Attached: {file.name}
            </Text>
          )}

          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: "#007BFF",
              borderRadius: 10,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
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
