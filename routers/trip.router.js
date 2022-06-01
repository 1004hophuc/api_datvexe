const express = require('express');
const { createTrip, getListTrip, getTripDetail, deleteTrip, updateTrip } = require('../controllers/trip.controllers');
const { authenticate } = require('../middlewares/auth/authenticate');
const { authorize } = require('../middlewares/auth/authorize');
const tripRouter = express.Router();

tripRouter.post('/', authenticate, authorize(["ADMIN"]), createTrip);
tripRouter.get('/', getListTrip);
tripRouter.get('/:id', getTripDetail);
tripRouter.delete('/:id', authenticate, authorize(["ADMIN"]), deleteTrip);
tripRouter.put('/:id', authenticate, authorize(["ADMIN"]), updateTrip)

module.exports = {
    tripRouter
}