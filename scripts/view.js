console.log("loaded view.js")

function render() {

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