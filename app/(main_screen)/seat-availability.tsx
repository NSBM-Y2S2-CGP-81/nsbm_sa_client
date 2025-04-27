import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import authRefresh from "../services/authRefreshService";
import { Stack } from "expo-router";
import fetchData from "../services/fetcher";
import Toast from "react-native-toast-message";
import caraouselComponent from "@/components/textnimageCaraousel";
import { Ionicons } from "@expo/vector-icons";
import FacultyCard from "@/components/facultyCard";
import TopNavigationComponent from "@/components/topNavigationComponent";
import SeatDisplayBox from "@/components/seatDisplay";
import Loading from "@/components/loader";

const width = Dimensions.get("window").width;
const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

export default function SeatStuff() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seatData, setSeatData] = useState([]);
  const [userData, setUserData] = useState([]);
  const progress = useSharedValue(0);
  const [faculty, setFaculty] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const key = await AsyncStorage.getItem("apiKey");
        if (key) {
          const stat = await authRefresh();
          if (stat == 2012) {
            console.log("Logged in");
            setIsLoggedIn(true);
          } else {
            Toast.show({
              type: "error",
              position: "bottom",
              text1: "Session Expired !",
            });
          }
        } else {
          router.replace("/(auth)/sign-in");
        }
      } catch (error) {
        console.log("Error checking login status:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "System Experienced an Error !",
        });
      } finally {
        setLoading(false);
      }
    };

    const calculateSeatAvailability = async () => {
      try {
        const api = await AsyncStorage.getItem("apiKey");
        const fac_code = await AsyncStorage.getItem("fac_code");
        if (fac_code) {
          setFaculty(fac_code);
        }
        console.log(fac_code);
        const fetchedData = await fetchData("crowd_uplink", api);

        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          const apDataMap = new Map();

          fetchedData.forEach((entry) => {
            const existingEntry = apDataMap.get(entry.AP);
            if (
              !existingEntry ||
              new Date(entry.timestamp) > new Date(existingEntry.timestamp)
            ) {
              apDataMap.set(entry.AP, entry);
            }
          });

          const latestSeatData = Array.from(apDataMap.values());
          setSeatData(latestSeatData);
          console.log("Latest Seat Data:", latestSeatData);
          // Toast.show({
          //   type: "success",
          //   position: "bottom",
          //   text1: "Data Loaded Successfully!",
          // });
        }
      } catch (error) {
        console.log("Error fetching seat data:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Data Synchronization Failed!",
        });
      }
    };

    validateLogin();
    calculateSeatAvailability();

    const interval = setInterval(() => {
      console.log("Refreshing seat data...");
      calculateSeatAvailability();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <TopNavigationComponent
          title={"Seat Availability FOC"}
          subtitle={""}
          navigateTo={"/(main_screen)/seat-availability-main"}
        />
        <Loading />
      </>
    );
  }

  if (!isLoggedIn) {
    router.push("/(auth)/sign-in");
    return null; // Avoid rendering anything if not logged in
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <TopNavigationComponent
        title={"Seat Availability FOC"}
        subtitle={""}
        navigateTo={"/(main_screen)/seat-availability-main"}
      />
      <View style={styles.container}>
        <ScrollView>
          {seatData.length > 0 ? (
            seatData
              .filter((entry) => entry.faculty === faculty)
              .map((entry) => (
                <SeatDisplayBox
                  key={entry._id}
                  imageSource={(() => {
                    switch (entry.AP) {
                      case "fngl":
                        return require("@/assets/images/finagle.png");
                      case "foc2":
                        return require("@/assets/images/stdc.png");
                      // case "library":
                      // return require("@/assets/images/library.png");
                      // Add more cases as needed
                      default:
                        return require("@/assets/images/default.png");
                    }
                  })()}
                  title={entry.name}
                  seatAvailability={entry.seats}
                  onPress={() => {}} // Adding empty onPress handler as it's required
                />
              ))
          ) : (
            <Text style={styles.loadingText}>Loading seat data...</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Fixed the color code (was missing an F)
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center", // Center horizontally
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1B5E20",
    justifyContent: "flex-end",
  },
  profileIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C8E6C9",
  },
  ServicesMenu: {
    alignItems: "center",
    justifyContent: "center", // This will vertically center the content
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#C8E6C9",
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject, // fills the image's dimensions
    backgroundColor: "rgba(144, 238, 144, 0.3)", // light green with 30% opacity
    borderRadius: 10,
  },
  factCard: {
    alignSelf: "center",
  },
});
