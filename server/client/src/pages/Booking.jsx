import React from 'react'
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import styled from 'styled-components'
import {ReservationInformation} from '../components'

import Button from 'react-bootstrap/Button';
import api from '../api';

const moment = extendMoment(originalMoment);

const BookingBox = styled.div`
    margin: 0;
    width: 100%;
    margin: auto;
    max-width: 550px;
    text-align: center;
    border-radius: 25px;
    border: 1px solid #dadce0;
    padding-top: 25px;
    padding-bottom: 25px;
`

class Booking extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    const today = moment();

    let defaultNumGuests = 1
    let dateRange = moment.range(today.clone(), today.clone().add(3, "days"))
    let numDays = dateRange.end.diff(dateRange.start, 'days')
    let pricePerDay = 700
    // TODO make the daily price a database call
    let totalPayment = defaultNumGuests * numDays * pricePerDay
    this.state = {
      numGuests: defaultNumGuests,
      dateRange: dateRange,
      numDays: numDays,
      totalPayment: totalPayment,
      pricePerDay: pricePerDay,
      guestName:''
    };
  }

  handleSubmitReservation  = async () => {
    if(this.state.guestName.length === 0){
      window.alert(`Please enter a name for the reservation`)
      return
    }
    const {guestName, numGuests, dateRange, numDays, totalPayment, pricePerDay} = this.state
    let start = dateRange.start
    let end = dateRange.end
    const payload = { guestName, numGuests, start, end, numDays, totalPayment, pricePerDay}
    await api.insertReservation(payload)
    .then(res => {
      window.location.href = `/bookingComplete`
    })
    .catch(error => {
      console.log(error.response.data.message)
      window.location.href = `/bookingFailed`
    })
  }

  hoistState = (stateValue) => {
    this.setState(stateValue)
  }


  render() {
    console.log(this.state)
    return (
      <BookingBox>
        <ReservationInformation state={this.state} hoistState={this.hoistState}/>
        <div>
          <Button onClick={this.handleSubmitReservation}>Submit Reservation</Button>
        </div>
      </BookingBox>
    );
  }
}

export default Booking