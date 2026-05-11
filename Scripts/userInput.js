let moveLeftOn = false;
let moveRightOn = false;
let moveUpOn = false;
let moveDownOn = false;

function userInputTick() {
    if (moveLeftOn) {
        moveLeft();
    }
    if (moveRightOn) {
        moveRight();
    }
    if (moveUpOn) {
        moveUp();
    }
    if (moveDownOn) {
        moveDown();
    }
}

function handleKeyPress(event) {
    if (event.key = "q") {
        zoomIn();
    }
    if (event.key = "e") {
        zoomOut();
    }
}

function handleKeydown(event) {
    if (event.key === "w") {
        moveUpOn = true;
    }
        if (event.key === "a") {
        moveLeftOn = true;
    }
        if (event.key === "s") {
        moveDownOn = true;
    }
        if (event.key === "d") {
        moveRightOn = true;
    }
}

function handleKeyUp(event) {
    if (event.key === "w") {
        moveUpOn = false;
    }
        if (event.key === "a") {
        moveLeftOn = false;
    }
        if (event.key === "s") {
        moveDownOn = false;
    }
        if (event.key === "d") {
        moveRightOn = false;
    }
}

function moveLeft() {
    camera.x -= 1;
    if (camera.x < 0) {
        camera.x = 0;
    }
}

function moveRight() {
    camera.x += 1;
}

function moveUp() {
    camera.y -= 1;
    if (camera.x < 0) {
        camera.y = 0;
    }
}

function moveDown() {
    camera.y += 1;
}

function zoomIn() {
    camera.zoom += 1;
}

function zoomOut() {
    camera.zoom -= 1;
}