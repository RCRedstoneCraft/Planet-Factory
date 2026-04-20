console.log("loaded generator.js");

function seededRandom(seed) {
    let state = seed;
    return function () {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

function generateWhiteNoise(size, seed) {
    let rng = seededRandom(seed);

    let noise = new Array(size);
    for (let i = 0; i < noise.length; i++) {
        noise[i] = new Array(size);
        for (let j = 0; j < noise[i].length; j++) {
            noise[i][j] = rng();
        }
    }
    return noise;
}