import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./components/Navigation";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { christmasTheme } from "./theme";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={christmasTheme}>
        <AuthenticationProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </AuthenticationProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
