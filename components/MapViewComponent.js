import * as Location from "expo-location";
import React, { useEffect, useState, useCallback } from "react";
import { Alert, View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { getGroceryStores } from "../api";
import { Map } from "./Map";
import { Card, Chip, SegmentedButtons } from "react-native-paper";
import debounce from "lodash.debounce";

export function MapViewComponent() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingStores, setFetchingStores] = useState(false);
  const [stores, setStores] = useState({
    supermarkets: [],
    groceries: [],
    conveniences: [],
  });
  const [storeSelection, setStoreSelection] = useState({
    supermarket: true,
    convenience: true,
    grocery: true,
  });
  const [selectedRadius, setSelectedRadius] = useState("5000");
  const [storeCache, setStoreCache] = useState({});

  const fetchLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied.");
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
      setLoading(false);
    }
  };

  // Fetch grocery stores based on the selected store types and radius
  const fetchGroceryStores = useCallback(async () => {
    if (!location) return;
    setFetchingStores(true);

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    // Copy the store cache to prevent modifying the original state
    const newStores = { ...storeCache };

    try {
      // Fetch data for selected store types
      await Promise.all(
        Object.keys(storeSelection).map(async (type) => {
          // Fetch data only if the store type is selected and not already cached
          if (storeSelection[type]) {
            // Check if the data is already cached
            if (!newStores[type]?.[selectedRadius]) {
              const data = await getGroceryStores(region, type, selectedRadius);
              // Update the store cache with the new data
              newStores[type] = {
                ...newStores[type],
                // Store the data in the cache with the selected radius as the key
                [selectedRadius]: data.elements,
              };
            }
          }
        })
      );

      // Update the state with the new store data
      setStores({
        supermarkets: storeSelection.supermarket
          ? newStores.supermarket?.[selectedRadius] || []
          : [],
        groceries: storeSelection.grocery
          ? newStores.grocery?.[selectedRadius] || []
          : [],
        conveniences: storeSelection.convenience
          ? newStores.convenience?.[selectedRadius] || []
          : [],
      });

      setStoreCache(newStores);
    } catch (error) {
      console.error("Error fetching grocery stores:", error);
    } finally {
      setFetchingStores(false);
    }
  }, [location, storeSelection, selectedRadius, storeCache]); // Dependency array for the useCallback hook to prevent unnecessary re-renders

  // Debounce the fetchGroceryStores function to prevent multiple calls in a short time
  const debouncedFetchGroceryStores = useCallback(
    debounce(fetchGroceryStores, 300),
    [fetchGroceryStores]
  );

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      debouncedFetchGroceryStores();
    }
  }, [location, storeSelection, selectedRadius]);

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
        <Text>Failed to fetch location. Please try again.</Text>
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
    <View style={{ flex: 1 }}>
      <Map
        location={location.coords}
        supermarkets={stores.supermarkets}
        groceryStores={stores.groceries}
        convenienceStores={stores.conveniences}
      />

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <Card style={styles.card}>
          <Card.Content>
            {Object.keys(storeSelection).map((type) => (
              <Chip
                key={type}
                selected={storeSelection[type]}
                onPress={() =>
                  setStoreSelection((prev) => ({
                    ...prev,
                    [type]: !prev[type],
                  }))
                }
                style={{ margin: 2 }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Stores
              </Chip>
            ))}
            <SegmentedButtons
              value={selectedRadius}
              onValueChange={(value) => setSelectedRadius(value)}
              buttons={[
                { label: "1 km", value: "1000" },
                { label: "2 km", value: "2000" },
                { label: "5 km", value: "5000" },
                { label: "10 km", value: "10000" },
              ]}
              style={{ marginTop: 10 }}
            />
          </Card.Content>
        </Card>
      </View>
      {fetchingStores && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading stores...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 0,
  },
  filterSection: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    maxHeight: "25%",
    zIndex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffffb3",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
});
