import MapView, { Marker } from "react-native-maps";
import React from "react";

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
            `${store.tags["brand"]}, ${store.tags["addr:street"], store.tags["addr:housenumber"]}, ${store.tags["addr:postcode"]} ${store.tags["addr:city"]}, ${store.tags["opening_hours"]}`
          
        }
        />
      ))}
    </MapView>
  );
}

