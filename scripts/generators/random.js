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

// TODO: FIX THISSSSS
function generateValueNoise(size, rng, octaves = 4, persistence = 0.5) {
    const baseNoise = generateWhiteNoiseRng(size, rng);

    function interpolate(a, b, t) {
        // smoothstep
        t = t * t * (3 - 2 * t);
        return a * (1 - t) + b * t;
    }

    function generateSmoothNoise(baseNoise, octave) {
        const smoothNoise = new Array(size);
        const samplePeriod = 1 << octave;
        const sampleFrequency = 1 / samplePeriod;

        for (let i = 0; i < size; i++) {
            set(smoothNoise, i, new Array(size));

            const sample_i0 = Math.floor(i / samplePeriod) * samplePeriod;
            const sample_i1 = sample_i0 + samplePeriod; // no modulo!

            const horizontalBlend = (i - sample_i0) * sampleFrequency;

            for (let j = 0; j < size; j++) {
                const sample_j0 = Math.floor(j / samplePeriod) * samplePeriod;
                const sample_j1 = sample_j0 + samplePeriod; // no modulo!

                const verticalBlend = (j - sample_j0) * sampleFrequency;

                const top = interpolate(
                    get(get(baseNoise, sample_i0), sample_j0),
                    get(get(baseNoise, sample_i1), sample_j0),
                    horizontalBlend
                );

                const bottom = interpolate(
                    get(get(baseNoise, sample_i0), sample_j1),
                    get(get(baseNoise, sample_i1), sample_j1),
                    horizontalBlend
                );

                set(
                    get(smoothNoise, i),
                    j,
                    interpolate(top, bottom, verticalBlend)
                );
            }
        }

        return smoothNoise;
    }

    const smoothNoiseList = [];
    for (let i = 0; i < octaves; i++) {
        smoothNoiseList.push(generateSmoothNoise(baseNoise, i));
    }

    const valueNoise = new Array(size);
    for (let i = 0; i < size; i++) {
        set(valueNoise, i, new Array(size));
        for (let j = 0; j < size; j++) {
            set(get(valueNoise, i), j, 0);
        }
    }

    let amplitude = 1.0;
    let totalAmplitude = 0.0;

    for (let octave = octaves - 1; octave >= 0; octave--) {
        amplitude *= persistence;
        totalAmplitude += amplitude;

        const smoothNoise = smoothNoiseList[octave];

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const current = get(get(valueNoise, i), j);
                const added = get(get(smoothNoise, i), j) * amplitude;
                set(get(valueNoise, i), j, current + added);
            }
        }
    }

    // Normalize
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const v = get(get(valueNoise, i), j) / totalAmplitude;
            set(get(valueNoise, i), j, v);
        }
    }

    return valueNoise;
}