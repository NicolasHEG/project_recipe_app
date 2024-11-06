import { FlatList, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Button, Card, Snackbar, Text } from "react-native-paper";
import { app } from "../firebaseConfig";

const database = getDatabase(app);

export default function GroceryList() {
  const userId = getAuth().currentUser.uid;

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
      console.log("groceryMap", groceryMap);
      setGroceryMap(groceryMap);
      return () => unsubscribe();
    });
  };

  const handleDeleteGrocery = (key) => {
    console.log("key", key);
    // Reference to the grocery list in Firebase
    const groceryListRef = ref(database, `users/${userId}/groceries/${key}`);
    console.log("groceryListRef", groceryListRef);
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
          <View style={{ margin: 5 }}>
            <Card style={{ margin: 5 }}>
              <Card.Content style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ flexWrap: 'wrap' }}>
                  {item.amount} {item.unit}
                  </Text>
                </View>
                {/*Vertical divider*/}
                <View style={{ width: 1, height: '100%', backgroundColor: 'black', marginHorizontal: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text>{item.name}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Button
                    mode="outlined"
                    onPress={() => handleDeleteGrocery(item.key)}
                    style={styles.checkButton}
                    icon="check"
                    labelStyle={{ color: 'white' }}
                  />
                </View>
              </Card.Content>
            </Card>
          </View>
        )}
      />
      
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Close",
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
        style={styles.snackbar}
        duration={1600}
        rippleColor={"red"}
      >
        Your grocery list has been updated
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
    backgroundColor: "#449e48",
    color: "#bdaa70",
  },
  checkButton: {
    borderRadius: 5,
    backgroundColor: "green",
  },
});