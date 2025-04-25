import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Animated,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter, Stack } from "expo-router";
import TopNavigationComponent from "@/components/topNavigationComponent";

export default function UniversityMap() {
  const [selectedTab, setSelectedTab] = useState("Map");
  const [selectedLocation, setSelectedLocation] = useState("");
  const dropAnim = useRef(new Animated.Value(-30)).current;
  const router = useRouter();

  const data = [
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

  const locationPins = {
    "Front Office": { top: 60, left: 200 },
    Bank: { top: 80, left: 200 },
    "Food City": { top: 70, left: 200 },
    FOE: { top: 20, left: 70 },
    FOC: { top: 100, left: 80 },
    "Medical Center": { top: 60, left: 110 },
    FOB: { top: 60, left: 70 },
    "Student Center": { top: 80, left: 130 },
    Library: { top: 40, left: 130 },
    "Swimming Pool": { top: 10, left: 160 },
    GYM: { top: 10, left: 180 },
    Ground: { top: 10, left: 220 },
    Hostel: { top: 10, left: 40 },
  };

  useEffect(() => {
    if (selectedLocation && locationPins[selectedLocation]) {
      dropAnim.setValue(-30);
      Animated.spring(dropAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 5,
      }).start();
    }
  }, [selectedLocation]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <TopNavigationComponent
        title="University Map"
        subtitle=""
        navigateTo="/(main_screen)/service-menu"
      />

      <ScrollView style={styles.container}>
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

        <View style={styles.contentContainer}>
          <Text style={styles.text}>Select a Location</Text>

          {/* Dropdown placed above the map */}
          <SelectList
            setSelected={setSelectedLocation}
            data={data}
            save="value"
            boxStyles={styles.selectList}
            inputStyles={styles.input}
          />

          <ImageBackground
            source={require("../../assets/images/uni_map.png")}
            style={styles.mapImage}
            imageStyle={{ borderRadius: 10 }}
          >
            {selectedLocation && locationPins[selectedLocation] && (
              <Animated.View
                style={[
                  styles.pin,
                  {
                    top: locationPins[selectedLocation].top,
                    left: locationPins[selectedLocation].left,
                    transform: [{ translateY: dropAnim }],
                  },
                ]}
              >
                <Text style={styles.pinText}>📍</Text>
              </Animated.View>
            )}
          </ImageBackground>
        </View>
      </ScrollView>
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
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: "white",
  },
  activeTab: {
    backgroundColor: "#388E3C",
    borderWidth: 2,
    borderColor: "white",
  },
  tabText: {
    fontWeight: "600",
    color: "#fff",
  },
  activeTabText: {
    color: "#fff",
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
    marginBottom: 30, // more spacing between dropdown and map
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  mapImage: {
    width: "100%",
    aspectRatio: 1.75,
    borderRadius: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  pin: {
    position: "absolute",
    zIndex: 10,
  },
  pinText: {
    fontSize: 42, // Larger symbol
    color: "#1E3A8A",
    fontWeight: "bold",
  },
});
