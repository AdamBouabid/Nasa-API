const express = require('express')


const planetsRouter = require("./planets/planet");
const launchesRouter = require("./launches/launches.router");

const apiRouter = express.Router()
apiRouter.use("planets", planetsRouter)
apiRouter.use("launches", launchesRouter)

module.exports = apiRouter