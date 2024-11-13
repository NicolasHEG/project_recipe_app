import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./components/Navigation";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthenticationProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AuthenticationProvider>
    </SafeAreaProvider>
  );
}
