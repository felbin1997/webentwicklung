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
let stones = [];
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
}

const stone = {
    width: gameCanvas.width * 0.15,
    height: gameCanvas.height * 0.025,
    color: "#FF0000",
    margin: gameCanvas.width*0.005,
};
paddle.x = (gameCanvas.width - paddle.width) / 2;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function init() {
    drawBall();
    drawPaddle();
    createLevel();
}

function start() {
    hideOverlay();
    drawInterval = setInterval(draw, interval);
    updateInterval = setInterval(update, interval);
}

function reset() {
    clearCanvas();
    resetBall();
    resetPaddel();
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
}
function updateBall() {
    bounceBall();
    ball.x += ball.hSpeed;
    ball.y += ball.vSpeed;
}


function createLevel() {
    let n = 0;
    for (let x=-2; x<=2; x++) {
        for (let y=0; y<3; y++) {
            stones[n] = new Stone((gameCanvas.width -stone.width) / 2 + (x * (stone.width + stone.margin)),(stone.margin + (y * (stone.height+stone.margin))), gameCanvas);
            stones[n].draw(context);
            n = n + 1;
        }
    }
}

function drawStones() {
    for(let e=0; e< stones.length; e++) {
        //delete Stones that are Hit
        if(stones[e].hit) { 
            delete stones.splice(e,1); 
        }
        //Or Draw the Stone
        else {
            stones[e].draw(context);
        }
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
function resetPaddel() {
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
    let ballIsOnStone = false;
    for(let e = 0; e < stones.length; e++) {
        if(stones[e].isHit(ball.x,ball.y)) {
            ballIsOnStone = true;
        }
        else {
            ballIsOnStone = false;
        }
    }

    if (ballIsAtBottom) {
        gameOver();
    }

    if (ballIsAtTop || ballIsOnPaddle) {
        ball.vSpeed = -ball.vSpeed;
    }

    if (ballIsAtRight || ballIsAtLeft) {
        ball.hSpeed = -ball.hSpeed;
    }
    if (ballIsOnStone) {
        ball.hSpeed = -ball.hSpeed;
        ball.vSpeed = -ball.vSpeed;
    }
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
