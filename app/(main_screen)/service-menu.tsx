import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Stack } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter to handle navigation

const { width, height } = Dimensions.get("window");
import TopNavigationComponent from "@/components/topNavigationComponent";

const menuItems = [
  {
    title: "Events",
    icon: "calendar-alt",
    color: "#1B5E20", // Light Green
    navigateTo: "/(main_screen)/event-list",
  },
  {
    title: "Lectures",
    icon: "chalkboard-teacher",
    color: "#0E3A63", // Medium Green
    navigateTo: "/(main_screen)/lecture-scheduling",
  },
  {
    title: "Food",
    icon: "utensils",
    color: "#2A6A6C", // Dark Green
    navigateTo: "../../src/navigation/index.js",
  },
  {
    title: "University Map",
    icon: "map-marked-alt",
    color: "#3C78D8", // Light Green with a yellowish tint
    navigateTo: "/(main_screen)/map",
  },
  {
    title: "Seat Availability",
    icon: "chair",
    color: "#A35324", // Vibrant Green
    navigateTo: "/(main_screen)/seat-availability-main",
  },
  {
    title: "Profile",
    icon: "user",
    color: "#5D85C2", // Muted Green
    navigateTo: "/(main_screen)/user-profile",
  },
  {
    title: "Home",
    icon: "home",
    color: "#43A047", // A strong Green
    navigateTo: "/",
    badge: 0,
    isWide: true, // Marking this to adjust width
  },
];

export default function ServiceMenu() {
  const router = useRouter();
  const animations = useRef(menuItems.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      100, // Delay for each animation
      animations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1, // Target opacity and scale
          duration: 600, // Duration for the animation
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {/* <TopNavigationComponent
        title={"Welcome to Services"}
        subtitle={""}
        navigateTo={"/"}
      /> */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.navigateTo as any)} // Handle navigation on press
            >
              <Animated.View
                style={[
                  styles.tile,
                  { backgroundColor: item.color },
                  item.isWide && styles.wideTile, // Make Home tile wider
                  {
                    opacity: animations[index], // Apply animated opacity
                    transform: [
                      {
                        scale: animations[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1], // Start smaller, then scale to normal size
                        }),
                      },
                    ],
                  },
                ]}
              >
                {item.icon === "home" && item.badge !== undefined ? (
                  <View style={styles.badgeContainer}>
                    <Ionicons
                      name={item.icon}
                      size={height * 0.05}
                      color="#FFF"
                    />
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  </View>
                ) : (
                  <FontAwesome5
                    name={item.icon}
                    size={height * 0.05}
                    color="#FFF"
                  />
                )}
                <Text style={styles.tileText}>{item.title}</Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 10,
    alignItems: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: width * 0.96,
  },
  tile: {
    width: width * 0.45,
    height: height * 0.22,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  wideTile: {
    width: width * 0.93,
  },
  tileText: {
    color: "#FFF",
    marginTop: height * 0.01,
    fontSize: height * 0.02,
    fontWeight: "bold",
    textAlign: "center",
  },
  badgeContainer: {
    position: "relative",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -height * 0.015,
    right: -width * 0.02,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.005,
  },
  badgeText: {
    color: "#000",
    fontSize: height * 0.015,
    fontWeight: "bold",
  },
});
