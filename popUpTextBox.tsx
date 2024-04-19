import React from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const PopupMessage = ({ message }) => {
  return (
    <Animatable.View
      animation="fadeIn"
      duration={1000}
      style={styles.messageContainer}
    >
      <Text style={styles.messageText}>{message}</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  messageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default PopupMessage;
