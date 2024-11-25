import { DefaultTheme } from "react-native-paper";

const christmasTheme = {

  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#BD3634", // Vibrant red
    secondary: "#034F1B", // Rich green
    accent: "#CEAC5C", // Festive gold
    background: "#E6DCB1", // Light cream
    surface: "#E6DCB1", // Matching the background
    text: "#034F1B", // Green for text
    error: "#7E121D", // Deep red for errors
    onPrimary: "#FFFFFF", // White text on primary color
    onSecondary: "#FFFFFF", // White text on secondary color
    onBackground: "#034F1B", // Green text on background
    onSurface: "#034F1B", // Green text on surface
    onError: "#FFFFFF", // White text on error
  },
  roundness: 8, // Slightly rounded corners for a softer, festive feel
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "normal",
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "500",
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "300",
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "100",
    },
  },
};


const commonTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Blue primary color
    primary: "#1e88e5",
    // Light blue accent color
    accent: "#42a5f5",
    // Light blue background
    background: "#e3f2fd",
    // White surface
    surface: "#ffffff",
    text: "#000000",
    error: "#d32f2f",
    notification: "#1976d2",
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "normal",
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "500",
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "300",
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "100",
    },
  },
  roundness: 4, // Define the roundness of elements
};

export { christmasTheme, commonTheme };
