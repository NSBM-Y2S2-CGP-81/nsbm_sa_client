import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import TopNavigationComponent from "@/components/topNavigationComponent";

export default function UniversityMap() {
  const [selectedTab, setSelectedTab] = useState("Map");
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopNavigationComponent
        title={"University Map"}
        subtitle={""}
        navigateTo={"/(main_screen)/service-menu"}
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
              router.push("/(main_screen)/Roadmap");
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

        {/* Logo */}
        <Image
          source={require("@assets/images/nsbm_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Map Image */}
        <Image
          source={require("@assets/images/uni_map.png")}
          style={styles.mapImage}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    padding: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
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
    backgroundColor: "green", // All buttons will have a green background
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: "white", // White border for all buttons
  },
  activeTab: {
    backgroundColor: "green", // Green background for active tab
    borderWidth: 2,
    borderColor: "white", // White border for active tab
  },
  tabText: {
    fontWeight: "600",
    color: "#fff", // White text for all tabs
  },
  activeTabText: {
    color: "#fff", // White text for active tab
  },
  logo: {
    width: "100%",
    height: 100,
    marginVertical: 10,
  },
  mapImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
});
