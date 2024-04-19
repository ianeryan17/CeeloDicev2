const readline = require('readline');

export class gameManager{
        /*
                                FOUNDATION
                                                                             */
        constructor(){
                // this.messageManager;
                // this.cpuManager;
                // this.playerRollButton;
                // this.lockInButton;
                // this.resetButton;
                // this.chips = new Array(4);

                this.currMoney = 500; //sets current money owned
                this.stakeAmount = 0; //sets starting stake amount to 0
                this.diceNumbers = new Array(6).fill(1);
                this.bankerSetValue = 0; //variable to store set if banker rolls it
                this.playerSetValue = 0; //variable to store set if player rolls it
                this.rl = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                });                
        }
        
        start() {
                // console.log("start called\n");
                // this.updateStatsDisplay();
                this.instructions();
        }

        instructions(){
                console.log("Welcome to Ceelo Dice!\n");
                console.log("The rules of the game are simple. The player stakes a bet. Once the bet is placed, the banker rolls their dice.");
                console.log("The banker automatically wins if they roll three-of-a-kind, if they roll 4-5-6, or if they roll a pair and a 6.");
                console.log("The banker automatically loses if they roll 1-2-3 or if they roll a pair and a 1.");
                console.log("If the banker rolls a pair and a 2, 3, 4, or 5, this is called a 'pair and spare'. In this case, the spare value sets the point value and it becomes the player's turn to roll.");
                console.log("If none of the above combinations are rolled, the banker rerolls the dice.\n");
                console.log("The player then rolls their dice, with the same rules applying to the results of their rolls.");
                console.log("If the player rolls a 'pair and spare', then the point values that each player rolled are compared, with the higher value taking the pot.");
                console.log("If both values are the same, this is known as a push, and the player's stake is returned to them.");
                console.log("If the player wins, they double their initial stake. If they lose, their stake goes to the bank.\n");
                
                this.rl.question('Once these instructions make sense, press enter to proceed to the game.', (userInput) => {
                        // Close the readline interface
                        this.rl.close();

                        this.rl = readline.createInterface({
                                input: process.stdin,
                                output: process.stdout
                        });

                        console.log("\nBank starting amount set to " + this.currMoney + ", stake set to " + this.stakeAmount + ".\n");

                        this.mainLoop();
                });
                
        }

        mainLoop() {
                if (this.currMoney === 0){
                        console.log("Player has run out of money. Time to go home and explain to the wife where your kid's college savings went.\n");
                        this.rl.close();
                        return;
                }
                // console.log("main loop triggered\n");
                // console.log("Bank Amount is " + this.currMoney + ".\n");

                this.rl.question('How much would you like to bet? Press q to cancel. ', (userInput) => {
                        if (userInput.trim() === 'q') { // Trim whitespace and compare to 'q'
                                this.quit();
                                return; // Exit the function early to prevent further execution
                        }

                        if (userInput.trim() > 0 && userInput.trim() <= this.currMoney) {
                                this.updateStakeAmount(userInput);
                        } else {
                                console.log("That is not a valid bet. Try again, with a number between 1 and " + this.currMoney + "\n");
                                this.mainLoop();
                                return; // Exit the function early to prevent further execution
                        }

                        // Close the readline interface
                        this.rl.close();

                        this.rl = readline.createInterface({
                                input: process.stdin,
                                output: process.stdout
                        });

                        console.log("\nYour opponent rolls his dice.\n");
                        this.bankerDiceResult();
                });

                /* OLD UNITY STUFF */
                // this.chipsActivator(this.chips, true);
                // this.disappearButton(this.playerRollButton);
                // this.disappearButton(this.lockInButton);
                // this.disappearButton(this.resetButton);
        }

        quit(){
                console.log("\nQuit chosen. Thanks for playing!");
                this.rl.close();
                return;
        }


