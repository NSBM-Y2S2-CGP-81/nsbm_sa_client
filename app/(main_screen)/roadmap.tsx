import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import RNPickerSelect from "react-native-picker-select";

const UniversityMapScreen = () => {
  const [mapType, setMapType] = useState<"standard" | "satellite" | "hybrid">(
    "satellite",
  );
  const [selectedLocation, setSelectedLocation] = useState("pool");

  const locationCoords = {
    pool: { latitude: 6.8218, longitude: 80.0415, title: "NSBM Swimming Pool" },
    library: { latitude: 6.8207, longitude: 80.0409, title: "NSBM Library" },
    playground: {
      latitude: 6.8221,
      longitude: 80.0421,
      title: "NSBM Playground",
    },
  };

  const region = {
    latitude: locationCoords[selectedLocation].latitude,
    longitude: locationCoords[selectedLocation].longitude,
    latitudeDelta: 0.0015,
    longitudeDelta: 0.0015,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>University Map</Text>

      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setMapType("standard")}
        >
          <Text>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setMapType("hybrid")}
        >
          <Text>Road Map</Text>
        </TouchableOpacity>

        <View style={styles.dropdown}>
          <RNPickerSelect
            value={selectedLocation}
            onValueChange={(value) => setSelectedLocation(value)}
            items={[
              { label: "Swimming Pool", value: "pool" },
              { label: "Library", value: "library" },
              { label: "Playground", value: "playground" },
            ]}
          />
        </View>
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        region={region}
      >
        <Marker
          coordinate={{
            latitude: locationCoords[selectedLocation].latitude,
            longitude: locationCoords[selectedLocation].longitude,
          }}
          title={locationCoords[selectedLocation].title}
        />
      </MapView>
    </SafeAreaView>
  );
};

export default UniversityMapScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#C6EBC5",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    padding: 12,
  },
  controlPanel: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#f1f1f1",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ddd",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  dropdown: {
    flex: 1,
    marginLeft: 10,
  },
  map: {
    flex: 1,
  },
});
