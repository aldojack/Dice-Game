//Classes
class player{
    constructor(name){
        this.name = name
        this.score = 0;
         this.playerTurn = false;
    }
    addScore(dice){
        return this.score += dice;
    }
    hasWon(){
        if(this.score >= scoreLimit){
            gameActive = false
            return true;
        }
        else{
            return false;
        }
    }
}


//DOM Variables
const turnDisplay = document.getElementById('message');
const player1Scoreboard = document.getElementById('player1Scoreboard');
const player2Scoreboard = document.getElementById('player2Scoreboard');
const player1Dice = document.getElementById('player1Dice');
const player2Dice = document.getElementById('player2Dice');
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

//Declare variables
let player1 = new player("Player 1");
let player2 = new player("Player 2");
console.log(player2)
console.log(player1)


let gameActive = false;
const scoreLimit = 20;


rollBtn.addEventListener('click',()=>{
    if(player1.score <= scoreLimit && player2.score <=scoreLimit){
        const randomDice = rollDice();
        player1.playerTurn ? player1Dice.textContent = randomDice : player2Dice.textContent = randomDice;
        updateMessage(randomDice);
        checkTurn();
    }
})

resetBtn.addEventListener('click',()=>{
    resetGame();
})

function startGame(){
    gameActive = true;
    player1.playerTurn = true;
}

function resetGame(){
    gameActive = true
    rollBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
}

function updateMessage(dice){
    player1.playerTurn ? turnDisplay.textContent = `${player1.name} rolled ${dice}` : turnDisplay.textContent = `${player2.name} rolled ${dice}`;
    updateScore(dice);
}

function updateScore(dice){
    player1.playerTurn ? player1Dice.textContent = dice : player2Dice.textContent = dice;
    player1.playerTurn ? player1Scoreboard.textContent = player1.addScore(dice) : player2Scoreboard.textContent = player2.addScore(dice);
}

function checkTurn(){
    player1.playerTurn  = !player1.playerTurn
    if(player1.playerTurn){
        player1Dice.classList.remove('active');
        player2Dice.classList.add('active');
    }
    else{
        player2Dice.classList.remove('active');
        player1Dice.classList.add('active');
    }
    checkWinner();
}

function checkWinner(){
    if(player1.hasWon()){
        turnDisplay.textContent = `${player1.name} has won`;
        rollBtn.style.display = "none";
        resetBtn.style.display = "inline-block";
    }
    else if(player2.hasWon()){
        turnDisplay.textContent = `${player2.name} has won`;
        rollBtn.style.display = "none";
        resetBtn.style.display = "inline-block";
    }
}

function rollDice(){
    return Math.ceil(Math.random()*6);
}

startGame();

/*

***Unsure prefered method of but the above is less lines of code***

rollBtn.addEventListener('click',()=>{
    const randomDice = rollDice();

    if(player1.playerTurn){
        player1Dice.textContent = randomDice
        updateMessage(player1,randomDice)
    }
    else{
        player2Dice.textContent = randomDice;
        updateMessage(player2,randomDice)
    }
    checkTurn();
})

function startGame(){
    player1.playerTurn = true;
}

function updateMessage(player,dice){
    turnDisplay.textContent = `${player.name} rolled ${dice}`;
    updateScore(player,dice);
}

function updateScore(player,dice){
    if(player.name === "Player 1"){
        player1Dice.textContent = dice 
        player1Scoreboard.textContent = player1.addScore(dice);
    }
    else{
        player2Dice.textContent = dice;
        player2Scoreboard.textContent = player2.addScore(dice);
    }
}

function checkTurn(){
    player1.playerTurn ? player1.playerTurn = false : player1.playerTurn = true;
}
*/


