import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const instructionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructions</Text>
      <Text style={styles.description}>
      Welcome to Ceelo Dice!\n The rules of the game are simple. The player stakes a bet. Once the bet is placed, the banker rolls their dice.\n The banker automatically wins if they roll three-of-a-kind, if they roll 4-5-6, or if they roll a pair and a 6. \n The banker automatically loses if they roll 1-2-3 or if they roll a pair and a 1. \n
      If the banker rolls a pair and a 2, 3, 4, or 5, this is called a 'pair and spare'. In this case, the spare value sets the point value and it becomes the player's turn to roll. \n If none of the above combinations are rolled, the banker rerolls the dice. \n The player then rolls their dice, with the same rules applying to the results of their rolls. \n
      If the player rolls a 'pair and spare', then the point values that each player rolled are compared, with the higher value taking the pot. \n If both values are the same, this is known as a push, and the player's stake is returned to them. \n If the player wins, they double their initial stake. If they lose, their stake goes to the bank.
        {/* Add your instructions here */}
      </Text>
      <Image source={require('./path/to/your/image.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default instructionsScreen;
