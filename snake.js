const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restartButton");
const highScoreElement = document.getElementById("highScore");
const gridSize = 20;
const fieldSize = 20;
let snake = [
    { x: 5, y: 5 }
];
let box = {
    x: 10,
    y: 10
};
let dx = 1;
let dy = 0;

let dnx = 0;
let dny = 0;
let inputLimiter = 0;

let score = 0;
let highScore = 0;
let speed = 200;
let game = null;
init();
function init() {
    document.addEventListener("keydown", handleKeydown);
    restartButton.addEventListener("click", restartGame);
    updateScore();
    startGame();
}
function handleKeydown(event) {
    if (inputLimiter === 0) {
        if (event.key === "ArrowUp" && dy === 0) {
            dx = 0;
            dy = -1;
            inputLimiter = 1;
        } else if (event.key === "ArrowDown" && dy === 0) {
            dx = 0;
            dy = 1;
            inputLimiter = 1;
        } else if (event.key === "ArrowLeft" && dx === 0) {
            dx = -1;
            dy = 0;
            inputLimiter = 1;
        } else if (event.key === "ArrowRight" && dx === 0) {
            dx = 1;
            dy = 0;
            inputLimiter = 1;
        }
    } else {
        if (event.key === "ArrowUp" && dy === 0) {
            dnx = 0;
            dny = -1;
            inputLimiter = 2;
        } else if (event.key === "ArrowDown" && dy === 0) {
            dnx = 0;
            dny = 1;
            inputLimiter = 2;
        } else if (event.key === "ArrowLeft" && dx === 0) {
            dnx = -1;
            dny = 0;
            inputLimiter = 2;
        } else if (event.key === "ArrowRight" && dx === 0) {
            dnx = 1;
            dny = 0;
            inputLimiter = 2;
        }
    }
}
function restartGame() {
    snake = [{ x: 5, y: 5 }];
    box = {
        x: 10,
        y: 10
    };
    box.x = Math.floor(Math.random() * fieldSize);
    box.y = Math.floor(Math.random() * fieldSize);
    dx = 1;
    dy = 0;
    score = 0;
    speed = 200;
    highScore = highScoreElement.textContent;
    updateScore();
    startGame();
    render();
}
function updateScore() {
    scoreElement.textContent = score;
}
function startGame() {
    clearInterval(game);
    game = setInterval(gameStep, speed);
}
function gameStep() {
    update();
    render();
}
function update() {
    let head = createNextHead();
    wrapPosition(head);
    if (collidesWithSnake(head)) {
        endGame();
        return;
    }
    if (headIsOnBox(head)) {
        score++;
        updateScore();
        placeNewBox();
        snake.unshift(head);
        increaseDifficulty();
        return;
    }
    snake.pop();
    snake.unshift(head);

    if (inputLimiter === 2) {
        dx = dnx;
        console.log("inputLimiter");
        dy = dny;
    }
    inputLimiter = 0;
}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let i = 0;

    // draw standart grid
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if ((i + j) % 2 == 0) {
                ctx.fillStyle = "#000";
            } else {
                ctx.fillStyle = "#222";
            }
            ctx.fillRect(
                i * gridSize,
                j * gridSize,
                gridSize,
                gridSize,
            );
            
        }
    }
    ctx.fillStyle = "#00ff00";
    while (i < snake.length) {

        ctx.fillRect(
            snake[i].x * gridSize,
            snake[i].y * gridSize,
            gridSize,
            gridSize
        );
        i++;

        if (ctx.fillStyle === "#00cc00") {
            ctx.fillStyle = "#00aa00";
        } else {
            ctx.fillStyle = "#00cc00";
        }
        //ctx.fillStyle = rgbToHex(HSVtoRGB(hue / 100, 0.5, 1).r, HSVtoRGB(hue / 100, 0.5, 1).g, HSVtoRGB(hue / 100, 0.5, 1).b);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(
        box.x * gridSize,
        box.y * gridSize,
        gridSize,
        gridSize
    );
}
function createNextHead() {
    return {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
}
function wrapPosition(head) {
    if (head.x < 0) {
        head.x = fieldSize - 1;
    } else if (head.x >= fieldSize) {
        head.x = 0;
    }
    if (head.y < 0) {
        head.y = fieldSize - 1;
    } else if (head.y >= fieldSize) {
        head.y = 0;
    }
}
function collidesWithSnake(head) {
    let i = 1;
    while (i < snake.length) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
        i++;
    }
    return false;
}
function headIsOnBox(head) {
    if (head.x === box.x && head.y === box.y) {
        return true;
    }
    return false;
}
function placeNewBox() {
    box.x = Math.floor(Math.random() * fieldSize);
    box.y = Math.floor(Math.random() * fieldSize);

    while (isSnakePosition(box.x, box.y)) {
        box.x = Math.floor(Math.random() * fieldSize);
        box.y = Math.floor(Math.random() * fieldSize);
    }
}
function increaseDifficulty() {
    if (speed > 50) {
        speed = speed - 10;
        startGame();
    }
}
function endGame() {
    clearInterval(game);
    game = null;
    alert("Game Over! Punkte: " + score);

    if (score > highScore) {
        alert("New High Score");
        highScoreElement.textContent = score;
    }
}

// Source - https://stackoverflow.com/q/17242144
// Posted by that_guy, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-13, License - CC BY-SA 4.0

// Source - https://stackoverflow.com/a/17243070
// Posted by Paul S., modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-13, License - CC BY-SA 3.0

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function isSnakePosition(x, y) {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) {
            return true;
        }
    }
    return false;
}