import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Appbar, BottomNavigation, PaperProvider } from "react-native-paper";
import RecipeSearch from "./RecipeSearch";
import GroceryList from "./GroceryList";
import FavoriteMeals from "./FavoriteMeals";
import RecipeDetails from "./RecipeDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Register from "./Register";
import {
  signOut,
  initializeAuth,
  getReactNativePersistence,
  onAuthStateChanged,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "../firebaseConfig";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Map } from "./Map";

const Stack = createNativeStackNavigator();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

/**
 * Component to handle bottom tab navigation
 */
function BottomTabNavigator() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "recipeSearch",
      title: "Recipes",
      focusedIcon: "text-box-search",
      unfocusedIcon: "text-box-search-outline",
    },
    {
      key: "favoriteMeals",
      title: "Favorites",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "groceryList",
      title: "Groceries",
      focusedIcon: "cart",
      unfocusedIcon: "cart-outline",
    },
    {
      key: "map",
      title: "Map",
      focusedIcon: "map",
      unfocusedIcon: "map-outline",
    }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    recipeSearch: RecipeSearch,
    favoriteMeals: FavoriteMeals,
    groceryList: GroceryList,
    map: Map
  });

  const handleSignout = () => {
    signOut(auth)
      .then(() => console.log("Signed out successfully"))
      .catch((error) => console.error("Error signing out:", error));
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="What's in my fridge" />
        <Appbar.Action icon="logout" onPress={handleSignout} />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

/**
 * Component to handle stack navigation
 */
function CustomStackNavigation({ isAuthenticated }) {
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="BottomNavigation"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecipeDetails"
            component={RecipeDetails}
            options={{ title: "", headerBackTitleVisible: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null; // Show a loading indicator while checking auth state

  return (
    <SafeAreaProvider>
      <CustomStackNavigation isAuthenticated={isAuthenticated} />
    </SafeAreaProvider>
  );
}
