const express = require('express')
const morgan = require('morgan')
const path = require('path')
const planetsRouter = require('./routes/planets/planet.js')
const launchesRouter = require('./routes/launches/launches.router.js')
const cors = require('cors')
const app = express()
const apiRouter= require('./routes/api')

app.use(morgan('combined'))

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname,"..", 'public')))

app.use("/v1", apiRouter)

module.exports = app