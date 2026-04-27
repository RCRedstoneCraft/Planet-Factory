console.log("loaded main.js");

init()

function init() {
    camera = {
        starId: 0,
        planetId: 1,
        zoom: 4,   // pixel per tile
        x: 0,
        y: 0
    }

    map = generateMap(1);
    renderPlanet();
}