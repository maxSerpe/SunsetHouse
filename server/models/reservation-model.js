const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Reservation = new Schema(
    {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        instagram: { type: String, required: true },
        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },
        numberBeds: { type: Number, required: true },
        numDays: { type: Number, required: true },
        totalPayment: { type: Number, required: true },
        pricePerDay: { type: Number, required: true },
        approved: { type: Boolean, required: true },
        phoneNumber: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('reservation', Reservation)
