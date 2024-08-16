const http = require('http')
const {mongoose} = require('mongoose')

const {mongoConnection} = require('./utils/index')

const {loadPlanetsData} = require('./models/planets.model')

const {loadLaunchData} = require('./models/launches.model')

const PORT = process.env.PORT || 5000

const app = require('./app.js')

const server = http.createServer(app)

const startServer = async () => {
    await mongoConnection()
    await loadPlanetsData()
    await loadLaunchData()

    server.listen(PORT, () => console.log(PORT))

}

startServer()


