const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const btn = document.querySelector('.btn');

let currPlayer;
let gameGrid;
const winningPos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// to initialise the game
function initGame(){
    currPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box)=>{
        box.innerText = "";
        box.classList='box';
        box.style.pointerEvents = "all";
    })

    btn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();

// filling the boxes    playing game
boxes.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        handleClick(index);
    });
})

function handleClick(index){
    if(gameGrid[index]==""){
        gameGrid[index] = currPlayer;
        boxes[index].innerText = currPlayer;
        boxes[index].style.pointerEvents = "none";
        
        swapTurn();
        checkWin();
    }
    if(!btn.classList.contains('active')){
        btn.classList.add('active');
    }
}

function swapTurn(){
    if(currPlayer === 'X')
        currPlayer = 'O';
    else
        currPlayer = 'X';
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkWin(){
    for(let i=0; i<winningPos.length; i++){
        let first = winningPos[i][0];
        let second = winningPos[i][1];
        let third = winningPos[i][2];
        if( (gameGrid[first] !== "") && (gameGrid[first] === gameGrid[second]) && (gameGrid[first] === gameGrid[third])){
            winGame(first, second, third);
            return;
        }
    }

    // for game ties
    let allFull = true;
    for(let i=0; i<gameGrid.length; i++){
        if(gameGrid[i]==="")
            allFull = false;
    }
    if(allFull){
        gameInfo.innerText = `Game Ties`;
    }
}

function winGame(first, second, third){
    boxes[first].classList.add('win');
    boxes[second].classList.add('win');
    boxes[third].classList.add('win');

    let winner = gameGrid[first];
    gameInfo.innerText = `Winner Player - ${winner}`;
    boxes.forEach((box)=>{
        box.style.pointerEvents = 'none';
    })
}


btn.addEventListener('click', initGame);