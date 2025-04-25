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
  Linking,
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
import { SafeAreaView } from "react-native-safe-area-context";

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
    try {
      router.push("/event-list");
    } catch (error) {
      console.error("Navigation error:", error);
      router.replace("/event-list");
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Navigation Error",
        text2: "There was an issue navigating to events.",
      });
    }
  };

  const handleNewsPress = async () => {
    Vibration.vibrate(10);
    try {
      const url = "https://www.nsbm.ac.lk/category/news/";
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Cannot Open URL",
          text2: "Unable to open the news page.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error",
        text2: "Failed to open the news page.",
      });
    }
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
        <ScrollView
          horizontal
          contentContainerStyle={styles.eventsScrollContainer}
          showsHorizontalScrollIndicator={false}
        >
          {events && events.length > 0 ? (
            events.map((event, index) => {
              try {
                return (
                  <EventsAndStallsScroller
                    key={index}
                    heading={event?.event_name || "Untitled Event"}
                    subtitle={event?.event_venue || "TBA"}
                    venues={event?.event_date || "TBA"}
                    status={event?.event_status || "Unknown"}
                    image={event?.event_image || ""}
                  />
                );
              } catch (error) {
                console.error("Error rendering event:", error);
                return (
                  <View key={index} style={{ padding: 10 }}>
                    <Text>Failed to load event</Text>
                  </View>
                );
              }
            })
          ) : (
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text>No events available at the moment</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={handlePress}
            style={styles.arrowButton}
            activeOpacity={0.7}
            // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-forward" size={14} color="#1B5E20" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Latest News</Text>
        <View>
          {Array.isArray(newsData) && newsData.length > 0 ? (
            <Carousel
              mode="parallax"
              width={width * 1}
              height={width / 1.2}
              data={newsData}
              loop={true}
              modeConfig={{
                parallaxScrollingScale: 1,
                parallaxScrollingOffset: 100,
              }}
              renderItem={({ item }) => {
                try {
                  return (
                    <TouchableOpacity
                      onPress={handleNewsPress}
                      style={styles.newsContainer}
                      activeOpacity={0.8}
                    >
                      <View style={styles.tintOverlay} />
                      <Text style={styles.newsTitle}>
                        {item?.news_title || "News title unavailable"}
                      </Text>
                      <Image
                        source={{
                          uri:
                            item?.image ||
                            "https://cssl.nsbm.ac.lk/wp-content/uploads/2023/07/NSBM-LOGO.png",
                        }}
                        style={styles.newsCarouselImage}
                        onError={() => {
                          console.log("Failed to load news image");
                        }}
                      />
                    </TouchableOpacity>
                  );
                } catch (error) {
                  console.error("Error rendering news item:", error);
                  return (
                    <View style={styles.newsContainer}>
                      <Text style={styles.newsTitle}>
                        Failed to load news item
                      </Text>
                    </View>
                  );
                }
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
    backgroundColor: "#FFFFFF",
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
    height: "86%",
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
  eventsScrollContainer: {
    paddingHorizontal: 0,
    paddingRight: 0, // Ensure arrow is fully visible
    alignItems: "center", // Center items vertically
  },
  arrowContainer: {
    width: 100,
    height: 35,
    backgroundColor: "#C8E6C9",
    borderRadius: 25, // Circular shape
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: 8, // Space from last event
    alignSelf: "center", // Center vertically
  },
});
