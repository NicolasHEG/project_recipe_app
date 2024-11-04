import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Card, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipeInstructions({ instructions }) {
  console.log("Received instructions: ", instructions);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Instructions</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
        snapToAlignment="center"
        snapToInterval={310} // Adjust interval to match card width + margin
        decelerationRate="fast"
      >
        {instructions.length > 0 &&
          instructions[0].steps.map((step) => (
            <Card key={step.number} style={styles.cardContainer}>
              <Card.Content style={styles.cardContent}>
                <Title>Step {step.number}</Title>
                <Text>{step.step}</Text>
              </Card.Content>
            </Card>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    position: "absolute",
    backgroundColor: "red",
    opacity: 0.5,
    zIndex: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  cardContainer: {
    backgroundColor: "black",
    // Adjust width to fit the screen
    width: 300,
    // Adjust height to fit the screen
    height: 400,
    // Adjust margin for spacing between cards
    marginHorizontal: 5,
    // Adjust margin for spacing between cards
    marginVertical: 50,
  },
  cardContent: {
    backgroundColor: "white", // Set a solid background color
    color: "black",
  },
};
