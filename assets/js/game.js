//player robot
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//enemy robots
var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//function to start a new game
var startGame = function() {
  //reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for(var i = 0; i < enemyNames.length; i++){
    //if player is still alive, keep fighting
    if(playerHealth > 0){
      //let player know what round they're on
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      //pick new enemy to fight based on index of array
      var pickedEnemyName = enemyNames[i];

      //reset enemy's health before starting new fight
      enemyHealth = 50;

      //pass the name of the robot into the fight function
      fight(pickedEnemyName);

      //if we are not at the last enemy in the array
      if(playerHealth > 0 && i < enemyNames.length - 1){
        //ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        //if yes, take them to the shop() function
        if(storeConfirm){
          shop();
        }
      }
    }
    else {
      window.alert("You have lost your robot in battle! Game over!");
      break;
    }
    //play again
    startGame();
  }
  //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();

};

// function to end the entire game
var endGame = function(){
  //if player is still alive, player wins!
  if(playerHealth > 0){
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  }
  else{
    window.alert("You've lost your robot in battle.");
  }
  
  //ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if(playAgainConfirm){
    //restart the game
    startGame();
  }
  else{
    window.alert("Thank you for playing Robot Gladiators!");
  }
};

var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerName + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
          playerMoney = playerMoney - 10;
          console.log("playerMoney", playerMoney)
          break;
        }
      }
  
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth = enemyHealth - playerAttack;
      console.log(
        playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
      );
  
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + ' has died!');
  
        // award player money for winning
        playerMoney = playerMoney + 20;
  
        // leave while() loop since enemy is dead
        break;
      } 
      else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      playerHealth = playerHealth - enemyAttack;
      console.log(
        enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
      );
  
      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
        // leave while() loop if player is dead
        break;
      } 
      else {
        window.alert(playerName + ' still has ' + playerHealth + ' health left.');
      }
    }
  };


var shop = function(){
  //ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // switch statement carries out choice
    switch(shopOptionPrompt){
      case "REFILL":
      case "refill":
        if(playerMoney >=7){
          window.alert("Refilling player's health by 20 for 7 dollars.");

          //increase health and decrease money
          playerHealth = playerHealth + 20;
          playerMoney = playerMoney - 7;
        }
        else{
          window.alert("You don't have enough money!");
        }
        break;

      case "UPGRADE":
      case "upgrade":
        if(playerMoney >= 7){
          window.alert("Upgrading player's attack by 6 for 7 dollars.");

          //increase attack and decrease money
          playerAttack = playerAttack + 6;
          playerMoney = playerMoney - 7;
        }
        else{
          window.alert("You don't have enough money!"); 
        }
        break;

      case "LEAVE":
      case "leave":
        window.alert("Leaving the store.");
        //do nothing, so function will end
        break
      default:
        window.alert("You did not pick a valid option. Try again.");

        //call shop() again to force pllayer to pick a valid option
        shop();
        break;
    }

};



//start the game when the page loads
startGame();