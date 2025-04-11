import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Vibration,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { Stack } from "expo-router";
import fetchData from "../services/fetcher";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import authRefresh from "../services/authRefreshService";
import { AppProvider } from "@/app/services/GlobalContext";
import { Alert } from "react-native";
import EventsAndStallsScroller from "@/components/events_n_stalls_idex";
import Loading from "@/components/loader";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView

const width = Dimensions.get("window").width;

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const progress = useSharedValue(0);
  const [fullName, setFullName] = useState("Loading...");
  const [loadingstate, setLoadingState] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const key = await AsyncStorage.getItem("apiKey");
        if (key) {
          const stat = await authRefresh();
          if (stat == 2012) {
            console.log("Logged in");
            setIsLoggedIn(true);
            const storedName = await AsyncStorage.getItem("full_name");
            setFullName(storedName || "User");
            const result = await fetchData("news", key);
            setNewsData(result);
            const result_events = await fetchData("events", key);
            setEvents(result_events);
          } else {
            Alert.alert("Session Expired", "Please login again");
            router.replace("/(auth)/sign-in");
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
        setLoadingState(false);
      }
    };

    validateLogin();
  }, []);

  if (loadingstate) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <Loading message="Hang in there..." />
      </>
    );
  }

  const handlePress = () => {
    Vibration.vibrate(10);
    router.push("/event-list");
  };

  if (!isLoggedIn) {
    return null;
  }

  const images = [
    "https://cssl.nsbm.ac.lk/wp-content/uploads/2023/07/NSBM-LOGO.png",
    "https://www.eduwire.lk/wp-content/uploads/2025/01/1000-human_resource_circle_of_nsbm_green_university_cover.jpg",
    "https://d3c539pel8wzjz.cloudfront.net/wp-content/uploads/2021/08/r1-1.jpg",
    "https://idonura.wordpress.com/wp-content/uploads/2017/09/img_5287.jpg?w=1200&h=899",
    "https://media.licdn.com/dms/image/v2/C561BAQHiubTkMPrifw/company-background_10000/company-background_10000/0/1638507962416/nsbmgreenuniversity_cover?e=2147483647&v=beta&t=FD8-SbAHk-24clJVlVICcshOxvqYi2QPS5r4w7Fgpzo",
  ];

  return (
    <AppProvider>
      <Stack.Screen options={{ headerShown: false }} />
      
        <View style={styles.header}>
          <View style={styles.ServicesMenu}>
            <Ionicons
              name="grid"
              size={24}
              color="#1B5E20"
              onPress={() => {
                Vibration.vibrate(10);
                router.push("/service-menu");
              }}
            />
          </View>
          <Text style={styles.greeting}>
            Welcome back, {fullName.split(" ")[0] || "User"} !
          </Text>
          <View style={styles.profileIcon}>
            <Ionicons
              name="person"
              size={24}
              color="#1B5E20"
              onPress={() => {
                Vibration.vibrate(10);
                router.push("/(main_screen)/user-profile");
              }}
            />
          </View>
        </View>
        <ScrollView style={styles.container}>
          <Carousel
            mode="parallax"
            width={width}
            height={width / 1.5}
            data={images}
            loop={true}
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 90,
            }}
            onProgressChange={(_, absoluteProgress) =>
              (progress.value = absoluteProgress)
            }
            renderItem={({ item, index }) => (
              <View style={styles.carouselItem}>
                <Image
                  style={styles.carouselImage}
                  source={{ uri: item }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <Text
                  style={[
                    styles.Headings,
                    index === 0 && { fontStyle: "italic", fontWeight: "bold" },
                  ]}
                >
                  {index === 0
                    ? '"Connecting Campus Life, One App at a Time."'
                    : "Clicks by Community"}
                </Text>
              </View>
            )}
          />
          <Pagination.Basic
            progress={progress}
            data={images}
            dotStyle={{ backgroundColor: "#AFD9AF", borderRadius: 100 }}
            containerStyle={{ gap: 5, marginTop: 10 }}
          />

          <Text style={styles.sectionTitle}>Events & Stalls</Text>
          <ScrollView horizontal>
            {events.map((event, index) => (
              <EventsAndStallsScroller
                key={index}
                heading={event.event_name}
                subtitle={event.event_venue}
                venues={event.event_date}
                image={event.event_image}
              />
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.viewInfoButton}>
              <Text>See More</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Latest News</Text>
          <View>
            {Array.isArray(newsData) && newsData.length > 0 ? (
              <Carousel
                mode="normal"
                width={width * 1}
                height={width / 1.2}
                data={newsData}
                loop={true}
                modeConfig={{
                  parallaxScrollingScale: 1,
                  parallaxScrollingOffset: 100,
                }}
                renderItem={({ item }) => {
                  const base64Image = "data:image/jpeg;base64," + item.image;
                  return (
                    <View style={styles.newsContainer}>
                      <View style={styles.tintOverlay} />
                      <Text style={styles.newsTitle}>{item.news_title}</Text>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.newsCarouselImage}
                      />
                    </View>
                  );
                }}
              />
            ) : (
              <Text style={{ alignSelf: "center" }}>No news available</Text>
            )}
          </View>
        </ScrollView>
      
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Match container background
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 16,
    backgroundColor: "#AFD9AF",
  },
  Headings: {
    paddingTop: "2%",
    fontSize: 15,
    fontWeight: "300",
    color: "#1B5E20",
    alignSelf: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1B5E20",
  },
  viewInfoButton: {
    position: "absolute",
    bottom: 10,
    right: 15,
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#1B5E20",
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
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#C8E6C9",
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(144, 238, 144, 0.3)",
    borderRadius: 10,
  },
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "85%",
    height: "95%",
    borderRadius: 12,
  },
  newsCarouselImage: {
    width: "95%",
    height: "95%",
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  newsContainer: {
    width: "100%",
    borderColor: "#DCEDC8",
    alignItems: "center",
  },
  newsTitle: {
    fontSize: 14,
    padding: "2%",
    alignSelf: "center",
    fontWeight: "200",
    color: "#1B5E20",
  },
});