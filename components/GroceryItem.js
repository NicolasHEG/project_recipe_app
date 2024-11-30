import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function GroceryItem({ item, onDelete }) {
  return (
    <View style={styles.itemContainer}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>
              {item.amount} {item.unit}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={() => onDelete(item.key)}
              style={styles.checkButton}
              icon="check"
              labelStyle={styles.checkButtonLabel}
            >
              Check
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  card: {
    marginVertical: 5,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  amountContainer: {
    flex: 1,
    paddingRight: 10,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  nameContainer: {
    flex: 2,
    paddingHorizontal: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  checkButton: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#00796B",
    borderWidth: 0,
  },
  checkButtonLabel: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});