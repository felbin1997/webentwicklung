
const gameCanvas = document.getElementById("gameCanvas");
const context = gameCanvas.getContext("2d");

/**
 * The interval in milliseconds in which the game is updated.
 */
const interval = 10;

let rightPressed = false;
let leftPressed = false;

const ball = {
    x: gameCanvas.width / 2,
    y: gameCanvas.height - 60,
    hSpeed: 4,
    vSpeed: -4,
    color: "#22A39F",
    radius: 20,
};

const paddle = {
    width: 150,
    height: 20,
    x: 0,
    speed: 7,
    bottomMargin: 20,
    color: "#222222",
}

paddle.x = (gameCanvas.width - paddle.width) / 2;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const drawInterval = setInterval(draw, interval);
const updateInterval = setInterval(update, interval);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

/**
 * This function contains all the drawing logic.
 */
function draw() {
    clearCanvas();
    drawBall();
    drawPaddle();
}

/**
 * This function contains all the physics logic.
 */
function update() {
    updateBall();
    updatePaddle();
}

function updateBall() {
    bounceBall();
    ball.x += ball.hSpeed;
    ball.y += ball.vSpeed;
}

function bounceBall() {
    let ballIsAtBottom = 
        ball.y + ball.vSpeed > gameCanvas.height - ball.radius;
    let ballIsAtTop = 
        ball.y + ball.vSpeed < ball.radius;
    let ballIsAtRight = 
        ball.x + ball.hSpeed > gameCanvas.width - ball.radius;
    let ballIsAtLeft = 
        ball.x + ball.hSpeed < ball.radius;
    let ballIsOnPaddle =
        ball.x > paddle.x && ball.x < paddle.x + paddle.width &&
        ball.y > gameCanvas.height - paddle.height - ball.radius - paddle.bottomMargin;

    if (ballIsAtBottom) {
        gameOver();
    }

    if (ballIsAtTop || ballIsOnPaddle) {
        ball.vSpeed = -ball.vSpeed;
    }

    if (ballIsAtRight || ballIsAtLeft) {
        ball.hSpeed = -ball.hSpeed;
    }
}

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(
        paddle.x, 
        gameCanvas.height - paddle.height - paddle.bottomMargin, 
        paddle.width, 
        paddle.height,
    );
    context.fillStyle = paddle.color;
    context.fill();
    context.closePath()
}

function updatePaddle() {
    if (rightPressed) {
        paddle.x = Math.min(
            paddle.x + paddle.speed, 
            gameCanvas.width - paddle.width
        );
    } 
    if (leftPressed) {
        paddle.x = Math.max(
            paddle.x - paddle.speed,
            0,
        );
    }
}

function gameOver() {
    alert("GAME OVER");
    document.location.reload();
    clearInterval(drawInterval);
    clearInterval(updateInterval);
}

function clearCanvas() {
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

}