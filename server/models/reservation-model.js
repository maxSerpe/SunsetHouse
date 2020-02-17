const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Reservation = new Schema(
    {
        guestName: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        numGuests: { type: Number, required: true },
        numDays: { type: Number, required: true },
        totalPayment: { type: Number, required: true },
        pricePerDay: { type: Number, required: true },
        approved: { type: Boolean, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('reservation', Reservation)
