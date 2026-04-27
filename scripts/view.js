console.log("loaded view.js")

function render() {

}

function renderPlanet() {
    console.log("rendering Planet");
    let planet = map.starSystems[camera.starId].planets[camera.planetId];
    console.log(planet);

    // draw ground
    for (let i = 0; i < planet.heightMap.length; i++) {
        for (let j = 0; j < planet.heightMap[i].length; j++) {
            // get pixel color
            let index = planet.heightColorMap.length - 1 - Math.floor(planet.heightMap[i][j] * planet.heightColorMap.length);

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

    // draw ores

    for (let i = 0; i < planet.oreMaps.length; i++) {
        for (let j = 0; j < planet.oreMaps[i].length; j++) {
            let image = new Image();
            let ore = planet.oreMaps[i][j];
            image.src = ore.textureFile;

            image.onload = function () {
            ctx.drawImage(
                image,
                ore.x * camera.zoom - camera.x * camera.zoom,
                ore.y * camera.zoom - camera.y * camera.zoom,
                camera.zoom,
                camera.zoom
            )};
        }
    }
}