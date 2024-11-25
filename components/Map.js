import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Card, Text, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function Map({ location, groceryStores }) {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* User's Location Marker */}
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        pinColor="blue"
        title="You are here"
      />

      {/* Grocery Store Markers */}
      {groceryStores.map((store, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: store.lat,
            longitude: store.lon,
          }}
          pinColor="red"
        >
          {/* Custom Callout */}
          <Callout tooltip>
            <View style={styles.calloutContainer}>
              <Card style={styles.card}>
                <Card.Content>
                  {/* Store Name */}
                  <View style={styles.header}>
                    <Icon name="storefront-outline" size={20} color="#6200EE" />
                    <Text variant="titleMedium" style={styles.title}>
                      {store.tags.name || "Unnamed Store"}
                    </Text>
                  </View>
                  <Divider style={styles.divider} />

                  {/* Store Details */}
                  <View style={styles.detailRow}>
                    <Icon name="map-marker-outline" size={16} color="#757575" />
                    <Text style={styles.detailText}>
                      {store.tags["addr:street"] || "Street: Not available"}{" "}
                      {store.tags["addr:housenumber"] || ""}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="city-variant-outline" size={16} color="#757575" />
                    <Text style={styles.detailText}>
                      {store.tags["addr:postcode"] || ""}{" "}
                      {store.tags["addr:city"] || "City: Not available"}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="clock-outline" size={16} color="#757575" />
                    <Text style={styles.detailText}>
                      {store.tags["opening_hours"] || "Hours: Not available"}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 280,
  },
  card: {
    elevation: 4,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  divider: {
    marginVertical: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  detailText: {
    marginLeft: 8,
    color: "#555",
    fontSize: 14,
  },
});
