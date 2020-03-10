import React from 'react'
import "react-daterange-picker/dist/css/react-calendar.css";
import {ReservationForm} from '../components'



class Booking extends React.Component {
  constructor(props, context) {
    super(props, context);
    

    let defaultNumGuests = 1
    let dateRange = {}
    let numDays = 0
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

  render() {
    return (
        <ReservationForm formType="submit" data={{}} title="BOOKING INQUIRY"/> 
    );
  }
}

export default Booking