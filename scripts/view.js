console.log("loaded view.js")
let image = new Image();
image.src = "Textures/Terrain/Planets/Ores/Iron.png";
function render() {

}

function renderPlanet() {
    console.log("rendering Planet");
    let planet = map.starSystems[camera.starId].planets[camera.planetId];
    console.log(planet);

    let tilesX = canvas.width / camera.zoom;
    let tilesY = canvas.height / camera.zoom;

    // draw ground
    for (let i = 0; i < tilesX; i++) {
        for (let j = 0; j < tilesY; j++) {
            let tileX = camera.x + i;
            let tileY = camera.y + j;
            // get pixel color
            let colorMapIndex = planet.heightColorMap.length - 1 - Math.floor(planet.heightMap[tileX][tileY] * planet.heightColorMap.length);
            //console.log(heightColorMapPlanet1[index]);
            ctx.fillStyle = planet.heightColorMap[colorMapIndex];
            ctx.fillRect(
                i * camera.zoom,
                j * camera.zoom,
                camera.zoom,
                camera.zoom
            )
        }
    }
    let count = 0;
    for (let type = 0; type < planet.oreMaps.length; type++) {
        if (planet.oreMaps[type].length > 0) {
            //let image = new Image();
            //image.src = planet.oreMaps[type][0].textureFile;
            //image.onload = function () 
                for (let i = 0; i < planet.oreMaps[type].length; i++) {
                    console.log()
                    let ore = planet.oreMaps[type][i];
                    if (ore.x > camera.x && ore.x < camera.x + tilesX && ore.y > camera.y && ore.y < camera.y + tilesY) {
                        count++;

                        ctx.drawImage(
                            image,
                            (ore.x - camera.x) * camera.zoom,
                            (ore.y - camera.y) * camera.zoom,
                            camera.zoom,
                            camera.zoom
                        )

                    }
                }
        }
        

    }
    console.log(count);

    // draw ores
    /*
    for (let i = 0; i < tilesX; i++) {
        for (let j = 0; j < tilesY; j++) {
            let tileX = camera.x + i;
            let tileY = camera.y + j;

            let image = new Image();
            let ore = planet.oreMaps[tileX][tileY];
            image.src = ore.textureFile;

            image.onload = function () {
            ctx.drawImage(
                image,
                i * camera.zoom,
                j * camera.zoom,
                camera.zoom,
                camera.zoom
            )};
        }
    }*/
}