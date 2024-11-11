import MapView, { Marker } from "react-native-maps";
import React from "react";
import StoreCardDetail from "./StoreCardDetail";

export function MapViewComponent({ location, groceryStores }) {
  // Ensure location and groceryStores are valid before rendering
  if (!location || !location.latitude || !location.longitude) {
    console.warn("Invalid location data provided to MapViewComponent");
    return null;
  }

  if (!groceryStores || Object.keys(groceryStores).length === 0) {
    console.warn("No grocery stores data provided to MapViewComponent");
  }

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
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        pinColor="blue"
        title="You are here"
      />
      {groceryStores.map((store, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: store.lat,
            longitude: store.lon,
          }}
          title={store.tags.name}
          description={
            `${store.tags["addr:brand"]}, ${store.tags["addr:housenumber"], store.tags["addr:street"]} ${store.tags["addr:postcode"]}`
        }
        />
      ))}
    </MapView>
  );
}
