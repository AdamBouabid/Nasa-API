const {getAllLaunches, scheduleNewLaunch,existLaunchId, deleteLaunch} = require('../../models/launches.model')
const {getPagination} = require('../../utils/query')

const httpGetAllLaunches = async (req, res) => {
    const {skip, limit} = getPagination(req.query)
    const launches = await getAllLaunches(skip, limit)
    return res.status(200).json(await getAllLaunches(launches))
}
const httpAddNewLaunch = async (req, res) => {
    const launch = req.body
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({error: 'Missing required parameters'})
    }
    if(isNaN(launch.launchDate)) {
        return res.status(400).json({error: 'Invalid launch date'})
    }
    launch.launchDate = new Date(launch.launchDate)
    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}

const httpDeleteLaunch = async (req, res) => {
    const launchId = Number(req.params.id)
    const existLaunch = await existLaunchId(launchId)
    if (!existLaunch){
        return res.status(404).json({error: 'Launch id not found'})
    }
    const aborted = deleteLaunch(Number(launchId))

    if(!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted'
        })
    }
    return res.status(200).json({
        ok: true
    })
}

module.exports = {httpGetAllLaunches, httpAddNewLaunch, httpDeleteLaunch}