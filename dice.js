//Classes
class player{
    constructor(){
        this.score = 0;
         this.playerTurn = false;
    }
    addScore(dice){
        this.score += dice;
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

let player1 = new player();
let computer = new player();

rollBtn.addEventListener('click',()=>{
    const randomDice = rollDice();
    player1Dice.textContent = dice
})

function rollDice(){
    return Math.ceil(Math.random()*6);
}
