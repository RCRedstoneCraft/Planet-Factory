console.log("loaded view.js")

let camera = null;

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