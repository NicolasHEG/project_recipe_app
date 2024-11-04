import { FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { app } from "../firebaseConfig";

const database = getDatabase(app);

export default function GroceryList() {
    const userId = getAuth().currentUser.uid;

    const [groceryList, setGroceryList] = useState([]);

    const getGroceryList = async () => {
        const groceryListRef = ref(database, "users/" + userId + '/groceries');
        onValue(groceryListRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const groceryList = Object.values(data);
                setGroceryList(groceryList);
            }else{
                setGroceryList([]);
            }
        });
    }

    return(
        <ScrollView>
            <FlatList>
                {groceryList.map((groceryItem, index) => (
                    <Text key={index}>{groceryItem}</Text>
                ))}
            </FlatList>
        </ScrollView>
    );
}