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
    margin: 5,
  },
  card: {
    margin: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountContainer: {
    flex: 1,
  },
  amountText: {
    flexWrap: "wrap",
  },
  nameContainer: {
    flex: 1,
  },
  nameText: {},
  buttonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  checkButton: {
    borderRadius: 5,
  },
  checkButtonLabel: {
    color: "white",
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "black",
    marginHorizontal: 10,
  },
});
