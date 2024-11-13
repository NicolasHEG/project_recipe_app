import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator, StyleSheet } from "react-native";
import { getGroceryStores } from "../api";
import { Map } from "./Map";

export function MapViewComponent() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groceryStores, setGroceryStores] = useState([]);
  const [fetchingStores, setFetchingStores] = useState(false);

  const fetchLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("No permission to get location");
        setLoading(false);
        return;
      }

      // Try fetching a cached location first
      const cachedLocation = await Location.getLastKnownPositionAsync();
      if (cachedLocation) {
        setLocation(cachedLocation);
        return;
      }

      // Fetch a fresh location
      const freshLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 5000,
      });
      setLocation(freshLocation);
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Failed to fetch location. Please try again.");
    } finally {
      setLoading(false); // Stop loading after trying to fetch location
    }
  };

  const fetchGroceryStores = async () => {
    if (fetchingStores) {
      return;
    }

    setFetchingStores(true); // Indicate stores are being fetched

    try {
      console.log("Start fetching grocery stores");
      console.log("Location " + location.coords.latitude + " " + location.coords.longitude);

      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      const data = await getGroceryStores(region);
      console.log("API response in app.js", JSON.stringify(data));
      setGroceryStores(data.elements);
    } catch (error) {
      console.error("Error fetching grocery stores:", error);
    } finally {
      setFetchingStores(false); // Reset fetching state
    }
  };

  // Fetch location on component mount
  useEffect(() => {
    fetchLocation();
  }, []);

  // Fetch grocery stores when the location is available
  useEffect(() => {
    if (location) {
      fetchGroceryStores();
    }
  }, [location]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.errorContainer}>
        <Alert alert="Failed to fetch location. Please try again." />
      </View>
    );
  }

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <Map location={location.coords} groceryStores={groceryStores} />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
});