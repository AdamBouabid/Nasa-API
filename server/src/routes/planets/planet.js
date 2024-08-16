const express = require('express');

const httpGetAllPlanets = require('./planetsController.js');

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets)

module.exports = planetsRouter