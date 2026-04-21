console.log("loaded generators/terrain.js");

const starCount = 64;
const planetCount = 3;
const mapSize = 100;        // ly (light years)
const planetSize = 100;    // gs (grid Spaces)
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
        heightMap: heightMap = generateWhiteNoiseRng(planetSize, rng),                                                                   // TODO
        oreMap: null,                                                                                                             // TODO
        starDistance: 0,
        windPower: rng() * 2,  // Max 200%
        solarPower: 0,
    }
        
    if (planetId === 1) {
        planet.starDistance = rng() * (planetDistances1.max - planetDistances1.min) + planetDistances1.min
    }
    if (planetId === 2) {
        planet.starDistance = rng() * (planetDistances2.max - planetDistances2.min) + planetDistances2.min
    }
    if (planetId === 3) {
        planet.starDistance = rng() * (planetDistances3.max - planetDistances3.min) + planetDistances3.min
    }
    planet.solarPower = (1 / planet.starDistance) + (rng() * 0.5 - 0.25);
    return planet;
}