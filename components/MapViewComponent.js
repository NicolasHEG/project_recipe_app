import * as Location from "expo-location";
import React, { useEffect, useState, useCallback } from "react";
import { Alert, View, ActivityIndicator, StyleSheet } from "react-native";
import { getGroceryStores } from "../api";
import { Map } from "./Map";
import { Card, Chip, SegmentedButtons } from "react-native-paper";
// debounce is a utility function that limits the number of times a function is called in a given time frame
import debounce from "lodash.debounce";

export function MapViewComponent() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState({
    supermarkets: [],
    groceries: [],
    conveniences: [],
  });
  const [fetchingStores, setFetchingStores] = useState(false);
  const [storeSelection, setStoreSelection] = useState({
    supermarket: true,
    convenience: true,
    grocery: true,
  });
  const [storeCache, setStoreCache] = useState({
    supermarkets: [],
    groceries: [],
    conveniences: [],
  });

  const [selectedRadius, setSelectedRadius] = useState(5000);

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
      setLoading(false);
    }
  };

  const fetchGroceryStores = async () => {
    if (fetchingStores) {
      return;
    }

    setFetchingStores(true);

    try {
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      const newStores = { ...storeCache };

      if (storeSelection.supermarket && newStores.supermarkets.length === 0) {
        const data = await getGroceryStores(region, "supermarket");
        newStores.supermarkets = data.elements;
      }
      if (storeSelection.convenience && newStores.conveniences.length === 0) {
        const data = await getGroceryStores(region, "convenience");
        newStores.conveniences = data.elements;
      }
      if (storeSelection.grocery && newStores.groceries.length === 0) {
        const data = await getGroceryStores(region, "grocery");
        newStores.groceries = data.elements;
      }

      setStoreCache(newStores);
      setStores({
        supermarkets: storeSelection.supermarket ? newStores.supermarkets : [],
        groceries: storeSelection.grocery ? newStores.groceries : [],
        conveniences: storeSelection.convenience ? newStores.conveniences : [],
      });
    } catch (error) {
      console.error("Error fetching grocery stores:", error);
    } finally {
      setFetchingStores(false);
    }
  };

  // Debounce the fetchGroceryStores function to prevent multiple calls in a short time
  const debouncedFetchGroceryStores = useCallback(
    debounce(fetchGroceryStores, 300),
    [location, storeSelection]
  );

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      debouncedFetchGroceryStores();
    }
  }, [location, storeSelection]);

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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginVertical: 10 }}>
        <Card>
          <Card.Content>
            {Object.keys(storeSelection).map((type) => (
              <Chip
                key={type}
                selected={storeSelection[type]}
                onPress={() =>
                  setStoreSelection((prev) => ({
                    ...prev,
                    // If the store type is selected, deselect it and vice verse
                    [type]: !prev[type],
                  }))
                }
              >
                {/* Capitalize the first letter of the store type */}
                {type.charAt(0).toUpperCase() + type.slice(1)} Stores
              </Chip>
            ))}
            {/* Segemented buttons to manage search radius on map */}
            <SegmentedButtons
              value={selectedRadius}
              onValueChange={(value) => setSelectedRadius(value)}
              buttons={[
                { label: "1 km", value: 1000 },
                { label: "2 km", value: 2000 },
                { label: "5 km", value: 5000 },
                { label: "10 km", value: 10000 },
              ]}
            />
          </Card.Content>
        </Card>
      </View>
      <View style={{ flex: 4 }}>
        <Map
          location={location.coords}
          supermarkets={stores.supermarkets}
          groceryStores={stores.groceries}
          convenienceStores={stores.conveniences}
          radius={selectedRadius}
        />
      </View>
    </View>
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
