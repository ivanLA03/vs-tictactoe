import {winnings, winMessage, drawMessage, count, handlePlayerChange, handleStatusDisplay} from './main'

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

export default handleResultValidation