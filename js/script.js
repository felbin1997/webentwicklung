const gameCanvas = document.getElementById("gameCanvas");
const context = gameCanvas.getContext("2d");

/**
 * Resize game canvas to 4:3 and adjust its size to the browser window
 */
sizeGameCanvas(gameCanvas);

/**
 * The interval in milliseconds in which the game is updated.
 */
const interval = 10;

let drawInterval;
let updateInterval;

let isRunning = false;
let points = 0;

const ball = {
    x: gameCanvas.width / 2,
    y: gameCanvas.height - 37,
    hSpeed: 4,
    vSpeed: -4,
    color: "#22A39F",
    radius: 7,
};

const paddle = {
    width: 100,
    height: 10,
    x: 0,
    speed: 7,
    bottomMargin: 20,
    color: "#0055FF",
};

paddle.x = (gameCanvas.width - paddle.width) / 2;

const stone = {
    width: gameCanvas.width * 0.08,
    height: gameCanvas.height * 0.025,
    color: "#FF0000",
    margin: gameCanvas.width*0.001,
    marginTop: 50,
};

let stoneCount = 50;
let stones = new Set();
const stoneColors = ["#CC2200" , "#D33F00" , "#EE8000" , "#FFA000" , "#AAAA33" , "#BBBB11" , "#9999FF" , "#7777FF" , "#5555FF"];

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function init() {
    createLevel();
    draw();
}

function createLevel() {

    let horizontalStoneCount = Math.floor(gameCanvas.width / (stone.width + stone.margin));
    let verticalStoneCount = Math.ceil(stoneCount / horizontalStoneCount);

    for (let y = 0; y < verticalStoneCount; y++) {
        for (let x = 0; x < horizontalStoneCount; x++) {
            
            let marginLeft = (horizontalStoneCount / 2) * stone.width + stone.margin;
            
            let stoneX = x * (stone.width + stone.margin) + (gameCanvas.width / 2 - marginLeft);
            let stoneY = y * (stone.height + stone.margin) + stone.marginTop;

            stones.add(new Stone(stoneX, stoneY, stone.width, stone.height, stoneColors[y], verticalStoneCount - y));
        }
    }
}

function start() {
    hideOverlay();
    isRunning = true;
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
    setPointstoZero();
}

function gamePause() {
    if(isRunning) {
        clearInterval(drawInterval);
        clearInterval(updateInterval);
        isRunning = false;
        loadPauseMenu();
    }
    else {
        start();
    }
}

function gameOver() {
    clearInterval(drawInterval);
    clearInterval(updateInterval);
    isRunning = false;
    loadGameOver();
}

function levelEnd () {
    clearInterval(drawInterval);
    clearInterval(updateInterval);
    isRunning = false;
    loadLevelEnd();
}

function nextLevel() {
    stoneCount = stoneCount * 2;
    resetBall();
    resetPaddle();
    resetStones();
    init();
    hideOverlay();
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    } else if (e.key == 32 || e.key == " " || e.key == "Spacebar") {
        gamePause();
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function clearCanvas() {
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
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

/**
 * Ball
 */
function updateBall() {
    bounceBall();
    ball.x += ball.hSpeed;
    ball.y += ball.vSpeed;
}

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
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

    stones.forEach((stone) => {
        if (ballHitsStone(stone)) {
            ball.vSpeed = -ball.vSpeed;
        }
    });
}

function resetBall() {
    ball.x= gameCanvas.width / 2;
    ball.y= gameCanvas.height - 37;
}

/**
 *  Paddle functions
 */
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

function resetPaddle() {
    paddle.width= 100;
    paddle.height= 10;
    paddle.x= gameCanvas.width / 2 - paddle.width/2;
}

/*
 *   Stones
 */
class Stone {
    constructor(x , y, width, height, color, pointMultiplicator) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.margin = 1;
        this.x = x;
        this.y = y;
        this.hit = false;
        this.points = 5 * pointMultiplicator;
    }

    draw(context) {
        context.beginPath();
        context.rect(
            this.x, 
            this.y, 
            this.width, 
            this.height,
        );
        context.fillStyle = this.color;
        context.fill();
        context.closePath()
    }
}

function updateStones() {
    deleteHitStones();
}

function drawStones() {
    for (const stone of stones) {
        stone.draw(context);
    }
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

function deleteHitStones() {
    if (stones.size > 0 ) {
        stones.forEach((stone) => {
            if (stone.hit) {
                stones.delete(stone);
                addPoints(stone);
            }
        });
    }
    else {
        levelEnd();
    }
}

function resetStones() {
    stones.clear();
}

/*
 *   Points 
 */
function addPoints(object) {
    points += object.points;
    document.getElementById('punktzahl').innerHTML = "Punktzahl:" + points;
}
function setPointstoZero() {
    points = 0;
    document.getElementById('punktzahl').innerHTML = "Punktzahl:" + points;
}