const Reservation = require('../models/reservation-model')

createReservation = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a reservation',
        })
    }

    let start = new Date(body.start)
    let end = new Date(body.end)

    let guestName = body.guestName
    if(guestName.length == 0) {
        guestName = "Guest name not recorded"
    } 

    let reservationObj = {     
        "guestName": guestName,     
        "startDate": start,     
        "endDate": end,     
        "numGuests": body.numGuests,     
        "numDays": body.numDays,     
        "totalPayment": body.totalPayment,
        "pricePerDay": body.pricePerDay,
        "approved": false
    }
    const reservation = new Reservation(reservationObj)

    if (!reservation) {
        return res.status(400).json({ success: false, error: err })
    }
    reservation
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: reservation._id,
                message: 'Reservation created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Something went wrong!',
            })
        })
}

deleteReservation = async (req, res) => {
    await Reservation.findOneAndDelete({ _id: req.params.id }, (err, reservation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!reservation) {
            return res
                .status(404)
                .json({ success: false, error: `Reservation not found` })
        }

        return res.status(200).json({ success: true, data: reservation })
    }).catch(err => console.log(err))
}

getReservationById = async (req, res) => {
    await Reservation.findOne({ _id: req.params.id }, (err, reservation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!reservation) {
            return res
                .status(404)
                .json({ success: false, error: `Reservation not found` })
        }
        return res.status(200).json({ success: true, data: reservation })
    }).catch(err => console.log(err))
}

getReservations = async (req, res) => {
    await Reservation.find({}, (err, reservations) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!reservations.length) {
            return res
                .status(404)
                .json({ success: false, error: `Reservation not found` })
        }
        return res.status(200).json({ success: true, data: reservations })
    }).catch(err => console.log(err))
}

module.exports = {
    createReservation,
    deleteReservation,
    getReservations,
    getReservationById,
}
