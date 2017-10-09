const inquirer = require("inquirer");
const library = require("./cardLibrary.json");
const BasicCard = require("./BasicCard.js")
const ClozeCard = require("./ClozeCard.js")
const chalk = require("chalk");
const fs = require("fs");

var drawnCard;
var playedCard;
var count = 0;

//initially give option to the user to Create new flashcards or use exiting ones.
function startMenu() {
  inquirer.prompt([                                                         
      {
          type: "list",                                                     
          message: chalk.blue("Making, using, and smelling Flashcards make your brains bigger. Pick an option:"),   
          choices: ["SuperBrains Flashcard-Maker", "Brain Mass Enhancer (Quiz urself)", "Brain Scramble", "Shuffle The Deck", "View All Cards", "Exit"],    
          name: "menuOptions"                                           
      }
  ]).then(function (answer) {                                       
    var waitMsg;

    switch (answer.menuOptions) {

        case 'SuperBrains Flashcard-Maker':
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳"));
            console.log(chalk.blue("☱☲ ") + chalk.white("For Superbrains, you gotta make flashcards...") + chalk.blue("  ☲☳"));
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳"));           
            waitMsg = setTimeout(makeCard, 1000);
            break;

        case 'Brain Mass Enhancer (Quiz urself)':
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳"));
            console.log(chalk.blue("☱☲ ") + chalk.white("Ok Genius, why don't you go test yourself...") + chalk.blue("   ☲☳"));
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳"));            
            waitMsg = setTimeout(takeQuiz, 1000);
            break;

        case 'Brain Scramble':
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☱☲☳☴☵☶☷☱☲☳☴☵☱☲☳☱☲☳☴☵☱☲☳☴"));
            console.log(chalk.blue("☱☲ ") + chalk.white("Feed your brains a strong quiztein shake, answer a random question:") + chalk.blue("    ☲☳"));
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☱☲☳☴☵☶☷☱☲☳☴☵☱☲☳☱☲☳☴☵☱☲☳☴"));  
            waitMsg = setTimeout(randomCard, 1000);
            break;

        case 'Shuffle The Deck':
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☱☲☳☴☵☱☲☳☴☵☱☲☳☴☵☱"));  
            console.log(chalk.blue("☱☲ ") + chalk.white("Shuffle that deck! Shuck, jive, do the braindango shuffle...") + chalk.blue("   ☲☳"));
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☱☲☳☴☵☱☲☳☴☵☱☲☳☴☵☱"));  
            waitMsg = setTimeout(shuffleDeck, 1000);
            break;

        case 'View All Cards':
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☲☳☴☵☱☲☳"));          
            console.log(chalk.blue("☱☲ ") + chalk.white("See all the magic behind the machine...") + chalk.blue("    ☲☳"));
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☲☳☴☵☱☲☳"));  
            waitMsg = setTimeout(showCards, 1000);
            break;

        case 'Exit':
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☳☴☵☱☲☳☳☴☵☱"));  
            console.log(chalk.blue("☱☲ ") + chalk.white("May your brains grow large, be well friend, be well...") + chalk.blue("   ☲☳"));
            console.log(chalk.magenta("☱☲☳☴☵☶☷☱☲☳☴☵☶☷☱☲☳☴☱☱☲☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☴☵☳☱☲☳☴☵☱☲☳☳☴☵☱☲☳☳☴☵☱"));  
            return;
            break;

        default:
            console.log("☣☢☣☢☣☢☣☢☣☢☣☢☣☢☣☣☢☣☢☢☣");
            console.log("☣☢☣☢☣Uh, really?☢☣☢☣☢");
            console.log("☣☢☣☢☣☢☣☢☣☢☣☢☣☢☣☢☣☢☣☢☣");
    }

  });

}

startMenu();

//If the choice is to create a card then this function will run
function makeCard() {
    inquirer.prompt([
        {
            type: "list",
            message: "What kind of flashcard do you want to make?",
            choices: ["Basic Card", "Cloze Card"],
            name: "cardType"
        }

    ]).then(function (appData) {

        var cardType = appData.cardType;            
        console.log(cardType);                  

        if (cardType === "Basic Card") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please fill out the info for the front of the card.",
                    name: "front"
                },

                {
                    type: "input",
                    message: "Please provide the answer for the back of the card.",
                    name: "back"
                }

            ]).then(function (cardData) {

                var cardObj = {                     
                    type: "BasicCard",
                    front: cardData.front,
                    back: cardData.back
                };
                library.push(cardObj);             
                fs.writeFileSync("cardLibrary.json", JSON.stringify(library, null, 2)); 

                inquirer.prompt([                   
                    {
                        type: "list",
                        message: "Make a new card?",
                        choices: ["Yes", "No"],
                        name: "anotherCard"
                    }

                ]).then(function (appData) {                
                    if (appData.anotherCard === "Yes") {
                        makeCard();                     
                    } else {                                
                        setTimeout(startMenu, 1000);            
                    }
                });
            });

        } else {                
            inquirer.prompt([
                {
                    type: "input",
                    message: "Fill out the full text of the flashcard (cloze will occur in next step).",
                    name: "text"
                },

                {
                    type: "input",
                    message: "Please type the portion of text to cloze. It must match your prior submission.",
                    name: "cloze"
                }

            ]).then(function (cardData) {            

                var cardObj = {                     
                    type: "ClozeCard",
                    text: cardData.text,
                    cloze: cardData.cloze
                };
                if (cardObj.text.indexOf(cardObj.cloze) !== -1) {   
                    library.push(cardObj);                          
                    fs.writeFileSync("cardLibrary.json", JSON.stringify(library, null, 2)); 
                } else {                                            
                    console.log(chalk.white("Sorry, the cloze must match some word(s) in the text of your statement."));
                }
                inquirer.prompt([                   
                    {
                        type: "list",
                        message: "Do you want to create another card?",
                        choices: ["Yes", "No"],
                        name: "anotherCard"
                    }
                ]).then(function (appData) {               
                    if (appData.anotherCard === "Yes") {    
                        makeCard();                     
                    } else {                               
                        setTimeout(startMenu, 1000);        
                    }
                });
            });
        }

    });
};

