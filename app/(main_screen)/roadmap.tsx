import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import TopNavigationComponent from "@/components/topNavigationComponent"; // Ensure this path is correct
import MapView, { Marker } from "react-native-maps";

export default function UniversityMap() {
  const [selectedLocation, setSelectedLocation] = useState("NSBM Campus");
  const [selectedTab, setSelectedTab] = useState("Map");
  const [mapType, setMapType] = useState("standard");
  const [region, setRegion] = useState({
    latitude: 6.8213, // NSBM Campus latitude
    longitude: 80.0424, // NSBM Campus longitude
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const router = useRouter();

  const locations = {
    "NSBM Campus": {
      latitude: 6.820460671993097,
      longitude: 80.03888517930638,
    },
    "Front Office": {
      latitude: 6.8213506731291735,
      longitude: 80.0408379531308,
    }, //6.8213506731291735, 80.0408379531308
    Bank: { latitude: 6.820879282522461, longitude: 80.04109276298496 }, // 6.820879282522461, 80.04109276298496
    "Food City": { latitude: 6.821207945672667, longitude: 80.04084717491133 }, // 6.821207945672667, 80.04084717491133
    FOE: { latitude: 6.821075578415378, longitude: 80.03899033636489 }, // 6.821075578415378, 80.03899033636489
    FOC: { latitude: 6.820140807048871, longitude: 80.03951488905602 }, // 6.820140807048871, 80.03951488905602
    FOB: { latitude: 6.820678095212645, longitude: 80.03894892431033 }, // 6.820678095212645, 80.03894892431033
    "Student Center": {
      latitude: 6.820732920502767,
      longitude: 80.04039558542064,
    }, // 6.820732920502767, 80.04039558542064
    Library: { latitude: 6.820691801540229, longitude: 80.03945967298614 }, // 6.820691801540229, 80.03945967298614
    "Medical Center": {
      latitude: 6.820642458776212,
      longitude: 80.04021061157556,
    }, // 6.820642458776212, 80.04021061157556
    "Swimming Pool": {
      latitude: 6.821998048355036,
      longitude: 80.03990052836966,
    }, // 6.821998048355036, 80.03990052836966
    GYM: { latitude: 6.8217876540280065, longitude: 80.0399917234747 }, //6.8217876540280065, 80.0399917234747
    Ground: { latitude: 6.822072618486066, longitude: 80.04054962294485 }, // 6.822072618486066, 80.04054962294485
    Hostel: { latitude: 6.821009993134411, longitude: 80.0378942360375 }, // 6.821009993134411, 80.037894236037
  };

  const data = [
    { key: "NSBM Campus", value: "NSBM Campus" },
    { key: "FrontOffice", value: "Front Office" },
    { key: "Bank", value: "Bank" },
    { key: "FoodCity", value: "Food City" },
    { key: "FOE", value: "FOE" },
    { key: "FOC", value: "FOC" },
    { key: "FOB", value: "FOB" },
    { key: "StudentCenter", value: "Student Center" },
    { key: "Library", value: "Library" },
    { key: "Medicalcenter", value: "Medical Center" },
    { key: "Swimming Pool", value: "Swimming Pool" },
    { key: "GYM", value: "GYM" },
    { key: "Ground", value: "Ground" },
    { key: "Hostel", value: "Hostel" },
  ];

  // Update map when location is selected
  useEffect(() => {
    if (
      selectedLocation &&
      locations[selectedLocation as keyof typeof locations]
    ) {
      setRegion({
        latitude:
          locations[selectedLocation as keyof typeof locations].latitude,
        longitude:
          locations[selectedLocation as keyof typeof locations].longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [selectedLocation]);

  // Toggle map type between standard and satellite
  const toggleMapType = () => {
    setMapType(mapType === "standard" ? "satellite" : "standard");
  };

  return (
    <>
      {/* Stack screen for header settings */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Top navigation bar component */}
      <TopNavigationComponent
        title="University Map"
        subtitle=""
        navigateTo="/(main_screen)/service-menu"
      />

      <View style={styles.container}>
        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Map" && styles.activeTab,
            ]}
            onPress={() => {
              setSelectedTab("Map");
              router.push("/(main_screen)/map");
            }}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "Map" && styles.activeTabText,
              ]}
            >
              Map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Road Map" && styles.activeTab,
            ]}
            onPress={() => {
              setSelectedTab("Road Map");
              router.push("/(main_screen)/roadmap");
            }}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "Road Map" && styles.activeTabText,
              ]}
            >
              Road Map
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dropdown for Location Selection */}
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Select a Location</Text>
          <SelectList
            setSelected={(val: string) => setSelectedLocation(val)} // Hook to update selected location
            data={data} // Dropdown items
            save="value" // Save the value of the selected item
            boxStyles={styles.selectList} // Custom styles for the dropdown box
            inputStyles={styles.input} // Custom styles for the input
            defaultOption={{ key: "NSBM Campus", value: "NSBM Campus" }}
          />

          {/* Toggle Map Type Button */}
          <TouchableOpacity
            style={styles.mapTypeButton}
            onPress={toggleMapType}
          >
            <Text style={styles.mapTypeButtonText}>
              {mapType === "standard"
                ? "Switch to Satellite View"
                : "Switch to Standard View"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView style={styles.map} region={region} mapType={mapType}>
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title={selectedLocation}
            />
          </MapView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#4CAF50", // Green background for tabs
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: "white", // White border for tabs
  },
  activeTab: {
    backgroundColor: "#388E3C", // Dark green for active tab
    borderWidth: 2,
    borderColor: "white",
  },
  tabText: {
    fontWeight: "600",
    color: "#fff", // White text for all tabs
  },
  activeTabText: {
    color: "#fff", // White text for active tab
  },
  contentContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  selectList: {
    borderColor: "#4CAF50",
    borderWidth: 2,
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  selectedLocation: {
    fontSize: 16,
    marginTop: 20,
    color: "#555",
  },
  mapContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: 400,
  },
  mapTypeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  mapTypeButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
