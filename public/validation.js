import {
    handlePlayerChange,
    count,
    winMessage, 
    drawMessage, 
    winnings, 
    handleStatusDisplay,
    gameState,
    game
} from './main.js'

export let gameActive = true

export function handleResultValidation(){
    let roundWon = false
    for(let i = 0; i < winnings.length; i++){
        let winCondition = winnings[i]
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