//Function used to get the question from the drawnCard in the takeQuiz function
function getQuestion(card) {
    if (card.type === "BasicCard") {                        
        drawnCard = new BasicCard(card.front, card.back);   
        return drawnCard.front;                             
    } else if (card.type === "ClozeCard") {                 
        drawnCard = new ClozeCard(card.text, card.cloze)    
        return drawnCard.clozeRemoved();                    
    }
};

//Quiz function
function takeQuiz() {
    if (count < library.length) {                   
        playedCard = getQuestion(library[count]);   
        inquirer.prompt([                           
            {
                type: "input",
                message: playedCard,
                name: "question"
            }
        ]).then(function (answer) {                 
            if (answer.question === library[count].back || answer.question === library[count].cloze) {
                console.log(chalk.white("You are a GENIUS!! ☕  Insert here for free coffee ☕"));
            } else {
                
                if (drawnCard.front !== undefined) { 
                    console.log(chalk.red("Sorry Sucka!!, the correct answer was ") + chalk.white(library[count].back) + "."); 
                } else { 
                    console.log(chalk.red("Sorry Sucka!!, the correct answer was ") + chalk.white(library[count].cloze)+ ".");
                }
            }
            count++;        
            takeQuiz(); //we like recursion, wot wot!!
        });
    } else {
        count=0;            
        startMenu();        
    }
};

function shuffleDeck() {
  newDeck = library.slice(0); 
  for (var i = library.length - 1; i > 0; i--) { //this algorithm re-orders the array

      var getIndex = Math.floor(Math.random() * (i + 1));
      var shuffled = newDeck[getIndex];

      newDeck[getIndex] = newDeck[i];

      newDeck[i] = shuffled;
  }
  fs.writeFileSync("cardLibrary.json", JSON.stringify(newDeck, null, 2)); //this new randomized array overwrites the old one
  console.log(chalk.cyan(" ☞ Your deck shuffled is now!☜"));
}

//function to ask question from a random card
function randomCard() {
  var randomNumber = Math.floor(Math.random() * (library.length - 1));  

  playedCard = getQuestion(library[randomNumber]);  
        inquirer.prompt([                           
            {
                type: "input",
                message: playedCard,
                name: "question"
            }
        ]).then(function (answer) { 
            if (answer.question === library[randomNumber].back || answer.question === library[randomNumber].cloze) {
                console.log(chalk.magenta("U R SUPAH SMAHT, great job, well done..."));
                setTimeout(startMenu, 1000);
            } else {
                //check to see if rando card is Cloze or Basic
                if (drawnCard.front !== undefined) { 
                    console.log(chalk.redBright("Sorry Great Bungholio, the correct answer was ") + library[randomNumber].back + "."); 
                    setTimeout(startMenu, 1000);
                } else { // otherwise it is a Cloze card
                    console.log(chalk.redBright("Sorry Great Bungholio, the correct answer was ") + library[randomNumber].cloze + ".");
                    setTimeout(startMenu, 1000);
                }
            }
        });

};

//function to print all cards on screen for user to read through
function showCards () {
  var library = require("./cardLibrary.json");
  if (count < library.length) {                 
    if (library[count].front !== undefined) {
        console.log("");
        console.log(chalk.magenta("▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣ Basic Card ▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣"));
        console.log(chalk.white("◐ Front: " + library[count].front)); //grabs & shows card question
        console.log(chalk.cyan("\n◑ Back: " + library[count].back + ".")); //grabs & shows card question
        console.log(chalk.blue("回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回"));
    } else { 
        console.log("");
        console.log(chalk.magenta("▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣ Cloze Card ▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣"));
        console.log(chalk.white("◐ Text: " + library[count].text)); //grabs & shows card question
        console.log(chalk.cyan("\n◑ Cloze: " + library[count].cloze + ".")); //grabs & shows card question
        console.log(chalk.blue("回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回回"));
    }
    count++;    
    showCards();    
  } else {
    count=0;        
    startMenu();        
  }
}