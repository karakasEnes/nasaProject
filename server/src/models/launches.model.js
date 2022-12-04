const launchesDB = require('./launches.schema');
const planets = require('./planet.schema');

const DEFAULT_FLIGHTNUMBER = -1;

const launch = {
  flightNumber: DEFAULT_FLIGHTNUMBER,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort('-flightNumber');

  if (!latestLaunch) {
    return DEFAULT_FLIGHTNUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDB.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });

  if (!planet) {
    throw new Error('No matching planet in Planet Collection!');
  }
  await launchesDB.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function existsLaunchWithId(launchId) {
  return await launchesDB.findOne({
    flightNumber: launchId,
  });
}

async function addNewLaunch(launch) {
  const latestFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero To Mastery', 'NASA'],
    flightNumber: latestFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDB.updateOne(
    {
      flightNumber: launchId,
    },
    {
      success: false,
      upcoming: false,
    }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
