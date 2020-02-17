const express = require('express')

const ReservationCtrl = require('../controllers/reservation-ctrl')

const router = express.Router()

router.post('/reservation', ReservationCtrl.createReservation)
router.put('/reservation/:id', ReservationCtrl.deleteReservation)
router.delete('/reservation/:id', ReservationCtrl.deleteReservation)
router.get('/reservation/:id', ReservationCtrl.getReservationById)
router.get('/reservations', ReservationCtrl.getReservations)

module.exports = router