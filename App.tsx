import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Animated } from 'react-native';
import Sound from 'react-native-sound';
import Dice from './components/dice';
import { BottomBorder } from './components/bottomBorder';

import face1 from './assets/1_dot.png';
import face2 from './assets/2_dots.png';
import face3 from './assets/3_dots.png';
import face4 from './assets/4_dots.png';
import face5 from './assets/5_dots.png';
import face6 from './assets/6_dots.png';

const App = () => {
  const [money, setMoney] = useState(500); // State variable to hold the value of money
  const [stake, setStake] = useState(""); // State variable to hold the value of money
  const [isLockInButtonDisabled, setIsLockInButtonDisabled] = useState(true);
  const [isRollButtonDisabled, setIsRollButtonDisabled] = useState(true);
  const [playerSetValue, setPlayerSetValue] = useState(1);
  const [bankerSetValue, setBankerSetValue] = useState(1);
  const [diceFaces, setDiceFaces] = useState([face1, face1, face1]);
  const diceNumbers = [1, 2, 3, 4, 5, 6];
  const [message, setMessage] = useState('');
  const [isEditable, setIsEditable] = useState(true);
  const [color, setColor] = useState('black'); // Initialize color state with 'black'
  const [animation, setAnimation] = useState(new Animated.Value(0));


/* SOUND IMPORTS */
  var cashSound = new Sound('coin_sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the cash sound', error);
      return;
    }
  });
  cashSound.setVolume(1);

  var diceSound = new Sound('dice_roll.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the dice sound', error);
      return;
    }
  });  
  diceSound.setVolume(1);

  var buttonSound = new Sound('bloop1.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the button sound', error);
      return;
    }
  });
  buttonSound.setVolume(1);

  var failSound = new Sound('fail_sound2.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the fail sound', error);
      return;
    }
  });
  failSound.setVolume(1);

  

  /* BUTTON FUNCTIONS */  
  const updateMoney = (newMoney) => {
    console.log("stake: ", stake);
    const newMoneyNumeric = parseInt(newMoney); // Convert string to numeric value
    if ((money + newMoneyNumeric) === 0){
      showMessageWithAnimation("Player has run out of money.");
      setTimeout(showMessageWithAnimation, 2000, "Time to go home and explain to the wife where your kid's college savings went.");
    }
    console.log("updateMoney from: " + money + ", adding " + newMoneyNumeric + ", result: " + (Number(money) + Number(newMoney)));
    setMoney(money + newMoneyNumeric); // Update the state variable with the new amount
    setTimeout(() => {
      setTextColor('black');
    }, 750);
  };

  const updateStake = (newStake) => {
    console.log("newStake: ", newStake);
      if (isNaN(newStake)){
        console.log("Gotta bet numbers.");
        return;
      }
      if ((newStake) > money){
        console.log("Can't bet more than your bank account allows buddy");
        return;
      }
      if ((newStake.length) > 5){
        console.log("number is too long");
        return;
      }
      if ((newStake) < 1){
        console.log("lock in disabled as stake = 0");
        setIsLockInButtonDisabled(true);
        setStake(newStake); // Update the state variable with the new amount
        return;
      }
      setStake(newStake); // Update the state variable with the new amount
      setIsLockInButtonDisabled(false);
  };

  const resetStake = () => {
    console.log("resetStake from: " + stake + ", to " + 0);
    setStake("");
    setIsLockInButtonDisabled(true);
  };

  const lockInBet = () => {
    buttonSound.play((success) => {
      if (!success) {
        console.log('failed to play the sound');
      }
    });
    setIsLockInButtonDisabled(true);
    setIsEditable(false);
    setTimeout(rollAnimation, 500, false);
  };

  /* MESSAGE FUNCTIONS */
  // Function to show message with animation
  const showMessageWithAnimation = (text) => {
    setMessage(text);

    // Fade in and scale up animation
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Hide message after 2 seconds
    setTimeout(() => {
      hideMessage();
    }, 2000);
  };

  // Function to hide message
  const hideMessage = () => {
    // Fade out and scale down animation
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMessage('');
    });
  };

  const setTextColor = (newColor) => {
    console.log("setting new color to be ", newColor);
    setColor(newColor);
  };

  /* ROLLING FUNCTIONS */
  const updateDiceFaces = (die1, die2, die3) => {
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
  };

  const rollAnimation = (isUserTurn) => {
    diceSound.play((success) => {
      if (!success) {
        console.log('failed to play the sound');
      }
    });
    let intervalID = setInterval(generateFaces, 100);
    setTimeout(clearInterval, 1500, intervalID);
    setTimeout(roll, 500, isUserTurn);
    setIsRollButtonDisabled(true); // Disable the roll button during the rolling process
  };

  /*
                                DICE ROLL GENERATION
                                                                             */
  const roll = (isUserTurn) => {
    let die1 = getRandomNumber();
    let die2 = getRandomNumber();
    let die3 = getRandomNumber();
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
    
    console.log("final combination: ", die1, " ", die2, " ", die3);

    combinationCheck(isUserTurn);
  };

  const rollClick = () => {
    console.log("played sound");
    buttonSound.play((success) => {
      if (!success) {
        console.log('failed to play the sound');
      } else {
        console.log("PLAYED THE SOUND");
      }
    });
    setTimeout(rollAnimation, 0, true);
  };

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
};

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
    console.log("die3 set case, die3 = ", die3);
    setTimeout(playerSet, 2000, die3);
  } else if (die1 === die3 && die1 !== die2) { //die2 set point case
    console.log("die2 set case, die2 = ", die2);
    setTimeout(playerSet, 2000, die2);
  } else if (die2 === die3 && die1 !== die2) { //die1 set point case
    console.log("die1 set case, die3 = ", die1);
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
};

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
    setTimeout(bankerAutoLoss, 1500);
  } else { // reroll case, no recognized combination found
    console.log("reroll case");
    setTimeout(bankerReroll, 1500);
  }
};

