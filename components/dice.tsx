import React from 'react';
import { View, Image } from 'react-native';

const Dice = ({ diceFaces }) => {
  return (
    <View style={styles.horizontalDice}>
      {diceFaces.map((face, index) => (
        <Image key={index} source={face} style={styles.image} />
      ))}
    </View>
  );
};

const styles = {
        horizontalDice: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 0,
        },
        image: {
          height: 160,
          width: 160,
          marginBottom: -40,
          marginHorizontal: 5,
        },
};

export default Dice;