//DOM Objects
const turnDisplay = document.getElementById('message');
const player1Scoreboard = document.getElementById('player1Scoreboard');
const player2Scoreboard = document.getElementById('player2Scoreboard');
const player1Dice = document.getElementById('player1Dice');
const player2Dice = document.getElementById('player2Dice');
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

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

//Declare variables
const players = [new player("Player 1"), new player("Player 2")];
let gameActive = false;
const scoreLimit = 20;


rollBtn.addEventListener('click',()=>{
    const randomDice = rollDice();
    players[0].playerTurn ? player1Dice.textContent = randomDice : player2Dice.textContent = randomDice;
    updateDisplayUI(randomDice);
    checkTurn();
})

resetBtn.addEventListener('click',()=>{
    resetGame();
})

function startGame(){
    gameActive = true;
    const startingPlayer = Math.floor(Math.random()*2)
    players[startingPlayer].playerTurn = true;
    console.log(`${players[startingPlayer].name} is going first`)
}

function resetGame(){
    gameActive = true
    showButton(resetBtn,rollBtn)
    players[0].score = 0;
    players[1].score = 0;
    player1Dice.textContent = "-";
    player2Dice.textContent = "-";
    player1Scoreboard.textContent = players[0].score;
    player2Scoreboard.textContent = players[1].score;
    turnDisplay.textContent = `Player 1 Turn`;
}

function updateDisplayUI(dice){
    players[0].playerTurn ? turnDisplay.textContent = `${players[0].name} rolled ${dice}` : turnDisplay.textContent = `${players[1].name} rolled ${dice}`;
    players[0].playerTurn ? player1Dice.textContent = dice : player2Dice.textContent = dice;
    players[0].playerTurn ? player1Scoreboard.textContent = players[0].addScore(dice) : player2Scoreboard.textContent = players[1].addScore(dice);
}

function checkTurn(){
    players[0].playerTurn  = !players[0].playerTurn
    if(players[0].playerTurn){
        activePlayer(player1Dice,player2Dice)
    }
    else{
        activePlayer(player2Dice,player1Dice)
    }
    checkWinner();
}

function showButton(btn1,btn2){
    btn1.style.display = "none";
    btn2.style.display = "inline-block";
}

function activePlayer(p1,p2){
    p1.classList.remove('active');
    p2.classList.add('active');
}

function checkWinner(){
    if(players[0].hasWon()){
        turnDisplay.textContent = `${players[0].name} has won`;
        showButton(rollBtn,resetBtn)
    }
    else if(players[1].hasWon()){
        turnDisplay.textContent = `${players[1].name} has won`;
        showButton(rollBtn,resetBtn)
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