/*
                                DICE ROLL GENERATION
                                                                             */
        bankerDiceResult(){
                let die1 = this.getRandomNumber();
                let die2 = this.getRandomNumber();
                let die3 = this.getRandomNumber();

                console.log("Banker's Result: " + die1 + " " + die2 + " " + die3 + "\n");

                this.updateNumberOnDice(2, die1, die2, die3);
        }

        playerDiceResult(){
                let die1 = this.getRandomNumber();
                let die2 = this.getRandomNumber();
                let die3 = this.getRandomNumber();

                console.log("Player's Result: " + die1 + " " + die2 + " " + die3 + "\n");

                this.updateNumberOnDice(1, die1, die2, die3);
        }

        getRandomNumber() {
                // Generate a random decimal between 0 and 1
                const randomDecimal = Math.random();
              
                // Scale the random decimal to fit within the range [min, max]
                // The formula for scaling is: min + (randomDecimal * (max - min + 1))
                // This ensures that the result is in the range [min, max] and includes both min and max
                const randomNumber = 1 + Math.floor(randomDecimal * (6));
              
                return randomNumber;
        }

        updateNumberOnDice(diceIndex, die1, die2, die3) {
                if (diceIndex === 1) {
                        this.diceNumbers[0] = die1;
                        this.diceNumbers[1] = die2;
                        this.diceNumbers[2] = die3;
                        // console.log(`Number on die ${1} updated to: ${die1}`);
                        // console.log(`Number on die ${2} updated to: ${die2}`);
                        // console.log(`Number on die ${3} updated to: ${die3}\n`);
                } else {
                        this.diceNumbers[3] = die1;
                        this.diceNumbers[4] = die2;
                        this.diceNumbers[5] = die3;
                        // console.log(`Number on die ${4} updated to: ${die1}`);
                        // console.log(`Number on die ${5} updated to: ${die2}`);
                        // console.log(`Number on die ${6} updated to: ${die3}\n`);
                }
                
                this.combinationCheck(diceIndex);
        }


        /*
                                DICE RESULT CHECKERS
                                                                             */
        combinationCheck(diceIndex) {
                if (diceIndex === 1) {
                //     console.log("Player dice combo check\n");
                    this.combinationHelper(this.diceNumbers[0], this.diceNumbers[1], this.diceNumbers[2]);
                } else {
                //     console.log("Banker dice combo check\n");
                    this.bankerHelper(this.diceNumbers[3], this.diceNumbers[4], this.diceNumbers[5]);
                }
        }

        combinationHelper(die1, die2, die3) {
                if (
                    (die1 === 4 && die2 === 5 && die3 === 6) ||
                    (die1 === 4 && die2 === 6 && die3 === 5) ||
                    (die1 === 5 && die2 === 4 && die3 === 6) ||
                    (die1 === 5 && die2 === 6 && die3 === 4) ||
                    (die1 === 6 && die2 === 5 && die3 === 4) ||
                    (die1 === 6 && die2 === 4 && die3 === 5)
                ) {
                    //auto win case
                //     console.log("Auto win case found\n");
                    this.playerAutoWin();
                } else if (die1 === die2 && die2 === die3 && die1 === die3) {
                    //triple case
                //     console.log("Triple case found\n");
                    this.playerAutoWin();
                } else if (die1 === die2 && die1 !== die3) {
                    //die3 set point case
                //     console.log("Die3 set point case found\n");
                    this.playerSet(die3);
                } else if (die1 === die3 && die1 !== die2) {
                    //die2 set point case
                //     console.log("Die2 set point case found\n");
                    this.playerSet(die2);
                } else if (die2 === die3 && die1 !== die2) {
                    //die1 set point case
                //     console.log("Die1 set point case found\n");
                    this.playerSet(die1);
                } else if (
                    (die1 === 1 && die2 === 2 && die3 === 3) ||
                    (die1 === 1 && die2 === 3 && die3 === 2) ||
                    (die1 === 2 && die2 === 1 && die3 === 3) ||
                    (die1 === 2 && die2 === 3 && die3 === 1) ||
                    (die1 === 3 && die2 === 2 && die3 === 1) ||
                    (die1 === 3 && die2 === 1 && die3 === 2)
                ) {
                    //auto lose case
                //     console.log("Auto lose case found\n");
                    this.playerAutoLoss();
                } else {
                    //reroll case, no recognized combination found
                //     console.log("Reroll case found\n");
                    this.playerReroll();
                }
        }

        bankerHelper(die1, die2, die3) {
                if (
                    (die1 === 4 && die2 === 5 && die3 === 6) ||
                    (die1 === 4 && die2 === 6 && die3 === 5) ||
                    (die1 === 5 && die2 === 4 && die3 === 6) ||
                    (die1 === 5 && die2 === 6 && die3 === 4) ||
                    (die1 === 6 && die2 === 5 && die3 === 4) ||
                    (die1 === 6 && die2 === 4 && die3 === 5)
                ) {
                    // auto win case  
                //     console.log("Auto win case found\n");
                    this.bankerAutoWin(true);
                } else if (die1 === die2 && die2 === die3 && die1 === die3) {
                    // triple case
                //     console.log("Triple case found\n");
                    this.bankerAutoWin(true);
                } else if (die1 === die2 && die1 !== die3) {
                    // die3 set point case
                //     console.log("Die3 set point case found");
                        this.bankerSet(die3);
                } else if (die1 === die3 && die1 !== die2) {
                    // die2 set point case
                //     console.log("Die2 set point case found");
                        this.bankerSet(die2);
                } else if (die2 === die3 && die1 !== die2) {
                    // die1 set point case
                //     console.log("Die1 set point case found");
                        this.bankerSet(die1);
                } else if (
                    (die1 === 1 && die2 === 2 && die3 === 3) ||
                    (die1 === 1 && die2 === 3 && die3 === 2) ||
                    (die1 === 2 && die2 === 1 && die3 === 3) ||
                    (die1 === 2 && die2 === 3 && die3 === 1) ||
                    (die1 === 3 && die2 === 2 && die3 === 1) ||
                    (die1 === 3 && die2 === 1 && die3 === 2)
                ) {
                    // auto lose case
                //     console.log("Auto lose case found\n");
                    this.bankerAutoLoss(false);
                } else {
                    // reroll case, no recognized combination found
                //     console.log("Reroll case found\n");
                    this.bankerReroll();
                }
        }
        

        /*
                                RESULT STATES
                                                                             */
        playerAutoWin() {
                console.log("Player auto-won!\n");
                // messageManager.displayMessage("Player auto-won!");
                this.playerWin();
        }
            
        playerAutoLoss() {
                console.log("Player auto-lost!\n");
                // messageManager.displayMessage("Player auto-lost!");
                this.playerLose();
        }
            
        playerReroll() {
                // setTimeout(function () {
                //     delayMessage("Player reroll!", 0.5);
                // }, 0);
                console.log("Player reroll!");
                this.rl.question('Press enter to roll again!', (userInput) => {
                        // Display the user's response
                        console.log(`Rolling dice...\n`);

                        // Close the readline interface
                        this.rl.close();

                        this.rl = readline.createInterface({
                                input: process.stdin,
                                output: process.stdout
                        });

                        this.playerDiceResult();
                });
        }
            
        playerSet(setValue) {
                console.log("player set value is: " + setValue + "\n");
                if (setValue === 6) {
                        this.playerAutoWin();
                } else if (setValue === 1) {
                        this.playerAutoLoss();
                } else {
                        this.playerSetValue = setValue;
                        this.determineWinner();
                }
        }
        
        bankerAutoWin() {
                console.log("Banker auto-won!\n");
                // messageManager.displayMessage("Banker auto-won!");
                this.playerLose();
        }
            
        bankerAutoLoss() {
                console.log("Banker auto-lost!\n");
                // messageManager.displayMessage("Banker auto-lost!");
                this.playerWin();
        }
            
        bankerReroll() {
                console.log("Banker reroll!\n");
                // messageManager.displayMessage("Banker reroll!");
                this.bankerDiceResult();
        }
            
        bankerSet(setValue) {
                // messageManager.displayMessage("Banker set point: " + setValue + "!");

                if (setValue === 6) {
                        console.log("banker set value is: " + setValue + "\n");
                        this.playerAutoLoss();
                } else if (setValue === 1) {
                        console.log("banker set value is: " + setValue + "\n");
                        this.playerAutoWin();
                } else {
                        console.log("The banker sets the point value at " + setValue + ". The player must roll a higher set, or auto win.\n");
                        this.bankerSetValue = setValue; //saves value for later comparisons
                        // appearButton(playerRollButton);
                        console.log("Your turn!\n");
                        this.rl.question('Press enter to roll!', (userInput) => {
                                // Display the user's response
                                console.log(`Rolling dice...\n`);
        
                                // Close the readline interface
                                this.rl.close();

                                this.rl = readline.createInterface({
                                        input: process.stdin,
                                        output: process.stdout
                                });

                                this.playerDiceResult();
                        });
                }
        }

        determineWinner() {
                if (this.playerSetValue > this.bankerSetValue) { //player has higher set value
                //     messageManager.displayMessage("Player has higher set value.");
                //     delayMessage("Player wins!", 1000);
                        console.log("Player has higher set value.");
                        console.log("Player wins!");
                        this.playerWin();
                } else if (this.playerSetValue < this.bankerSetValue) { //banker has higher set value
                //     messageManager.displayMessage("Banker has higher set value.");
                //     delayMessage("Player loses!", 1000);
                        console.log("Banker has higher set value.");
                        console.log("Player loses!");
                        this.playerLose();
                } else { //tie
                //     messageManager.displayMessage("Player and Banker have equal set value.");
                //     delayMessage("It's a push!", 1000);
                //     delayMessage("Player recieves initial stake.", 1000);
                        console.log("Player and Banker have equal set value.");
                        console.log("It's a push!");
                        console.log("Player recieves initial stake.\n");
                        this.resetStakeAmount();
                        console.log("Bank Amount: " + this.currMoney);
                        this.mainLoop();
                }
        }

        
        /*
                            FINAL RESULT FOR PLAYER
                                                                             */
        playerWin(){
                const oldMoney = this.currMoney;
                this.currMoney += Number(this.stakeAmount);
                this.stakeAmount = 0;
                console.log("Bank Amount: " + oldMoney + " ---> " + this.currMoney);
                // this.updateStatsDisplay();
                this.mainLoop();
        }

        playerLose(){
                const oldMoney = this.currMoney;
                this.currMoney -= this.stakeAmount;
                this.stakeAmount = 0;
                console.log("Bank Amount: " + oldMoney + " ---> " + this.currMoney);
                // this.updateStatsDisplay();
                this.mainLoop();
        }


        /*
                                MISCELLANEOUS
                                                                             */

        resetStakeAmount() {
                console.log(`Stake: ${this.stakeAmount} ---> 0`);
                this.stakeAmount = 0;
        
                // let tokensTextTemp = document.getElementById("stakeText");
                // tokensTextTemp.innerText = `Stake: ${this.stakeAmount}`;
                // console.log(`New stake: ${this.stakeAmount}`);
                // this.disappearButton(this.lockInButton);
        }













        /*
                             NOT CURRENTLY IN USE
                                                                             */
        updateStatsDisplay() { // UNITY BASED FUNCTION, WILL HAVE TO BE CHANGED FOR REACT NATIVE
                // console.log("updateStatsDisplay called");
                // console.log(`Starting money: ${this.currMoney}`);
                // console.log(`Starting stake: ${this.stakeAmount}`);
        
                // let moneyTextTemp = document.getElementById("moneyText");
                // moneyTextTemp.innerText = `Money: ${this.currMoney}`;
        
                // let stakeTextTemp = document.getElementById("stakeText");
                // stakeTextTemp.innerText = `Stake: ${this.stakeAmount}`;
        }
        
        updateStakeAmount(newAmount) {
                // console.log(`Starting stake: ${this.stakeAmount}`);
                if (this.stakeAmount + newAmount <= this.currMoney) {
                    this.stakeAmount = newAmount;
                } else {
                    console.log("Not enough money!");
                }
        
                // let tokensTextTemp = document.getElementById("stakeText");
                // tokensTextTemp.innerText = `Stake: ${this.stakeAmount}`;
                console.log(`Stake: 0 ---> ${this.stakeAmount}`);
                // this.appearButton(this.lockInButton);
                // this.appearButton(this.resetButton);
        }
        
        
};
 
