const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema(
    {
        name: { type: String, required: true },
        maxHoursPerWeek: { type: Number, required: true },
        minHoursPerWeek: { type: Number, required: true },
        hoursWorkedCurrentPayPeriod: { type: Number, required: true },
        hourlyRate: { type: Number, required: true },
        qualifiedRoles: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('employees', Employee)
