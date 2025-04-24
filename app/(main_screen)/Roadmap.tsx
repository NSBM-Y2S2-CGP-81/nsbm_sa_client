import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import TopNavigationComponent from '@/components/topNavigationComponent'; // Ensure this path is correct

export default function UniversityMap() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTab, setSelectedTab] = useState('Map');
  const router = useRouter();

 
  const data = [
    { key: 'FrontOffice', value: 'Front Office' },
    { key: 'Bank', value: 'Bank' },
    { key: 'FoodCity', value: 'Food City' },
    { key: 'FOE', value: 'FOE' },
    { key: 'FOC', value: 'FOC' },
    { key: 'FOB', value: 'FOB' },
    { key: 'StudentCenter', value: 'Student Center' },
    { key: 'Library', value: 'Library' },
    { key: 'Medicalcenter', value: 'Medical Center' },
    { key: 'Swimming Pool', value: 'Swimming Pool' },
    { key: 'GYM', value: 'GYM' },
    { key: 'Ground',value:'Ground'},
    { key: 'Hostel', value: 'Hostel' },
  ];

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

      <ScrollView style={styles.container}>
        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Map' && styles.activeTab]}
            onPress={() => {
              setSelectedTab('Map');
              router.push("/(main_screen)/map");
            }}
          >
            <Text style={[styles.tabText, selectedTab === 'Map' && styles.activeTabText]}>
              Map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Road Map' && styles.activeTab]}
            onPress={() => {
              setSelectedTab('Road Map');
              router.push("/(main_screen)/Roadmap");
            }}
          >
            <Text style={[styles.tabText, selectedTab === 'Road Map' && styles.activeTabText]}>
              Road Map
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dropdown for Location Selection */}
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Select a Location</Text>
          <SelectList
            setSelected={setSelectedLocation} // Hook to update selected location
            data={data} // Dropdown items
            save="value" // Save the value of the selected item
            boxStyles={styles.selectList} // Custom styles for the dropdown box
            inputStyles={styles.input} // Custom styles for the input
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#4CAF50', // Green background for tabs
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'white', // White border for tabs
  },
  activeTab: {
    backgroundColor: '#388E3C', // Dark green for active tab
    borderWidth: 2,
    borderColor: 'white',
  },
  tabText: {
    fontWeight: '600',
    color: '#fff', // White text for all tabs
  },
  activeTabText: {
    color: '#fff', // White text for active tab
  },
  contentContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  selectList: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  selectedLocation: {
    fontSize: 16,
    marginTop: 20,
    color: '#555',
  },
});
