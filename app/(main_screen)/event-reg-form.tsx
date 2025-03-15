import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

const CreateEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState("Select Here");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate.toLocaleString());
    }
  };

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
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#F0F0F0",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: 18,
              color: "green",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
          }}
        >
          Create an Event
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={image ? { uri: image } : require("@/assets/images/icon.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>

      <TextInput
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={handleDescriptionChange}
          multiline
          style={{ borderBottomWidth: 1, marginBottom: 10, flex: 1 }}
        />
        {showWarning && <Text style={{ color: "red", marginLeft: 5 }}>⚠️</Text>}
      </View>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text>{date ? date : "Select Here"}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity onPress={() => setLocation("Sample Location")}>
        <Text>{location}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={pickDocument}
        style={{ marginTop: 10, padding: 10, backgroundColor: "green" }}
      >
        <Text style={{ color: "white" }}>Attach File</Text>
      </TouchableOpacity>

      {file && <Text>Attached: {file.name}</Text>}
      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "green",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Create your event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateEventScreen;
