console.log("loaded generators/random.js");

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

function generateWhiteNoise(size) {
    let noise = new Array(size);
    for (let i = 0; i < noise.length; i++) {
        noise[i] = new Array(size);
        for (let j = 0; j < noise[i].length; j++) {
            noise[i][j] = Math.random();
        }
    }
    return noise;
}

function generateWhiteNoiseRng(size, rng) {
    let noise = new Array(size);
    for (let i = 0; i < noise.length; i++) {
        noise[i] = new Array(size);
        for (let j = 0; j < noise[i].length; j++) {
            noise[i][j] = rng();
        }
    }
    return noise;
}

function generatePerlin2D(size, rng, median = 0.5, scaleModifyer = 20) {
    const perm = new Uint16Array(512);
    const gradX = new Float32Array(512);
    const gradY = new Float32Array(512);

    const p = new Uint16Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;

    for (let i = 255; i > 0; i--) {
        const j = (rng() * (i + 1)) | 0;
        const tmp = p[i];
        p[i] = p[j];
        p[j] = tmp;
    }

    for (let i = 0; i < 512; i++) {
        const v = p[i & 255];
        perm[i] = v;

        const angle = rng() * Math.PI * 2;
        gradX[i] = Math.cos(angle);
        gradY[i] = Math.sin(angle);
    }

    function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    function lerp(a, b, t) {
        return a + t * (b - a);
    }

    function dot(ix, iy, x, y) {
        const gIndex = perm[(ix + perm[iy & 255]) & 255];
        return gradX[gIndex] * x + gradY[gIndex] * y;
    }

    // Median remap (fast, branchless-ish shaping)
    function applyMedian(v) {
        if (median === 0.5) return v;

        if (v < 0.5) {
            return (v / 0.5) * median;
        } else {
            return median + ((v - 0.5) / 0.5) * (1 - median);
        }
    }

    const result = new Array(size);
    for (let x = 0; x < size; x++) {
        result[x] = new Float32Array(size);
    }

    const scale = scaleModifyer / size;

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const fx = x * scale;
            const fy = y * scale;

            const x0 = fx | 0;
            const y0 = fy | 0;
            const x1 = x0 + 1;
            const y1 = y0 + 1;

            const sx = fade(fx - x0);
            const sy = fade(fy - y0);

            const n00 = dot(x0, y0, fx - x0, fy - y0);
            const n10 = dot(x1, y0, fx - x1, fy - y0);
            const n01 = dot(x0, y1, fx - x0, fy - y1);
            const n11 = dot(x1, y1, fx - x1, fy - y1);

            const ix0 = lerp(n00, n10, sx);
            const ix1 = lerp(n01, n11, sx);
            let value = lerp(ix0, ix1, sy);

            // Normalize to [0,1]
            value = value * 0.5 + 0.5;

            // Apply median shift
            value = applyMedian(value);

            result[x][y] = value;
        }
    }

    return result;
}