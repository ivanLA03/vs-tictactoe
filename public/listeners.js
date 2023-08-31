import { handleCellClick, handleRestartGame, restartCount } from './main.js';

export function listeners() {
    document.querySelector(".game-container").addEventListener('click', handleCellClick);
    document.querySelector(".reset").addEventListener('click', handleRestartGame);
    document.querySelector('.restart-points').addEventListener('click', restartCount);
}