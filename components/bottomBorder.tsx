import React from 'react';
import { View, StyleSheet, Dimensions, TextInput } from 'react-native';
import CustomButton from './customButton';

const BottomBorder = ({ stake, updateStake, lockInBet, isEditable, waitAndRoll, isRollButtonDisabled, isLockInButtonDisabled }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftHalf}>
          <StakeBox
            amount={stake.toString()}
            handleAmountChange={updateStake}
            handlePress={lockInBet}
            isLockInButtonDisabled={isLockInButtonDisabled}
            isEditable={!isEditable} // Set the editability based on the isLockInButtonDisabled prop
          />
        </View>
        <View style={styles.rightHalf}>
          <RollButton
            waitAndRoll={waitAndRoll}
            isRollButtonDisabled={isRollButtonDisabled}
          />
        </View>
      </View>
    </View>
  );
};

const StakeBox = ({ amount, handleAmountChange, isEditable, handlePress, isLockInButtonDisabled }) => {
  return (
    <View style={styles.rectangle}>
      {/* <View style={isEditable ? styles.inputWrapper : [styles.inputWrapper, styles.nonEditableText]}> */}
        <TextInput
          style={[styles.input, !isEditable ? null : styles.nonEditableText]} // Apply nonEditableText style when not editable
          placeholder=""
          value={amount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
          editable={!isEditable} // Set the editability based on the isLockInButtonDisabled prop
        />
      {/* </View> */}
      <CustomButton
        title="Lock In"
        onPress={handlePress}
        buttonStyle={[styles.bottomButton2, styles.leftHalf]}
        textStyle={styles.bottomButtonText}
        disabled={isLockInButtonDisabled}
      />
    </View>
  );
};

const RollButton = ({ waitAndRoll, isRollButtonDisabled }) => {
  return (
    <CustomButton
      title="Push to Roll"
      onPress={waitAndRoll}
      disabled={isRollButtonDisabled}
      buttonStyle={[styles.bottomButton, styles.rightHalf]}
      textStyle={styles.bottomButtonText}
    />
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    // backgroundColor: 'tan', // Background color
    // borderWidth: 10, // Border width
    borderColor: 'brown', // Border colo
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    borderBottomWidth: 0, // Remove bottom border
  },
  content: {
    flexDirection: 'row', // Arrange children horizontally
    width: '100%', // Take up the entire width
  },
  leftHalf: {
    // flex: 1, // Take up half of the width
    marginLeft: 10
  },
  rightHalf: {
    // flex: 1, // Take up half of the width
    marginLeft: 20, // Add spacing between StakeBox and RollButton
  },
  rectangle: {
    flexDirection: 'row', // Arrange children horizontally
    height: 130, // Adjust height as needed
    alignItems: 'center',
    paddingHorizontal: 20, // Add horizontal padding
  },
  input: {
    borderWidth: 5,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    height: 80,
    width: 130,
    fontSize: 50,
    fontFamily: 'aanothertag',
    textAlign: 'right', // Additional alignment to ensure right alignment
  },
  nonEditableText: {
    opacity: 0.1, // Set the opacity for non-editable text
  },
  bottomButton: {
    marginTop: 25,
    marginBottom: 25,
    // marginRight: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 80,
  },
  bottomButton2: {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 0,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 80,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'hesorder',
  },
});

export { BottomBorder, StakeBox, RollButton };
