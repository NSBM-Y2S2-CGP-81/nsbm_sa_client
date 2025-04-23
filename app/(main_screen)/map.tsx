import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import TopNavigationComponent from "@/components/topNavigationComponent";

export default function UniversityMap() {
  const [selectedTab, setSelectedTab] = useState('Map');
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
            style={[styles.tabButton, selectedTab === 'Map' && styles.activeTab]}
            onPress={() => setSelectedTab('Map')}
          >
            <Text style={styles.tabText}>Map</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Road Map' && styles.activeTab]}
            onPress={() => router.push("/(main_screen)/Roadmap")}
          >
            <Text style={styles.tabText}>Road Map</Text>
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <Image
          source={require("../../assets/images/nsbm_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Map Image */}
        <Image
          source={require("../../assets/images/uni_map.png")}
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
    backgroundColor: '#D0EAD9',
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#333',
  },
  logo: {
    width: '100%',
    height: 100,
    marginVertical: 10,
  },
  mapImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
});


