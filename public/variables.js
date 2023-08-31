export const statusDisplay = document.querySelector(".game-notification"),
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


export let gameActive = true,
        currentPlayer = 'O',
        left = 0,
        right = 0,
        game = 0