/*
                              RESULT STATES
                                                                           */
const playerAutoWin = () => {
  showMessageWithAnimation("Player auto-won!");
  playerWin();
};
    
const playerAutoLoss = () => {
  showMessageWithAnimation("Player auto-lost!");
  playerLose();
};
    
const playerReroll = () => {
  showMessageWithAnimation("Player reroll!");
  setIsRollButtonDisabled(false);
};
    
const playerSet = (setValue) => {
  console.log("playerSet func, player set value is: " + setValue + "\n");
  let tempValue = setValue;
  if (tempValue === 6) {
    playerAutoWin();
  } else if (tempValue === 1) {
    playerAutoLoss();
  } else {
    setPlayerSetValue(setValue);
  }
};

useEffect(() => {
  // This code will run whenever playerSetValue changes
  determineWinner();
}, [playerSetValue]);

const bankerAutoWin = () => {
  showMessageWithAnimation("Banker auto-won!");
  playerLose();
};
    
const bankerAutoLoss = () => {
  showMessageWithAnimation("Banker auto-lost!");
  playerWin();
};
    
const bankerReroll = () => {
  showMessageWithAnimation("Banker reroll!");
  setTimeout(rollAnimation, 1500, false);
};
    
const bankerSet = (setValue) => {
  showMessageWithAnimation("Banker set value is: " + setValue);
  if (setValue === 6) {
    setTimeout(playerAutoLoss, 1500);
  } else if (setValue === 1) {
    setTimeout(playerAutoWin, 1500);
  } else {
    setBankerSetValue(setValue);
    setTimeout(showMessageWithAnimation, 1500, "Your turn to roll!");
    setIsRollButtonDisabled(false);
  }
};

const determineWinner = () => {
    console.log("Determining winner, player set: ", playerSetValue, " banker set: ", bankerSetValue);
  if (playerSetValue > bankerSetValue) { //player has higher set value
    showMessageWithAnimation("Player has higher set value.");
    setTimeout(showMessageWithAnimation, 1000, "Player wins!");
    playerWin();
  } else if (playerSetValue < bankerSetValue) { //banker has higher set value
    showMessageWithAnimation("Banker has higher set value.");
    setTimeout(showMessageWithAnimation, 1000, "Player loses!");
    playerLose();
  } else { //tie case
    // showMessageWithAnimation("It's a push!");
    // setTimeout(showMessageWithAnimation, 1000, "Player recieves initial stake.");
    resetStake();
    console.log("Bank Amount: " + money);
    updateMoney(0);
    setIsRollButtonDisabled(true);
    setIsLockInButtonDisabled(true);
    setIsEditable(true);
  }
};

