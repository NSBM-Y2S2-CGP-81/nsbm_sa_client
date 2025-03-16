import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const TopNavigationComponent = ({ title, subtitle, navigateTo }) => {
  return (
    <View style={styles.header}>
      <View style={styles.ServicesMenu}>
        <Ionicons
          name="return-up-back"
          size={24}
          color="#1B5E20"
          onPress={() => router.push(navigateTo)}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.profileIcon}>
        <Ionicons
          name="person"
          size={24}
          color="#1B5E20"
          onPress={() => router.push("/(main_screen)/user-profile")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#AFD9AF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  ServicesMenu: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#C8E6C9",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "300",
    color: "#1B5E20",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "300",
    color: "#4CAF50",
  },
  profileIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C8E6C9",
  },
});

export default TopNavigationComponent;
