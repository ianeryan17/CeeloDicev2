import React from 'react';
import { Text, Image, Pressable, View } from 'react-native';

export default function chipButton( {onPress, source, text, isDisabled } ){
        return (
                <Pressable
                        onPress={onPress} //supply onPress function
                        disabled={isDisabled} //supply isDisabled bool
                        style={( { pressed }) => [
                          pressed ? styles.pressed : styles.notPressed,
                          isDisabled && styles.disabled, // Apply disabled styles if the button is disabled
                          ]}>
                          <View style={styles.container}>
                                <Image style={styles.image} source={source} />
                                <Text style={styles.text}>{text}</Text>
                          </View>
                </Pressable>
        );
}

const styles = {
        container: {
                alignItems: 'center',
        },
        pressed: {
                opacity: 0.25
        },
        notPressed: {
                opacity: 1      
        },
        text: {
                position: 'absolute',
                top: '74%', // Adjust as needed
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
                zIndex: 1, // Ensure text is above the image
        },
        disabled: {
                opacity: 0.5, // Example: Change the background color to gray
        },
        image: {
                height: 80,
                width: 80,
                marginTop: 130,
                marginHorizontal: 5,
        },
}

