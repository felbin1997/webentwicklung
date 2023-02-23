const overlay = document.getElementById('overlay');
const startOverlay = document.getElementById('start');
const gameOverOverlay = document.getElementById('gameOver');
const levelEndOverlay = document.getElementById('levelEnd');
const pauseMenu = document.getElementById('pauseMenu');

/**
 * adjust game canvas size to browser window
 */
function sizeGameCanvas (element) {
    if((window.innerWidth*0.7) > window.innerHeight * 0.7) {
       
        element.width = window.innerWidth * 0.7;
        element.height = ((element.width * 0.7 * 4)/3) * 0.6;
    }
    else {
        element.height = window.innerHeight * 0.6;
        element.width = ((element.height * 3)/4) *0.6;
    }
}

/**
 * hide all menus and the background
 */
function hideOverlay() {
    overlay.style.display = "none";
    startOverlay.style.display = 'none';
    gameOverOverlay.style.display = 'none';
    levelEndOverlay.style.display = 'none';
    pauseMenu.style.display = 'none';
}

/**
 * show overlay background
 */
function showOverlay() {
    overlay.style.display = "block";
}   

function loadStartMenu() {
    if (isRunning) { console.log ("Game is running!"); }
    else {
        startOverlay.style.display = "flex";
        showOverlay();
    }
}
function loadGameOver() {
    if (isRunning) { console.log ("Game is running!"); }
    else {
        gameOverOverlay.style.display = 'flex';
        showOverlay();
    }
}
function loadLevelEnd() {
    if (isRunning) { console.log ("Game is running!"); }
    else {
        levelEndOverlay.style.display = 'flex';
        showOverlay();
    }
} 
function loadPauseMenu() {
    if (isRunning) { console.log ("Game is running!"); }
    else {
        pauseMenu.style.display = 'flex';
        showOverlay();
    }
} 