/* FINAL RESULT FOR PLAYER */
const playerWin = () => {
  console.log("playerWin func, player set value is: " + playerSetValue + "\n");
  setTextColor('green');
  cashSound.play((success) => {
    if (!success) {
      console.log('failed to play the sound');
    } else{
      console.log("PLAYED THE SOUND");
    }
  });
  setTimeout(updateMoney, 750, parseInt(stake));
  resetStake();
  setIsLockInButtonDisabled(true);
  setIsEditable(true);
  setIsRollButtonDisabled(true);
};

const playerLose = () => {
  console.log("playerLose func, player set value is: " + playerSetValue + "\n");
  setTextColor('red');
  failSound.play((success) => {
    if (!success) {
      console.log('failed to play the sound');
    }
  });
  setTimeout(updateMoney, 750, (parseInt(stake) * -1));
  resetStake();
  setIsLockInButtonDisabled(true);
  setIsEditable(true);
  setIsRollButtonDisabled(true);
};

  return ( //Image background may need to replace styles.container line
    <ImageBackground source={require('./assets/concrete.png')} style={styles.container}>

      {/* Text inputs in the top left and right corners */}
      <View style={styles.textInputContainerLeft}>
        <Text style={styles.customFont}>Money = </Text>
        <TextInput
          style={[styles.customFont, { color }]} // Apply dynamic color style
          placeholder="500"
          placeholderTextColor="black"
          value={`${money}`} // Display the money value directly without any space or newline
          editable={false} // Make the TextInput non-editable
        />
      </View>
      <View style={styles.textInputContainerRight}>
        <TextInput
          style={styles.customFont2}
          placeholder="Stake = 0"
          placeholderTextColor="black"
          value={`Stake = ${stake}`} // Display the money value with the label
          editable={false} // Make the TextInput non-editable
        />
      </View>

      {/* Messages */}
      {/* {message !== '' && ( */}
        {/* <Text 
          style={styles.message}>
          {message}
        </Text> */}

      {message !== '' && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 20,
            left: 0,
            right: 0,
            alignItems: 'center',
            opacity: animation,
            transform: [{ scale: animation }],
          }}
        >
          <Text style={styles.message}>{message}</Text>
        </Animated.View>
      )}
      {/* )} */}

      {/* Dice */}
      <Dice 
        diceFaces={diceFaces} 
      />

      {/* Bottom Border */}
      <BottomBorder
        stake={stake}
        updateStake={updateStake}
        lockInBet={lockInBet}
        waitAndRoll={rollClick}
        isRollButtonDisabled={isRollButtonDisabled}
        isLockInButtonDisabled={isLockInButtonDisabled}
        isEditable={isEditable}
      />
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
    alignItems: 'center', // Center elements vertically
    flexDirection: 'row', // Align elements horizontally
    top: 0,
    left: 0,
    margin: 10,
    },
  textInputContainerRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
  },
  // textInput: {
  //   position: 'relative',
  //   borderWidth: 3,
  //   borderColor: 'black',
  //   fontWeight: 'bold',
  //   color: 'black',
  //   fontSize: 40, // Decreased font size to fit more buttons horizontally
  //   padding: 10,
  //   borderRadius: 20, // Optional: Add border radius for rounded corners
  //   width: 250,
  //   height: 100,
  //   fontFamily: 'Lobster-Regular',
  // },
  horizontalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -100,
  },
  message: {
    fontSize: 60,
    color: 'black',
    marginTop: 100, // Adjust as needed
    marginBottom: 60, 
    textAlign: 'center', // Center the text
    zIndex: 2, // Ensure text is above the image
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'hesorder'
  },
  customFont: {
    fontFamily: 'aanothertag',
    fontSize: 80,
    color: 'black',
  },
  customFont2: {
    fontFamily: 'aanothertag',
    fontSize: 80,
    color: 'black',
  },
});

export default App;
