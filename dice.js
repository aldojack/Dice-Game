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
    if(isPlayer1Turn()){
        player1Dice.textContent = randomDice;
        player1Dice.classList.add('shake');
    }
    else{
        player2Dice.textContent = randomDice;
        player2Dice.classList.add('shake');
    }
    setTimeout(()=>{
    player1Dice.classList.remove('shake');
    player2Dice.classList.remove('shake');

    },2000)
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
    turnDisplay.textContent = `${players[startingPlayer].name} Turn`;

    if(isPlayer1Turn()){
        player1Dice.classList.add('active');
    }
    else{
        player2Dice.classList.add('active');
    }
}

function resetGame(){
    //Reset Player
    players[0].score = 0;
    players[1].score = 0;
    players[0].playerTurn = false;
    players[1].playerTurn = false;
    
    //Reset UI
    player1Dice.textContent = "-";
    player2Dice.textContent = "-";
    player1Scoreboard.textContent = players[0].score;
    player2Scoreboard.textContent = players[1].score;

    showButton(resetBtn,rollBtn)
    startGame();
}

function updateDisplayUI(dice){
    //If Player 1's turn then update their dice number and message to display what they rolled otherwise update player 2
    if(isPlayer1Turn()){
        turnDisplay.textContent = `${players[0].name} rolled ${dice}`;
        player1Dice.textContent = dice
        player1Scoreboard.textContent = players[0].addScore(dice)
    }
    else if(players[1].playerTurn){
        turnDisplay.textContent = `${players[1].name} rolled ${dice}`;
        player2Dice.textContent = dice;
        player2Scoreboard.textContent = players[1].addScore(dice);
    }
}

function isPlayer1Turn(){
    if (players[0].playerTurn){
        return true
    }
    else{
        return false;
    }
}

function checkTurn(){
    if(isPlayer1Turn()){
        players[0].playerTurn = false;
        players[1].playerTurn = true
        activePlayer(player1Dice,player2Dice)
    }
    else{
        players[0].playerTurn = true;
        players[1].playerTurn = false;
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

