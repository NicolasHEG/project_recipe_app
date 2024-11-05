import React, { createContext, useContext } from "react";
import { getDatabase, ref, push, set, get } from "firebase/database";
import { app } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const GroceryContext = createContext();
const database = getDatabase();

export const GroceryProvider = ({ children }) => {
  const userId = getAuth().currentUser.uid;

  const handleAddToGroceryList = async (ingredients) => {
    // Loop through ingredients and add them to the grocery list
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];

      // Check if ingredient is already in the grocery list
      let isInList = await checkIngredientInGroceryList(ingredient);

      // If ingredient is not in the list then it is added
      if (!isInList) {
        push(ref(database, "users/" + userId + "/groceries/"), {
          id: ingredient.id,
          name: ingredient.nameClean,
          amount: ingredient.measures.metric.amount,
          unit: ingredient.measures.metric.unitLong,
        });
      } else {
        // Retrieve groceries node
        const groceriesReference = ref(
          database,
          "users/" + userId + "/groceries"
        );

        // Retrieve groceries list from database
        // Chooses get() instead of onValue() to avoid multiple calls to the database
        // and there is no need to keep the UI up to date with the DB in this case
        get(groceriesReference)
          .then((snapshot) => {
            const data = snapshot.val();
            const groceriesList = Object.values(data);
            const ingredientInList = groceriesList.find(
              (item) => item.id === ingredient.id
            );
            const updatedAmount =
              ingredientInList.amount + ingredient.measures.metric.amount;

            const groceryKey = Object.keys(data).find(
              (key) => data[key].id === ingredient.id
            );
            set(ref(database, "users/" + userId + `/groceries/${groceryKey}`), {
              ...ingredientInList,
              amount: updatedAmount,
            });
          })
          .catch((error) => {
            console.error("Error updating ingredient in grocery list:", error);
          });
      }
    }
  };

  const checkIngredientInGroceryList = (ingredient) => {
    // Use of promise to handle async operation. Without, the function would return before the async operation is completed
    // leading to an undefined value instead of the expected boolean
    return new Promise((resolve, reject) => {
      const groceriesReference = ref(
        database,
        "users/" + userId + "/groceries"
      );

      // Use get() instead of onValue() because only need to retrieve the data once
      get(groceriesReference)
        .then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            const groceriesList = Object.values(data);
            const ingredientInList = groceriesList.find(
              (item) => item.id === ingredient.id
            );

            // COnvert ingredient to boolean to return true or false depending if ingredient has been found
            resolve(!!ingredientInList);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          console.error("Error checking ingredient in grocery list:", error);
          reject(error);
        });
    });
  };
  

  return (
    <GroceryContext.Provider
      value={{ handleAddToGroceryList, checkIngredientInGroceryList }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (!context) {
    throw new Error("useGrocery must be used within a GroceryProvider");
  }
  return context;
};
