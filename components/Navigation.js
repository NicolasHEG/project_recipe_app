import React, { useEffect, useState } from "react";
import { Appbar, BottomNavigation, PaperProvider } from "react-native-paper";
import RecipeSearch from "./RecipeSearch";
import GroceryList from "./GroceryList";
import FavoriteMeals from "./FavoriteMeals";
import RecipeDetails from "./RecipeDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Register from "./Register";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MapViewComponent } from "./MapViewComponent";
import { useAuthentication } from "../contexts/AuthenticationContext";


const Stack = createNativeStackNavigator();


/**
 * Component to handle bottom tab navigation
 */
function BottomTabNavigator() {
  const { logout } = useAuthentication();

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
    map: MapViewComponent
  });

  const handleSignout = () => {
    logout();
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
            name="Home"
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
  const { user, loading } = useAuthentication();
  if (loading) return null;

  return <CustomStackNavigation isAuthenticated={!!user} />;
}
