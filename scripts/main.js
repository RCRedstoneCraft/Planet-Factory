console.log("loaded main.js");

const canvas = document.getElementById("2dcanvas")
const ctx = canvas.getContext("2d");
const planetSize = 1000;

let whiteNoise = generateWhiteNoise(720, 5);
render();


function render() {
    for (let i = 0; i < whiteNoise.length; i++) {
        for (let j = 0; j < whiteNoise[i].length; j++) {
            if (whiteNoise[i][j] <= 0.5) {
                ctx.fillStyle = "#000";
            } else {
                ctx.fillStyle = "#fff";
            }

            ctx.fillRect(
                i,
                j,
                1,
                1
            )
        }
    }
}