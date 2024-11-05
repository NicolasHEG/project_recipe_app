import { FlatList, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";
import { Button, Text } from "react-native-paper";

const database = getDatabase();

export default function GroceryList() {
  const userId = getAuth().currentUser.uid;

  const [groceryMap, setGroceryMap] = useState({});

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
      console.log("groceryMap", groceryMap);
      setGroceryMap(groceryMap);
    });
  };

  const handleDeleteGrocery = (key) => {
    console.log("key", key);
    // Reference to the grocery list in Firebase
    const groceryListRef = ref(database, `users/${userId}/groceries/${key}`);
    console.log("groceryListRef", groceryListRef);
    // Remove the grocery item
    set(groceryListRef, null);
  };

  useEffect(() => {
    getGroceries();
  }, []);

return (
    <View>
        <FlatList
            data={Object.values(groceryMap)}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.amount}</Text>
                    <Text>{item.key}</Text>
                    <Button onPress={() => handleDeleteGrocery(item.key)}>Delete</Button>
                </View>
            )}
        />
    </View>
);
}
