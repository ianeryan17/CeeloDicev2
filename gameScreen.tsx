import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground } from 'react-native';
// import ChipButton from './components/chipButton'
import Dice from './components/dice';
import GameButtons from './components/gameButtons';
import RollButton from './components/rollButton';
import { BottomBorder, StakeBox } from './components/bottomBorder';
// import PopInTextBox from './PopInTextBox'; // Adjust the path as necessary

import face1 from './assets/1_dot.png';
import face2 from './assets/2_dots.png';
import face3 from './assets/3_dots.png';
import face4 from './assets/4_dots.png';
import face5 from './assets/5_dots.png';
import face6 from './assets/6_dots.png';

const App = () => {
  const [money, setMoney] = useState(500); // State variable to hold the value of money
  const [stake, setStake] = useState(0); // State variable to hold the value of money
  // const [isChipsDisabled, setIsChipsDisabled] = useState(false);
  const [isResetButtonDisabled, setIsResetButtonDisabled] = useState(true);
  const [isLockInButtonDisabled, setIsLockInButtonDisabled] = useState(true);
  const [isRollButtonDisabled, setIsRollButtonDisabled] = useState(true);
  const [playerSetValue, setPlayerSetValue] = useState(0);
  const [bankerSetValue, setBankerSetValue] = useState(0);
  const [diceFaces, setDiceFaces] = useState([face1, face1, face1]);
  const diceNumbers = [1, 2, 3, 4, 5, 6];
  const [message, setMessage] = useState('');
  

  /* BUTTON FUNCTIONS */  
  const updateMoney = (newMoney) => {
    if ((money + newMoney) === 0){
      console.log("Player has run out of money. Time to go home and explain to the wife where your kid's college savings went.\n");
      showMessage("Player has run out of money. Time to go home and explain to the wife where your kid's college savings went.", 2000);
      return;
    }
    console.log("updateMoney from: " + money + ", adding " + newMoney + ", result: " + (money + newMoney));
    setMoney(money + newMoney); // Update the state variable with the new amount
  };
  const updateStake = (newStake) => {
    if (newStake > 0) {
      setIsLockInButtonDisabled(false);
      setIsResetButtonDisabled(false);
      console.log("Stake placed, lockIn button unlocked");
    }
    if ((newStake) > money){
      console.log("Can't bet more than your bank account allows buddy");
      return;
    }
    console.log("updateStake from: " + stake + ", adding " + newStake + ", result: " + (stake + newStake));
    setStake(newStake); // Update the state variable with the new amount
  };
  const resetStake = () => {
    console.log("resetStake from: " + stake + ", to " + 0);
    setStake(0);
    setIsLockInButtonDisabled(true);
    setIsResetButtonDisabled(true);
  };
  const lockInBet = () => {
    console.log("lock in bet pressed");
    // setIsChipsDisabled(true);
    setIsResetButtonDisabled(true);
    setIsLockInButtonDisabled(true);
    showMessage("The bet is placed, the banker now rolls to start the game.", 1000);
    setTimeout(rollAnimation, 1500, false);
  };

  /* MESSAGE FUNCTIONS */
  const showMessage = (text, duration) => {
    console.log("showing message: ", text);
    setMessage(text);

    setTimeout(() => {
      setMessage('');
    }, duration);
  };

  /* ROLLING FUNCTIONS */
  const updateDiceFaces = (die1, die2, die3) => {
    console.log("updating die faces to: ", die1, " ", die2, " ", die3,);
    setDiceFaces(prevDiceFaces => [getFaceImage(die1), getFaceImage(die2), getFaceImage(die3)]);
  };

  // Helper function to get the appropriate dice face image based on the random number
  const getFaceImage = (number) => {
    switch (number) {
      case 1:
        return face1;
      case 2:
        return face2;
      case 3:
        return face3;
      case 4:
        return face4;
      case 5:
        return face5;
      case 6:
        return face6;
      default:
        return face1;
    }
  };

  const generateFaces = () => {
    let die1 = getRandomNumber();
    let die2 = getRandomNumber();
    let die3 = getRandomNumber();
    updateDiceFaces(die1, die2, die3);
  }

  const rollAnimation = (isUserTurn) => {
    console.log("rollAnimation called");
    let intervalID = setInterval(generateFaces, 100);
    setTimeout(clearInterval, 2000, intervalID);
    setTimeout(roll, 1000, isUserTurn);
  }

  /*
                                DICE ROLL GENERATION
                                                                             */
  const roll = (isUserTurn) => {
    console.log("rolling now");
    let die1 = getRandomNumber();
    let die2 = getRandomNumber();
    let die3 = getRandomNumber();
    setIsRollButtonDisabled(true); // Disable the roll button during the rolling process
    setTimeout(updateDiceFaces, 1000, die1, die2, die3);

    if (isUserTurn === true) {
      diceNumbers[0] = die1;
      diceNumbers[1] = die2;
      diceNumbers[2] = die3;
    } else {
      diceNumbers[3] = die1;
      diceNumbers[4] = die2;
      diceNumbers[5] = die3;
    }
    
    combinationCheck(isUserTurn);
  };

  const waitAndRoll = () => {
    showMessage("ROLLING", 1000);
    setTimeout(rollAnimation, 0, true);
  }

  const getRandomNumber = () => {
    const randomDecimal = Math.random();
    const randomNumber = 1 + Math.floor(randomDecimal * (6));
  
    return randomNumber;
}

/*
                                DICE RESULT CHECKERS
                                                                             */
const combinationCheck = (diceIndex) => {
  if (diceIndex === true) {
    combinationHelper(diceNumbers[0], diceNumbers[1], diceNumbers[2]);
  } else {
    bankerHelper(diceNumbers[3], diceNumbers[4], diceNumbers[5]);
  }
}

const combinationHelper = (die1, die2, die3) => {
  if (
      (die1 === 4 && die2 === 5 && die3 === 6) ||
      (die1 === 4 && die2 === 6 && die3 === 5) ||
      (die1 === 5 && die2 === 4 && die3 === 6) ||
      (die1 === 5 && die2 === 6 && die3 === 4) ||
      (die1 === 6 && die2 === 5 && die3 === 4) ||
      (die1 === 6 && die2 === 4 && die3 === 5)
  ) { //auto win case
    setTimeout(playerAutoWin, 2000);
  } else if (die1 === die2 && die2 === die3 && die1 === die3) { //triple case
    setTimeout(playerAutoWin, 2000);
  } else if (die1 === die2 && die1 !== die3) { //die3 set point case
    setTimeout(playerSet, 2000, die3);
  } else if (die1 === die3 && die1 !== die2) { //die2 set point case
    setTimeout(playerSet, 2000, die2);
  } else if (die2 === die3 && die1 !== die2) { //die1 set point case
    setTimeout(playerSet, 2000, die1);
  } else if (
      (die1 === 1 && die2 === 2 && die3 === 3) ||
      (die1 === 1 && die2 === 3 && die3 === 2) ||
      (die1 === 2 && die2 === 1 && die3 === 3) ||
      (die1 === 2 && die2 === 3 && die3 === 1) ||
      (die1 === 3 && die2 === 2 && die3 === 1) ||
      (die1 === 3 && die2 === 1 && die3 === 2)
  ) { //auto lose case
    setTimeout(playerAutoLoss, 2000);
  } else { //reroll case, no recognized combination found
    setTimeout(playerReroll, 2000);
  }
}

const bankerHelper = (die1, die2, die3) => {
  if (
    (die1 === 4 && die2 === 5 && die3 === 6) ||
    (die1 === 4 && die2 === 6 && die3 === 5) ||
    (die1 === 5 && die2 === 4 && die3 === 6) ||
    (die1 === 5 && die2 === 6 && die3 === 4) ||
    (die1 === 6 && die2 === 5 && die3 === 4) ||
    (die1 === 6 && die2 === 4 && die3 === 5)
  ) { // auto win case 
    console.log("auto win case"); 
    setTimeout(bankerAutoWin, 2000);
  } else if (die1 === die2 && die2 === die3 && die1 === die3) { // triple case
    console.log("triple case");
    setTimeout(bankerAutoWin, 2000);
  } else if (die1 === die2 && die1 !== die3) { // die3 set point case
    console.log("die3 set point case");
    setTimeout(bankerSet, 2000, die3);
  } else if (die1 === die3 && die1 !== die2) { // die2 set point case
    console.log("die2 set point case");
    setTimeout(bankerSet, 2000, die2);
  } else if (die2 === die3 && die1 !== die2) { // die1 set point case
    console.log("die1 set point case");
    setTimeout(bankerSet, 2000, die1);
  } else if (
      (die1 === 1 && die2 === 2 && die3 === 3) ||
      (die1 === 1 && die2 === 3 && die3 === 2) ||
      (die1 === 2 && die2 === 1 && die3 === 3) ||
      (die1 === 2 && die2 === 3 && die3 === 1) ||
      (die1 === 3 && die2 === 2 && die3 === 1) ||
      (die1 === 3 && die2 === 1 && die3 === 2)
  ) { // auto lose case
    console.log("auto lose case");
    setTimeout(bankerAutoLoss, 2000);
  } else { // reroll case, no recognized combination found
    console.log("reroll case");
    setTimeout(bankerReroll, 2000);
  }
}

/*
                              RESULT STATES
                                                                           */
const playerAutoWin = () => {
  console.log("Player auto-won!\n");
  showMessage("Player auto-won!", 2000);
  setTimeout(playerWin, 2000);
}
    
const playerAutoLoss = () => {
  console.log("Player auto-lost!\n");
  showMessage("Player auto-lost!", 2000);
  playerLose();
}
    
const playerReroll = () => {
  console.log("Player reroll!");
  showMessage("Player reroll!", 2000);
  setIsRollButtonDisabled(false);
}
    
const playerSet = (setValue) => {
  console.log("player set value is: " + setValue + "\n");
  if (setValue === 6) {
    playerAutoWin();
  } else if (setValue === 1) {
    playerAutoLoss();
  } else {
    setPlayerSetValue(setValue);
    setTimeout(determineWinner, 1000);
  }
}

const bankerAutoWin = () => {
  console.log("Banker auto-won!\n");
  showMessage("Banker auto-won!", 2000);
  playerLose();
}
    
const bankerAutoLoss = () => {
  console.log("Banker auto-lost!\n");
  showMessage("Banker auto-lost!", 2000);
  playerWin();
}
    
const bankerReroll = () => {
  console.log("Banker reroll!\n");
  showMessage("Banker reroll!", 2000);
  setTimeout(rollAnimation, 1500, false);
}
    
const bankerSet = (setValue) => {
  showMessage("Banker set value is: " + setValue, 2000);
  if (setValue === 6) {
    setTimeout(playerAutoLoss, 1000);
  } else if (setValue === 1) {
    // setTimeout(showMessage, 2000, "banker set value is: " + setValue, 2000);
    setTimeout(playerAutoWin, 2000);
  } else {
    // setTimeout(showMessage, 1500, "The player must roll a higher set, or auto win.", 2000);
    setBankerSetValue(setValue);
    setIsRollButtonDisabled(false);
    setTimeout(showMessage, 1500, "Your turn to roll!", 1000);
  }
}

const determineWinner = () => {
    console.log("Determining winner, player set: ", playerSetValue, " banker set: ", bankerSetValue);
  if (playerSetValue > bankerSetValue) { //player has higher set value
    showMessage("Player has higher set value.", 2000);
    setTimeout(showMessage, 1500, "Player wins!", 2000);
    playerWin();
  } else if (playerSetValue < bankerSetValue) { //banker has higher set value
    setTimeout(showMessage, 2000, "Banker has higher set value.", 1500);
    setTimeout(showMessage, 2000, "Player loses!", 2000);
    playerLose();
  } else { //tie case
    showMessage("Player and Banker have equal set value.", 2000);
    setTimeout(showMessage, 2000, "It's a push!", 2000);
    setTimeout(showMessage, 2000, "Player recieves initial stake.", 2000);
    resetStake();
    console.log("Bank Amount: " + money);
    updateMoney(0);
    setIsRollButtonDisabled(true);
    setIsLockInButtonDisabled(true);
    // setIsChipsDisabled(false);
    setIsResetButtonDisabled(false);
  }
}

/*
                            FINAL RESULT FOR PLAYER
                                                                             */
const playerWin = () => {
  const oldMoney = money;
  updateMoney(stake);
  resetStake();
  // setIsChipsDisabled(false);
  setIsResetButtonDisabled(true);
  setIsLockInButtonDisabled(true);
  setIsRollButtonDisabled(true);
}

const playerLose = () => {
  const oldMoney = money;
  updateMoney(-1 * stake);
  resetStake();
  // setIsChipsDisabled(false);
  setIsResetButtonDisabled(true);
  setIsLockInButtonDisabled(true);
  setIsRollButtonDisabled(true);
}

  return ( //Image background may need to replace styles.container line
    <ImageBackground source={require('./assets/concrete.png')} style={styles.container}>

      {/* Text inputs in the top left and right corners */}
      <View style={styles.textInputContainerLeft}>
        <TextInput
          style={styles.textInput}
          placeholder="Money: 500"
          placeholderTextColor="black"
          value={`Money: ${money}`} // Display the money value with the label
          editable={false} // Make the TextInput non-editable
        />
      </View>
      <View style={styles.textInputContainerRight}>
        <TextInput
          style={styles.textInput}
          placeholder="Stake: 0"
          placeholderTextColor="black"
          value={`Stake: ${stake}`} // Display the money value with the label
          editable={false} // Make the TextInput non-editable
        />
      </View>

      {/* Messages */}
      <Text 
        style={styles.message}>
        {message}
      </Text>

      {/* Dice */}
      <Dice 
        diceFaces={diceFaces} 
      />

      {/* Chip Buttons*/}
      {/* <View style={styles.horizontalButtons}> */}
        {/* <ChipButton //change onPress to add $5 to stake using code that is already written (maybe incorporate the already written js script?)
          onPress={() => updateStake(5)}
          isDisabled={isChipsDisabled}
          source={require("./assets/pokerchip1.png")}
          text="$5"
        />
        <ChipButton //change onPress to add $10 to stake using code that is already written (maybe incorporate the already written js script?
          onPress={() => updateStake(10)}
          isDisabled={isChipsDisabled}
          source={require("./assets/pokerchip2.png")} 
          text="$10"
        />
        <ChipButton //change onPress to add $25 to stake using code that is already written (maybe incorporate the already written js script?
          onPress={() => updateStake(25)}
          isDisabled={isChipsDisabled}
          source={require("./assets/pokerchip3.png")} 
          text="$25"
        />
        <ChipButton //change onPress to add $50 to stake using code that is already written (maybe incorporate the already written js script?
          onPress={() => updateStake(50)}
          isDisabled={isChipsDisabled}
          source={require("./assets/pokerchip4.png")} 
          text="$50"
        /> */}
      {/* </View> */}

      {/* Bottom Border */}
      <View style={{ flex: 1 }}>
      <BottomBorder>
        <StakeBox
          amount={stake.toString()}
          handleAmountChange={(newStake) => setStake(newStake)}
          handlePress={lockInBet}
        />
      </BottomBorder>
    </View>

      {/* Buttons */}
      {/* <GameButtons
        lockInBet={lockInBet}
        resetStake={resetStake}
        isLockInButtonDisabled={isLockInButtonDisabled}
        isResetButtonDisabled={isResetButtonDisabled}
      />

      <RollButton 
        waitAndRoll={waitAndRoll} 
        isRollButtonDisabled={isRollButtonDisabled} 
      /> */}
    </ImageBackground>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainerLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20, // Optional: Add border radius for rounded corners
    paddingHorizontal: 0, // Optional: Add padding for better appearance
    overflow: 'hidden', // Ensure that the circular container clips any overflowing content
  },
  textInputContainerRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20, // Optional: Add border radius for rounded corners
    paddingHorizontal: 0, // Optional: Add padding for better appearance
    overflow: 'hidden', // Ensure that the circular container clips any overflowing content
  },
  textInput: {
    position: 'relative',
    borderWidth: 1,
    borderColor: 'black',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 40, // Decreased font size to fit more buttons horizontally
    padding: 10,
    borderRadius: 20, // Optional: Add border radius for rounded corners
    width: 250,
    height: 100,
  },
  horizontalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -100,
  },
  
  message: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
    marginTop: 100, // Adjust as needed
    textAlign: 'center', // Center the text
    zIndex: 2, // Ensure text is above the image
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  
});

export default App;
