const axios = require('axios');
const launchesDB = require('./launches.schema');
const planets = require('./planet.schema');

const SPACEX_API_URL = 'https://api.spacexdata.com';
const DEFAULT_FLIGHTNUMBER = -1;

const launch = {
  flightNumber: DEFAULT_FLIGHTNUMBER, //flight_number
  mission: 'Kepler Exploration X', //name
  rocket: 'Explorer IS1', //rocket.name
  launchDate: new Date('December 27, 2030'), //date_local
  target: 'Kepler-442 b', // not applicable
  customer: ['ZTM', 'NASA'], //payloads (as array objID) , payload.customers.
  upcoming: true, //upcoming
  success: true, //success
};

async function populateLaunches() {
  const response = await axios.post(
    `${SPACEX_API_URL}/v5/launches/query`,
    {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: 'rocket',
            select: {
              name: 1,
            },
          },

          {
            path: 'payloads',
            select: {
              customers: 1,
            },
          },
        ],
      },
    },
    {
      headers: { 'Accept-Encoding': 'text/html; charset=UTF-8' },
    }
  );

  const launchDocs = response.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc.payloads;
    const customers = payloads.flatMap((payload) => payload.customers);

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      customer: customers,
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
    };

    await saveLaunch(launch);
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });

  if (firstLaunch) {
    console.log('First Launch Exists In DB');
  } else {
    console.log('Downloading Launches Data...');
    await populateLaunches();
  }
}

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

async function findLaunch(queryFilter) {
  return await launchesDB.findOne(queryFilter);
}

async function existsLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });

  if (!planet) {
    throw new Error('No matching planet in Planet Collection!');
  }

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
  loadLaunchData,
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
