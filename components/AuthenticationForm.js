import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

// Component for rendering an authentication form with email and password inputs
export default function AuthenticationForm({
  email,
  setEmail,
  password,
  setPassword,
}) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <View>
      <TextInput
        label="Email"
        placeholder="example@email.com"
        mode="outlined"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email-outline" />}
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        // Updates password state in the parent component
        onChangeText={(text) => setPassword(text)}
        // Toggles between masked and unmasked password
        secureTextEntry={!isPasswordShown}
        style={styles.input}
        left={<TextInput.Icon icon="lock-outline" />}
        right={
          <TextInput.Icon
            icon={isPasswordShown ? "eye" : "eye-outline"}
            onPress={() => setIsPasswordShown(!isPasswordShown)}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
});
