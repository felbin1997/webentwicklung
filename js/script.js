/*
    ToDos:  Punktzahl einfügen
*/
const gameCanvas = document.getElementById("gameCanvas");
const context = gameCanvas.getContext("2d");
//Resize Game Canvas to 4:3
sizeGameCanvas(gameCanvas);

/**
 * The interval in milliseconds in which the game is updated.
 */
const interval = 10;

let rightPressed = false;
let leftPressed = false;
let stones = new Set();
let drawInterval;
let updateInterval;

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
};

paddle.x = (gameCanvas.width - paddle.width) / 2;

const stone = {
    width: gameCanvas.width * 0.15,
    height: gameCanvas.height * 0.025,
    color: "#FF0000",
    margin: gameCanvas.width*0.005,
};

let stoneCount = 15;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function init() {
    createLevel();
    draw();
}

function start() {
    hideOverlay();
    drawInterval = setInterval(draw, interval);
    updateInterval = setInterval(update, interval);
}

function reset() {
    clearCanvas();
    resetBall();
    resetPaddle();
    resetStones();
    init();
    hideOverlay();
}

function gameOver() {
    clearInterval(drawInterval);
    clearInterval(updateInterval);
    loadGameOver();
}
function gamePause() {
    
}

/**
 * This function contains all the drawing logic.
 */
function draw() {
    clearCanvas();
    drawBall();
    drawPaddle();
    drawStones();
}

/**
 * This function contains all the physics logic.
 */
function update() {
    updateBall();
    updatePaddle();
    updateStones();
}
function updateBall() {
    bounceBall();
    ball.x += ball.hSpeed;
    ball.y += ball.vSpeed;
}

function createLevel() {

    let horizontalStoneCount = Math.floor(gameCanvas.width / (stone.width + stone.margin));
    let verticalStoneCount = Math.ceil(stoneCount / horizontalStoneCount);

    for (let y = 0; y < verticalStoneCount; y++) {
        for (let x = 0; x < horizontalStoneCount; x++) {

            let stoneX = x * (stone.width + stone.margin);
            let stoneY = y * (stone.height + stone.margin);

            stones.add(new Stone(stoneX, stoneY, stone.width, stone.height));
        }
    }
    console.log(stones);
}

function drawStones() {
    for (const stone of stones) {
        stone.draw(context);
    }
}

function clearCanvas() {
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

}

/*
    Paddle functions
*/
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

function resetPaddle() {
    paddle.width= 150;
    paddle.height= 20;
    paddle.x= gameCanvas.width / 2 - paddle.width/2;
    paddle.speed= 7;
}
/*
    Ball Functions
*/
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

    stones.forEach((stone) => {
        if (ballHitsStone(stone)) {
            ball.vSpeed = -ball.vSpeed;
        }
    });
}

function ballHitsStone(stone) {
    let ballIsInStoneWidth = 
        ball.x + ball.hSpeed + ball.radius >= stone.x &&
        ball.x + ball.hSpeed + ball.radius <= stone.x + stone.width;
    let ballIsInStoneHeight =
        ball.y + ball.vSpeed + ball.radius >= stone.y &&
        ball.y + ball.vSpeed + ball.radius <= stone.y + stone.height;

    if (ballIsInStoneWidth && ballIsInStoneHeight) {
        stone.hit = true;
        return true;
    }
    return false;
}

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}

function resetBall() {
    ball.x= gameCanvas.width / 2;
    ball.y= gameCanvas.height - 60;
}

function updateStones() {
    deleteHitStones();
}

function deleteHitStones() {
    stones.forEach((stone) => {
        if (stone.hit) {
            stones.delete(stone);
        }
    });
}

function resetStones() {
    stones.clear();
}