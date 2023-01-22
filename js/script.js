
const gameCanvas = document.getElementById("gameCanvas");
const context = gameCanvas.getContext("2d");

/**
 * The inteval in milliseconds in which the game is updated.
 */
const interval = 10;

let ballX = gameCanvas.width / 2;
let ballY = gameCanvas.height - 60;
let ballHSpeed = 4;
let ballVSpeed = -4;
const ballColor = "#0095DD"
const ballRadius = 20;

/**
 * This function contains all the drawing logic.
 */
function draw() {
    clearCanvas();
    drawBall();
}

/**
 * This function contains all the physics logic.
 */
function update() {
    updateBall();
}

function updateBall() {
    bounceBall();
    ballX += ballHSpeed;
    ballY += ballVSpeed;
}

function bounceBall() {
    let ballIsAtBottom = ballY + ballVSpeed > gameCanvas.height;
    let ballIsAtTop = ballY + ballVSpeed < 0;
    let ballIsAtRight = ballX + ballHSpeed > gameCanvas.width;
    let ballIsAtLeft = ballX + ballHSpeed < 0;

    if (ballIsAtBottom || ballIsAtTop) {
        ballVSpeed = -ballVSpeed
    }

    if (ballIsAtRight || ballIsAtLeft) {
        ballHSpeed = -ballHSpeed;
    }
}

function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = ballColor;
    context.fill();
    context.closePath();
}

function clearCanvas() {
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

}

setInterval(draw, interval);
setInterval(update, interval);