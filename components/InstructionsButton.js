import React from "react";
import { Button } from "react-native-paper";

export default function InstructionsButton({
  showInstructions,
  handleShowInstructions,
}) {
  return (
    <Button
      icon="chef-hat"
      mode={showInstructions ? "contained" : "outlined"}
      onPress={handleShowInstructions}
      style={{ margin: 10 }}
    >
      {showInstructions ? "Stop cooking" : "Start cooking"}
    </Button>
  );
}
