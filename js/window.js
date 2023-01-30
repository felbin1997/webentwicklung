const overlay= document.getElementById('overlay');


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
}

function showOverlay() {
    overlay.style.display = "block";
}

function loadStartMenu() {
    
}
function loadGameOver() {
    const gameOver = document.getElementById('gameOver');

    gameOver.style.display = 'block';
}