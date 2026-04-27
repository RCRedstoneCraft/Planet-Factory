console.log("loaded view.js")

function render() {

}

function renderPlanet() {
    console.log("rendering Planet");
    let planet = map.starSystems[camera.starId].planets[camera.planetId];


    for (let i = 0; i < planet.heightMap.length; i++) {
        for (let j = 0; j < planet.heightMap[i].length; j++) {
            // get pixel color
            let index = Math.floor(planet.heightMap[i][j] * planet.heightColorMap.length);

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
/*
reader.onloadend = function(e)
{
    var img = new Image();
    var ctx = canvas.getContext("2d");
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    img.onload = function()
    {
        var ratio = 1;

        if(img.width > maxWidth)
            ratio = maxWidth / img.width;
        else if(img.height > maxHeight)
            ratio = maxHeight / img.height;

        canvasCopy.width = img.width;
        canvasCopy.height = img.height;
        copyContext.drawImage(img, 0, 0);

        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
    };

    img.src = reader.result;
}/*