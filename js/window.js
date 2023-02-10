const overlay = document.getElementById('overlay');
const startOverlay = document.getElementById('start');
const gameOverOverlay = document.getElementById('gameOver');
const levelEndOverlay = document.getElementById('levelEnd');
const pauseMenu = document.getElementById('pauseMenu');

function sizeGameCanvas (element) {
    if((window.innerWidth*0.8*4)/3 < window.innerHeight) {
        element.width = window.innerWidth * 0.8;
        element.height = (element.width * 4)/3;
    }
    else {
        element.height = window.innerHeight * 0.8;
        element.width = (element.height * 4)/3;
    }
}




//Overlay Menus

function hideOverlay() {
    overlay.style.display = "none";
    startOverlay.style.display = 'none';
    gameOverOverlay.style.display = 'none';
    levelEndOverlay.style.display = 'none';
    pauseMenu.style.display = 'none';
}

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