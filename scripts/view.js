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
    

    console.log("map");
    console.log(map);
    console.log("planet");
    console.log(planet);
    console.log("planet.heightMap");
    console.log(planet.heightMap);
    console.log("camera");
    console.log(camera);


    for (let i = 0; i < planet.heightMap.length; i++) {
        for (let j = 0; j < planet.heightMap[i].length; j++) {
            // get pixel color
            let index = Math.floor(planet.heightMap[i][j] * 100);

            //console.log(heightColorMapPlanet1[index]);
            ctx.fillStyle = planet.heightColorMap[index];
            ctx.fillRect(
                i * camera.zoom - camera.x * camera.zoom,
                j * camera.zoom - camera.y * camera.zoom,
                camera.zoom,
                camera.zoom
            )
        }
    }
}