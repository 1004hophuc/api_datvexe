// import thư viện express
const express = require('express');

const { createStation, getListStation, getStationDetail, updateStation, deleteStation } = require('../controllers/station.controller');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const { CheckExist } = require('../middlewares/validate/checkExist');
const { Station } = require('../models');

// Tạo model router
const stationRouter = express.Router();

stationRouter.post('/', authenticate, authorize(["ADMIN"]), createStation);
stationRouter.get('/', getListStation);
stationRouter.get('/:id', getStationDetail);
stationRouter.put('/:id', CheckExist(Station), updateStation);
stationRouter.delete('/:id', authenticate, authorize(["ADMIN"]), CheckExist(Station), deleteStation);

module.exports = {
    stationRouter,
}

