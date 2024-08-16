const launchesDB = require('./launches.mongo')
const {axios} = require

const DEFAULT_FLIGHT_NUMBER = 100

const getAllLaunches = (skip, limit) => {
    return launchesDB.find({}, {'_id': 0, '__v': 0}).sort({flightNumber: 1}).skip(skip).limit(limit)
}

const saveLaunch = async (launch) => {
   await launchesDB.findOneAndUpdate({flightNumber: launch.flightNumber}, launch, {upsert: true})
}

const populateLaunches = async () => {
    const response = await axios.post('https://api.spacexdata.com/v4/launches/query', launch, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1
                    }
                },
                {
                    path:'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    })
    const launchDocs = response.data.docs
    for (const launchDoc of launchDocs ) {
        const customers = payloads.flatMap((payload) => {
            return paylaod['customers']
        })
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers
        }
        console.log(launch.rocket)
        await saveLaunch(launch)
    }
    if (response.status !==200) {
        console.log('problem downloading data')
        throw new Error('Download failed')
    }
}

const loadLauncheData = async () => {
    console.log("Downloading Launch Data")
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'

    })
    if (firstLaunch) {
        console.log('Launch data already loaded')

    }else {
        await populateLaunches()
    }
}

const findLaunch = async (filter) => {
    return await launchesDB.findOne(filter)
}

const scheduleNewLaunch = async (launch) => {
    const newFlightNumber = await getLatestFlightNumber() + 1
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customer: ['Zero to Master', 'NASA'],
        flightNumber: newFlightNumber})
    await saveLaunch(newLaunch)
}

const deleteLaunch = async (launchId) => {
    const aborted =  await launchesDB.updateOne({
        flightNumber: launchId
    }, {upcoming: false, success: false})

    return aborted.ok === 1 && aborted.nModifed === 1

}
const existLaunchId = async (launchId) => {
    return findLaunch({
        flightNumber: launchId
    });
}
const getLatestFlightNumber = async () => {
    const latestLaunch = await launchesDB.findOne().sort('-flightNumber')
    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER
    }
    return await latestLaunch.flightNumber
}

module.exports = {getAllLaunches,deleteLaunch,existLaunchId,scheduleNewLaunch,loadLauncheData}