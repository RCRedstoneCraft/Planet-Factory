console.log("loaded generators/terrain.js");

const starCount = 16;
const planetCount = 3;
const mapSize = 100;        // ly (light years)
const planetSize = 1000;    // gs (grid Spaces)
const starTypes = 1

// in au (Astronomical units)
const planetDistances1 = {
    min: 0.3,
    max: 0.8
}

const planetDistances2 = {
    min: 1,
    max: 1.3
}

const planetDistances3 = {
    min: 1.7,
    max: 2.5
}

function generateMap (seed) {
    console.log("Generating Map With seed: " + seed);
    let rng = seededRandom(seed);
    let map = {
        starSystems: new Array(starCount),
    }

    for (let i = 0; i < map.starSystems.length; i++) {
        map.starSystems[i] = generateStarSystem(rng, i);
    }
    console.log("Map generation done");
    return map;
}

function generateStarSystem(rng, starId) {
    console.log("\tGenerating Star System (ID: " + starId + ")");

    let starSystem = {
        planets: new Array(planetCount),
        x: rng() * mapSize,
        y: rng() * mapSize,
        starType: Math.floor(rng() * starTypes)
    }
    for (let i = 0; i < starSystem.planets.length; i++) {
        starSystem.planets[i] = generatePlanet(rng, i);
    }
    return starSystem;
}

function generatePlanet(rng, planetId) {
    console.log("\t\tGenerating Planet (ID: " + planetId + ")");

    let planet = {
        heightMap: heightMap = null,//generateWhiteNoiseRng(planetSize, rng),                                                                   // TODO
        heightColorMap: null,
        oreMaps: [],                                                                                                                             // TODO
        starDistance: 0,
        windPower: rng() * 2,  // Max 200%
        solarPower: 0,
    }
        
    if (planetId === 0) {
        planet.starDistance = rng() * (planetDistances1.max - planetDistances1.min) + planetDistances1.min;
        planet.heightColorMap = heightColorMapPlanet0;
        planet.heightMap = generatePerlin2D(planetSize, rng, 0.8, 15)
    }
    if (planetId === 1) {
        planet.starDistance = rng() * (planetDistances2.max - planetDistances2.min) + planetDistances2.min;
        planet.heightColorMap = heightColorMapPlanet1;
        planet.heightMap = generatePerlin2D(planetSize, rng, 0.7, 10)
        planet.oreMaps.push(generateOreMap(rng, "Iron", 0.5, 10, 0.7, 5000))
    }
    if (planetId === 2) {
        planet.starDistance = rng() * (planetDistances3.max - planetDistances3.min) + planetDistances3.min;
        planet.heightColorMap = heightColorMapPlanet2;
        planet.heightMap = generatePerlin2D(planetSize, rng, 0.5, 7)
    }
    planet.solarPower = (1 / planet.starDistance) + (rng() * 0.5 - 0.25);
    return planet;
}

function generateOreMap(rng, oreType, median, scaleModifier, oreStartValue, oreCount) {
    console.log("\t\t\tGenerating Ores of type: " + oreType);
    let map = generatePerlin2D(planetSize, rng, median, scaleModifier);
    let oreMap = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] >= oreStartValue) {
                oreMap.push({
                    type: oreType,
                    x: i,
                    y: j,
                    oresLeft: oreCount,
                    depleted: false,
                    textureFile: "Textures/Terrain/Planets/Ores/" + oreType + ".png"
                })
            }
        }
    }
    return oreMap;
}