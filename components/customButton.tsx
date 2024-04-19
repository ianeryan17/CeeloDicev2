import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ title, onPress, buttonStyle, textStyle, disabled }) => (
        <TouchableOpacity 
                onPress={onPress} 
                style={[buttonStyle, disabled ? styles.disabledButton : styles.enabledButton]} // Apply different styles based on the disabled state
                disabled={disabled}>
                <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
);

const styles = {
        enabledButton: {
                backgroundColor: 'brown', // Adjust color for enabled state
                borderColor: 'brown',
                borderWidth: 10,
        },
        disabledButton: {
                backgroundColor: 'brown', // Adjust color for disabled state
                opacity: 0.5,
        },
};

export default CustomButton;