import { listeners } from "./listeners.js"
const 
    statusDisplay = document.querySelector(".game-notification"),
    gameState = Array(9).fill(''),
    winnings = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    countRight = document.querySelector('.right'),
    countLeft = document.querySelector('.left')

let gameActive = true,
    currentPlayer = 'O',
    left = 0,
    right = 0,
    game = 0
    
const
    winMessage = () => `${currentPlayer} Wins`,
    drawMessage = () => 'Draw',
    currentPlayerTurn = () => ` ${currentPlayer}\'s turn`

function handleStatusDisplay(message){
    statusDisplay.innerHTML = message
}

export function handleRestartGame(){
    gameActive = true
    game += 1
    if(game % 2 == 0){
        currentPlayer = 'O'
    }
    else{
        currentPlayer = 'X'
    }
    restartGameState()
    handleStatusDisplay(currentPlayerTurn())
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '')
}

function handleResultValidation(){
    let roundWon = false
    for (const winCondition of winnings) {
        const [a, b, c] = winCondition
        const position1 = gameState[a]
        const position2 = gameState[b]
        const position3 = gameState[c]
        if(position1 === ''|| position2 === '' || position3 == ''){
            continue;
        }
        if(position1 === position2 && position2 === position3){
            roundWon = true
            count()
            break;
        }
    }
    if(roundWon){
        handleStatusDisplay(winMessage())
        gameActive = false
        return
    }

    let roundDraw = !gameState.includes('')

    if (roundDraw){
        handleStatusDisplay(drawMessage())
        gameActive = false
        return
    }

    handlePlayerChange()
}

export function handleCellClick(clickedEvent){
    const clickedCell = clickedEvent.target
    if(clickedCell.classList.contains('cell')){
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        if(gameState[clickedCellIndex] !== '' || !gameActive){
            return
        }
        handleCellPlayed(clickedCell,clickedCellIndex)
        handleResultValidation()
    }
}

function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerText = currentPlayer
    currentPlayer === "X"? clickedCell.style.color = "#f00" : clickedCell.style.color = "#00e"
}

function handlePlayerChange(){
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
    handleStatusDisplay(currentPlayerTurn())
}

function restartGameState(){
    gameState.fill('')
}

function count(){
    if (currentPlayer === 'O'){
        left++
    }

    else if (currentPlayer === 'X'){
        right++ 
    }
    
    countRight.innerHTML = `X : ${right}`
    countLeft.innerHTML = `O : ${left}`
}

export function restartCount(){
    right = 0
    left = 0
    countRight.innerHTML = `X : ${right}`
    countLeft.innerHTML = `O : ${left}`
    handleRestartGame()
}

function main(){
    handleStatusDisplay(currentPlayerTurn())
    listeners()
}

main()