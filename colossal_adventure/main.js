
const readline = require("readline-sync");

function generateRandom(chance, startNum = 0) { // 3 is 1/3 chance, 5 is 1/5 chance
    const randomNum = (Math.floor(Math.random() * chance) + startNum);
    return randomNum
}

// Adds character to level, moves character 'distance' spaces. Prints level to console
function movePlayer(level, distance, character) {
    level = level.split("");
    level[distance] = character;
    level = level.join("");
    console.log(level + "\n");
}

// Asks for user input in console, deals with bad input. Returns userInput
function setupInput(prompt, ...expectedInput) {
    while (true) {
        const userInput = readline.question(prompt);
        if (expectedInput.includes(userInput)){
            return userInput;
        } else {
            console.log("Invalid Input");

        }
    }
}

// Create Inventory object to store user name and character, returns player Object and level
function initGame() {
    levelList = [
        "____🌲____🌲____🌲____🌲____🌲____🌲___🌲____🌲____🌲____🌲____🌲____🌲____",
        "____🌧____🌧____🌧____🌧____🌧____🌧___🌧____🌧____🌧____🌧____🌧____🌧____",
        "____🔥____🔥____🔥____🔥____🔥____🔥___🔥____🔥____🔥____🔥____🔥____🔥____"
    ]
    characters = ["🧛‍", "🎅", "🦸"];

    const userInput = readline.question("Enter your name: ");
    console.table(characters);
    const charIndex = setupInput("Choose A Character: ", "0", "1", "2");
    const currentPlayer = new Inventory(userInput, characters[charIndex]);
    console.table(levelList);
    const level = setupInput("Select A level: ", "0", "1", "2");
    console.log(`Hello ${userInput}, Welcome to the Colossal Adventure!\n'Print' of 'p' to view inventory, 'q' to quit`);
    return [currentPlayer, levelList[level]];
}

// Asks for user input in console, deals with print, quit, and bad input. Returns userInput or Boolean
function getInput(prompt, player, ...expectedInput) {
    while (true) {
        const userInput = readline.question(prompt);
        if (userInput === "p" || userInput === "Print") {
            player.print();
        } else if (userInput === "q") {
            console.log("Thanks for playing!");
            return false;
        } else if (expectedInput.includes(userInput)){
            return userInput;
        } else {
            console.log("Invalid Input")
        }
    }
}

// Main game play, handles walking/enemy generation. Returns Boolean
function playing(player) {
    const userInput = getInput("Enter 'w' to walk: ", player, 'w');
    if (!userInput) {
        return false;
    }
    if (userInput === "w") {
        level = "---------"
        if (generateRandom(4)) { // executes if num generated is not 0
            console.log("Walking...");
        } else {
            const enemy = generateEnemy();
            console.log(`Look out! ${enemy} is coming`);
            const battleResult = battle(enemy, player);
            return battleResult;
        }
    }
    return true;
}

function generateEnemy() {
    const enemies = ["Iron Man", "Sasquach", "The Tooth Fairy"];
    const enemy = enemies[generateRandom(3)];
    return enemy
}

//  Handles decision to run or fight. Returns boolean
function battle(enemy, player) {
    const userInput = getInput("Hurry run ('r') or get ready to fight ('f'): ", player, 'r', 'f');
    if (userInput === "f") {
        const attackResult = attackDamage(enemy, player);
        return attackResult;
    } else if (userInput === "r") {
        console.log("run!!!");
        if (!generateRandom(2)) {
            console.log("phweef you escaped.");
        } else {
            console.log("Oh no you got caught!")
            const attackResult = attackDamage(enemy, player);
            return attackResult;
        }
    }
    return userInput;
}

//  Deducts HP from character object. Returns boolean
function attackDamage(enemy, player) {
    const damage = generateRandom(100, 1);
    player.hp -= damage;
    console.log(`Fighting ${enemy}...\nYou lost ${damage} hp`);
    const health = checkHealth(enemy, player);
    return health;
}

// Handles fight result, game over or back to playing(). Returns boolean
function checkHealth(enemy, player) {
    const itemsList = ["Shield", "Top Hat", "Small Red Shoes", "Bird", "Backpack"];
    if (player.hp > 0) {
        const newItem = itemsList[generateRandom(itemsList.length)];
        console.log(`New Item: ${newItem}`);
        player.items.push(newItem);
        return true;
    } else {
        console.log(`You've been defeated by ${enemy}, better luck next year... GAME OVER`);
        return false;
    }
}
     
function Inventory(userName, userChar, hp = 100, items = []) {
    this.name = userName,
    this.character = userChar,
    this.hp = hp,
    this.items = items,
    this.print = ()  => {
        console.log(`${this.character}: ${this.name}, HP: ${this.hp}, Items: ${this.items}`);
    }
}

function main() {
    game = initGame();
    const currentPlayer = game[0];
    let level = game[1];
    let progress = 0;
    while (playing(currentPlayer)) {
        progress += 5;
        movePlayer(level, progress, currentPlayer.character);
        if (progress > level.length) {
            console.log("Congragulations You've Won!!!!");
            break;
        }
    };
}

main();
