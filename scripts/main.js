console.log("loaded main.js");
let game = null;

init()

function init() {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keypress", handleKeyPress)
    camera = {
        starId: 0,
        planetId: 1,
        zoom: 4,   // pixel per tile
        x: 0,
        y: 0
    }

    map = generateMap(1);

    clearInterval(game);
    game = setInterval(mainLoop, 100);
}

function mainLoop() {
    let time = Date.now();
    userInputTick();
    renderPlanet();
    console.log("world tick took: " + (Date.now() - time) + " ms, tps: " + (1000 / (Date.now() - time)));
}   

function stop() {
    console.log("stopping game");
    clearInterval(game);
}