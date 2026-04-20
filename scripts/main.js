console.log("loaded main.js");
init()

function init() {
    camera = {
        zoom: 50,   // pixel per tile
        x: 0,
        y: 0
    }
    canvas = document.getElementById("2dcanvas")
    ctx = canvas.getContext("2d");

    map = generateMap(1);
}

let whiteNoise = generateWhiteNoise(1000, 1);
render(whiteNoise);