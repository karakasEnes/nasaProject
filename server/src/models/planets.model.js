const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

function isHabitable(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

function loadPlanetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'keplerData.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', (data) => {
        if (isHabitable(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        // console.log(habitablePlanets.map((planet) => planet['kepler_name']));
        console.log(`${habitablePlanets.length} total planets found!`);
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = {
  getAllPlanets,
  loadPlanetData,
};
