import React, { Component } from 'react'
import api from '../api';
import {ReservationInformation} from '../components'

import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            guestName: '',
            dateRange:'', 
            numGuests: '', 
            numDays: '', 
            totalPayment: '', 
            pricePerDay: '',
            approved: '',
            isLoaded: ''

        }
    }

    componentDidMount = async () => {
        const id = this.state.id
        const reservation = await api.getReservationById(id)
        console.log(reservation.data.data)
        let dateRangeVar = moment.range(moment(reservation.data.data.startDate), moment(reservation.data.data.endDate))
        this.setState({
            guestName: reservation.data.data.guestName,
            numGuests: reservation.data.data.numGuests,
            numDays: reservation.data.data.numDays,
            totalPayment: reservation.data.data.totalPayment,
            pricePerDay: reservation.data.data.pricePerDay,
            dateRange: dateRangeVar,
            approved: reservation.data.data.approved,
            isLoaded: true
        })
    }
    hoistState = (stateValue) => {
        console.log('lifting state')
        console.log(stateValue)
    }
    showIfLoaded = (isLoaded) => {
        const today = moment();
        console.log('showing if loaded')
        let dateRange = moment.range(today.clone(), today.clone().add(3, "days"))
        if (isLoaded) {
            return <ReservationInformation state={{
                numGuests: this.state.numGuests, 
                dateRange: this.state.dateRange,
                numDays: this.state.numDays,
                totalPayment: this.state.totalPayment,
                pricePerDay: this.state.pricePerDay,
                guestName: this.state.guestName,
                approved: this.state.approved,
            }} 
            hoistState={this.hoistState}/> 
        }
        else {
            return <div>waiting...</div>
        }
    }
    render() {
        console.log("rendering!")
        console.log(this.state)
        return (
            <div>
                {this.showIfLoaded(this.state.isLoaded)}
            </div>
        )
    }
}

export default Reservation