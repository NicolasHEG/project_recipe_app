import { FlatList, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { Snackbar } from "react-native-paper";
import { app } from "../firebaseConfig";
import { useAuthentication } from "../contexts/AuthenticationContext";
import GroceryItem from "./GroceryItem";

const database = getDatabase(app);

export default function GroceryList() {
  const userId = useAuthentication().userId;

  const [groceryMap, setGroceryMap] = useState({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);
  const onDismissSnackBar = () => setSnackbarVisible(false);

  const getGroceries = () => {
    // Reference to the grocery list in Firebase
    const groceryListRef = ref(database, `users/${userId}/groceries`);

    // Listen for value changes
    onValue(groceryListRef, (snapshot) => {
      const data = snapshot.val() || {};
      // Map the data to include ids
      const groceryMap = Object.entries(data).map(([key, value]) => ({
        key: key,
        ...value,
      }));
      setGroceryMap(groceryMap);
      // Unsubscribe when the component unmounts to prevent memory leaks
      return () => unsubscribe();
    });
  };

  const handleDeleteGrocery = (key) => {
    // Reference to the grocery list in Firebase
    const groceryListRef = ref(database, `users/${userId}/groceries/${key}`);
    // Remove the grocery item
    set(groceryListRef, null);
    // Show the snackbar
    onToggleSnackBar();
  };

  useEffect(() => {
    getGroceries();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(groceryMap)}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <GroceryItem item={item} onDelete={handleDeleteGrocery} />
        )}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Dismiss",
          onPress: () => setSnackbarVisible(false),
        }}
        style={styles.snackbar}
        duration={1600}
      >
        Your grocery list has been updated !
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbar: {
    borderRadius: 50,
    padding: 7,
  },
});
