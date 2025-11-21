import React from 'react';
import { Platform, Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// 3. React Native: Use platform-specific components
// 11. Accessibility: Ensure components are accessible
export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', disabled = false }) => {
  const color = variant === 'primary' ? 'blue' : 'gray';

  // Use TouchableOpacity for native feeling and easy styling for both platforms
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.touchableBase, { backgroundColor: color, opacity: disabled ? 0.5 : 1 }]}
      accessibilityRole="button" 
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
    >
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableBase: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 150,
    alignItems: 'center',
    // 10. Architecture: Theming/Typography logic would be applied here
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});