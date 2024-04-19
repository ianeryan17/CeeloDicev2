import React from 'react';
import { View } from 'react-native';
import CustomButton from './customButton';

const GameButtons = ({ lockInBet, resetStake, isLockInButtonDisabled, isResetButtonDisabled }) => {
  return (
    <View style={styles.buttonContainer}>
      <CustomButton 
        title="Lock In"
        onPress={lockInBet}
        buttonStyle={styles.gameButton}
        textStyle={styles.buttonText}
        disabled={isLockInButtonDisabled} />
      <CustomButton 
        title="Reset"
        onPress={() => resetStake()}
        buttonStyle={styles.gameButton}
        textStyle={styles.buttonText}
        disabled={isResetButtonDisabled} />
    </View>
  );
};

const styles = {
        buttonContainer: {
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '70%',
        },
        gameButton: {
                backgroundColor: 'black',
                padding: 10,
                borderRadius: 10,
        },
        buttonText: {
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
        },
};


export default GameButtons;