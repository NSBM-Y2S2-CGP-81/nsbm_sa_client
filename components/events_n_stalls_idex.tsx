import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Vibration,
} from "react-native";
import { useRouter } from "expo-router";

export default function EventsAndStallsScroller({
  heading,
  subtitle,
  venues,
  image,
}) {
  const router = useRouter();

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.card}>
        <Image
          source={{
            uri:
              image ||
              "https://www.maga.lk/wp-content/uploads/2018/03/DJI_0057.jpg",
          }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.headingText}>{heading}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
          <Text style={styles.venueText}>{venues}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#d6e1ed",
    height: 200,
    width: 330,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  headingText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#0D47A1",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 25,
    fontWeight: "200",
    color: "#0D47A1",
    textAlign: "center",
  },
  venueText: {
    fontSize: 10,
    fontWeight: "300",
    color: "#0D47A1",
    textAlign: "center",
  },
  viewInfoButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#0D47A1",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  viewInfoText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
