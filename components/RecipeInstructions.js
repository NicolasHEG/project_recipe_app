import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Title, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RecipeInstructions({ instructions }) {
  console.log("Received instructions: ", instructions);

  const cardWidth = 320;
  const cardHeight = 280;

  // Function to determine the icon based on keywords in the step text
  const getStepIcon = (stepText) => {
    const lowerCaseStep = stepText.toLowerCase();
    if (
      lowerCaseStep.includes("cut") ||
      lowerCaseStep.includes("dice") ||
      lowerCaseStep.includes("slice")
    ) {
      return "knife";
    } else if (
      lowerCaseStep.includes("boil") ||
      lowerCaseStep.includes("simmer")
    ) {
      return "pot-steam";
    } else if (
      lowerCaseStep.includes("mix") ||
      lowerCaseStep.includes("stir")
    ) {
      return "pot-mix";
    } else if (
      lowerCaseStep.includes("bake") ||
      lowerCaseStep.includes("oven")
    ) {
      return "stove";
    } else if (lowerCaseStep.includes("serve")) {
      return "silverware-fork-knife";
    } else {
      return "chef-hat";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={cardWidth + 32}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: 16,
          alignItems: "center",
        }}
      >
        {instructions.length > 0 &&
          instructions[0].steps.map((step) => (
            <Card
              key={step.number}
              style={[
                styles.cardContainer,
                { width: cardWidth, height: cardHeight },
              ]}
            >
              <Card.Content style={styles.cardContent}>
                {/* Display the dynamic icon */}
                <MaterialCommunityIcons
                  name={getStepIcon(step.step)}
                  size={40}
                  color="#4a0072"
                  style={styles.icon}
                />
                <Title style={styles.stepTitle}>Step {step.number}</Title>
                <Text style={styles.stepText}>{step.step}</Text>
              </Card.Content>
            </Card>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#4a0072",
    marginHorizontal: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  stepText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});
