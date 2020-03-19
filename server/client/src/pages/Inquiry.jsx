import React from 'react'
import "react-daterange-picker/dist/css/react-calendar.css";
import {ReservationForm} from '../components'


const faqDivStyle = {
  fontSize: '.80em',
  fontWeight:"300"
}
const faqTitleDivStyle = {
  paddingTop: "20px",
  paddingBottom: "25px",
  fontWeight:"460"
}

class Inquiry extends React.Component {
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
      <div>
        <ReservationForm formType="submit" data={{}} title="BOOKING INQUIRY"/> 
        <div style={faqTitleDivStyle}>
          FAQ
        </div>
        <div style={faqDivStyle}>
          SUNSET HOUSE IS A DORM STYLE HOSTEL 
        </div>
        <div style={faqDivStyle}>
          WE HAVE ONE ROOM WITH TWELVE BEDS AVAILABLE (6 BUNK BEDS)
        </div>
        <div style={faqDivStyle}>
          YES, YOU CAN RENT THE WHOLE ROOM 
        </div>
        <div style={faqDivStyle}>
          YES WE HAVE SURFBOARD RACKS
        </div>
        <div style={faqDivStyle}>
          EACH BED HAS ITS OWN CABINET AND LAMP 
        </div>
        <div style={faqDivStyle}>
          THE ROOM IS WELL VENTILATED BY FANS AND THE OCEAN BREEZE 
        </div>
        <div style={faqDivStyle}>
          CHECK IN IS AT 2PM
        </div>
        <div style={faqDivStyle}>
          CHECK OUT IS AT 12NOON
        </div>
        <div style={faqDivStyle}>
          WE HAVE TWO COMMON TOILET AND BATH
        </div>
        <div style={faqDivStyle}>
          BODY SOAP AND SHAMPOO IS PROVIDED
        </div>
        <div style={faqDivStyle}>
          WE HAVE A DESIGNATED SMOKING AREA
        </div>
        <div style={faqDivStyle}>
          ROOFDECK AND BALCONY AVAILABLE
        </div>
        <div style={faqDivStyle}>
          HOT AND COLD DRINKING WATER IS ALWAYS FREE
        </div>
        <div style={faqDivStyle}>
          TOWELS AND LOCKS ARE AVAILABLE UPON REQUEST 
        </div>
        <div style={faqDivStyle}>
          COOKING IS NOT ALLOWED
        </div>
        <div style={faqDivStyle}>
          WIFI NOT AVAILABLE (JOKE)
        </div>
        
         
      </div>
    );
  }
}

export default Inquiry