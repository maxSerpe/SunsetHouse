const Reservation = require('../models/reservation-model')

createReservation = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a reservation',
        })
    }
    let checkInDate = new Date(body.checkInDate)
    let checkOutDate = new Date(body.checkOutDate)

    // TODO need to decide where we are calculating numDays, right now considering 
    // either here in contorler, or leave it up to the react componenet, seeing as it 
    // might need that information as it is to display/calculate prices
    
    let reservationObj = {     
        "fullName": body.fullName,     
        "checkInDate": checkInDate,     
        "checkOutDate": checkOutDate,     
        "numberBeds": body.numberBeds,   
        "instagram": body.instagram,
        "email": body.email,  
        "address": body.address,  
        "phoneNumber":body.phoneNumber,
        "numDays": 0,     
        "totalPayment": 0,
        "pricePerDay": 0,
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

updateReservationById = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a reservation',
        })
    }
    await Reservation.findOne({ _id: body._id }, async (err, reservation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!reservation) {
            return res
                .status(404)
                .json({ success: false, error: `Reservation not found` })
        }
        let checkInDate = new Date(body.checkInDate)
        let checkOutDate = new Date(body.checkOutDate)

        reservation.fullName =  body.fullName     
        reservation.checkInDate =  checkInDate     
        reservation.checkOutDate =  checkOutDate     
        reservation.numberBeds =  body.numberBeds   
        reservation.instagram =  body.instagram
        reservation.email =  body.email  
        reservation.address =  body.address  
        reservation.phoneNumberbody = body.phoneNumber,

        await reservation.save()
        .then(() => {
            return res.status(200).json({ success: true})
          })
          .catch(error => {
            return res.status(400).json({ success: false, error: err })
          })
   }).catch(err => console.log(err))
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
getApprovedReservations = async (req, res) => {
    await Reservation.find({"approved": true}, (err, reservations) => {
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
    getApprovedReservations,
    updateReservationById
}
