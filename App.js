import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./components/Navigation";
import { GroceryProvider } from "./contexts/GroceryContext";

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GroceryProvider>
          <Navigation />
        </GroceryProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
