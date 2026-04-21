console.log("loaded view.js")

let canvas = null;
let ctx = null;

function render(whiteNoise) {
    for (let i = 0; i < whiteNoise.length; i++) {
        for (let j = 0; j < whiteNoise[i].length; j++) {
            if (whiteNoise[i][j] <= 0.5) {
                ctx.fillStyle = "#000";
            } else {
                ctx.fillStyle = "#fff";
            }

            ctx.fillRect(
                i * camera.zoom + camera.x * camera.zoom,
                j * camera.zoom + camera.y * camera.zoom,
                camera.zoom,
                camera.zoom
            )
        }
    }
}

function renderPlanet() {
    console.log("rendering Planet");
    let planet = map.starSystems[camera.starId].planets[camera.planetId];
    

    console.log(map)
    console.log(planet);
    console.log(planet.heightMap);
    console.log(camera);

    //let groundMap = planet.heightMap

    for (let i = 0; i < groundMap.length; i++) {
        for (let j = 0; j < groundMap[i].length; j++) {
            // get pixel color
            let index = Math.round(groundMap[i][j] * 100);

            ctx.fillStyle = heightMap[index];
            ctx.fillRect(
                i * camera.zoom + camera.x * camera.zoom,
                j * camera.zoom + camera.y * camera.zoom,
                camera.zoom,
                camera.zoom
            )
        }
    }
}

function get(arr, index) {
    if (index < 0) {
        index += arr.length;
    }
    if (index >= arr.length) {
        index -= arr.length;
    }
    return arr[index];
}