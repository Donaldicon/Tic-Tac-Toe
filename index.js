const playerMessage = document.getElementById('player-message');
const restartBtn = document.getElementById('restart-btn');
const boxes = Array.from(document.getElementsByClassName('box'));


const x_Tic = "X";
const o_Tic = "O";
let playerPick = x_Tic;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => {
        box.addEventListener('click', boxClicked)
    });
}
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerWins() {
    for (const condition of winningCombos) {
        let [a,b,c] = condition;

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c];
        }
    }
    return false
}

function boxClicked(e){
    const id = e.target.id

    if (!spaces[id]) {
        spaces[id] = playerPick;
        e.target.innerText = playerPick;

        if (playerWins() !==false) {
            playerMessage.innerText = `${playerPick} has won!`
            let winning_blocks = playerWins();
            winning_blocks.map(box => boxes[box].style.backgroundColor = '#2d414b');
            boxes.forEach(box => box.removeEventListener('click', boxClicked)); 
            return;
        }

        playerPick = playerPick == x_Tic ? o_Tic : x_Tic;
    }
}

restartBtn.addEventListener('click', restart)

function restart(){
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    });
    playerPick = x_Tic
    playerMessage.innerText = 'Tic Tac Toe'
    startGame()
}

startGame();