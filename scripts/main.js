console.log("loaded main.js");

let test = [0, 1, 2];
set (test, 3, 10)
console.log(test);

init()

function init() {
    camera = {
        starId: 0,
        planetId: 0,
        zoom: 2,   // pixel per tile
        x: 0,
        y: 0
    }
    canvas = document.getElementById("2dcanvas")
    ctx = canvas.getContext("2d");

    map = generateMap(1);
}

renderPlanet();

