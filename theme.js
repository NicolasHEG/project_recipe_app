import { DefaultTheme } from 'react-native-paper';

const christmasTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Christmas red
    primary: '#ff0000',
    // Christmas green
    accent: '#00ff00',
    // White background
    background: '#ffffff',
    // Light grey surface
    surface: '#f0f0f0', 
    text: '#000000',
    error: '#B00020',
    // Gold notification
    notification: '#ffcc00',
  },
  fonts: {
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '100',
    },
  },
  roundness: 8,
};

const commonTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // Blue primary color
      primary: '#1e88e5', 
      // Light blue accent color
      accent: '#42a5f5',
      // Light blue background
      background: '#e3f2fd',
      // White surface
      surface: '#ffffff',
      text: '#000000', 
      error: '#d32f2f',
      notification: '#1976d2',
    },
    fonts: {
      regular: {
        fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: '500',
      },
      light: {
        fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: '300',
      },
      thin: {
        fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: '100',
      },
    },
    roundness: 4, // Define the roundness of elements
  };

export default {christmasTheme, commonTheme};