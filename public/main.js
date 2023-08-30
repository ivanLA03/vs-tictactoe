//variables

const statusDisplay = document.querySelector(".game-notification"),
    gameState = ['','','','','','','','',''],
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
    winMessage = () => `${currentPlayer} Wins`,
    drawMessage = () => 'Draw',
    currentPlayerTurn = () => ` ${currentPlayer}\'s turn`,
    Xpoints = () => `X ${right}`,
    Opoints = () => `O ${left}`,
    countRight = document.querySelector('.right'),
    countLeft = document.querySelector('.left'),
    restartPoints = document.querySelector('.restart-points')


let gameActive = true,
    currentPlayer = 'O',
    left = 0,
    right = 0,
    game = 0

// functions

function handleStatusDisplay(message){
    statusDisplay.innerHTML = message
}

function listeners(){
    document.querySelector(".game-container").addEventListener('click',handleCellClick)
    document.querySelector(".reset").addEventListener('click', handleRestartGame)
    document.querySelector(".game-container").addEventListener('click',changeColors)
    restartPoints.addEventListener('click', restartCount)
}

function handleRestartGame(){
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

function handleCellClick(clickedEvent){
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

function changeColors(clickedEvent){
    const clickedCell = clickedEvent.target
    if(clickedCell.classList.contains('cell')){
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        if(gameState[clickedCellIndex] === 'X'){
            clickedCell.id = 'X'
        }
    }
}

function changeColors(clickedEvent){
    const clickedCell = clickedEvent.target
    
}

function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerText = currentPlayer
}

function handleResultValidation(){
    let roundWon = false
    for(let i = 0; i < winnings.length; i++){
        const winCondition = winnings[i]
        let position1 = gameState[winCondition[0]],
            position2 = gameState[winCondition[1]],
            position3 = gameState[winCondition[2]]
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

function handlePlayerChange(){
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
    handleStatusDisplay(currentPlayerTurn())
}

function restartGameState(){
    let i = gameState.length
    while (i--){
        gameState[i] = ''
    }
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

function restartCount(){
    right = 0
    left = 0
    countRight.innerHTML = `X : ${right}`
    countLeft.innerHTML = `O : ${left}`
}



function main(){
    handleStatusDisplay(currentPlayerTurn())
    listeners()
    Xpoints()
    Opoints()
}

main()