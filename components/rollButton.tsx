import React from 'react';
import CustomButton from './customButton';

const RollButton = ({ waitAndRoll, isRollButtonDisabled }) => {
  return (
    <CustomButton
      title="Push to Roll"
      onPress={waitAndRoll}
      disabled={isRollButtonDisabled}
      buttonStyle={styles.bottomButton}
      textStyle={styles.bottomButtonText}
    />
  );
};

const styles = {
        bottomButton: {
                backgroundColor: 'black',
                padding: 15,
                borderRadius: 10,
                marginTop: 50, // Adjust margin as needed
        },
        bottomButtonText: {
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
        },
};

export default RollButton;
