import React from 'react'
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import './Booking.css';
import styled from 'styled-components'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
const SelectionValueBox = styled.div`
    min-height: 30px;   
`
const TotalPaymentBox = styled.div`
    min-height: 30px;  
    text-align: left;
    padding-left: 50px; 
    line-height: 40px;
`

const rowStyle = {
  paddingTop: "10px",
  paddingBottom: "10px",
}

const bedsStyle = {
  textAlign: "left",
  paddingLeft: "70px"
}
const dateBoxStyle = {
  paddingRight: "70px",
  textAlign: "right",
}
const fullNameInput = {
  borderRadius: "4px",
  borderWidth: "1px",
  lineHeight: "initial"
}

class ReservationInformation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      numGuests: props.state.numGuests,
      dateRange: props.state.dateRange,
      numDays: props.state.numDays,
      totalPayment: props.state.totalPayment,
      pricePerDay: props.state.pricePerDay,
      guestName:props.state.guestName
    };
  }
  guestSelect = (numGuests) => {
    numGuests = numGuests.nativeEvent.target.value
    let totalPayment = numGuests * this.state.numDays * this.state.pricePerDay
    this.setState({numGuests, totalPayment});
    this.props.hoistState({"numGuests":numGuests, "totalPayment":totalPayment})
  };
  nameInput = (guestName) => {
    guestName = guestName.nativeEvent.target.value
    this.setState({guestName});
    this.props.hoistState({"guestName":guestName})
  }
  onSelect = (value) => {
    let dateRange = value
    let numDays = dateRange.end.diff(dateRange.start, 'days')
    let totalPayment = this.state.numGuests * numDays * this.state.pricePerDay
    this.setState({ dateRange, numDays, totalPayment});
    this.props.hoistState({"dateRange":dateRange, "numDays":numDays, "totalPayment":totalPayment})
  };
  creatListElements = (numElements) => {
    let listElements = []
    let value = "1 Guest"
    for (let i = 1; i <= numElements; i++){
      if(i > 1){
        value = i + " Guests"
      }
      listElements.push(<option key={i} value={i}>{value}</option>)
    }
    return(listElements)
  }
  renderBedSelect = () => {
    return (
      <div>
        <label htmlFor="guests">Guests:</label>
        <select id="guests" onChange={this.guestSelect}>
          {this.creatListElements(14)}
        </select>
      </div>
    );
  };
  renderSelectionValue = () => {
    return (
      <SelectionValueBox>
        <Row style={rowStyle}>
          <Col style={bedsStyle} xs={6}>
            {this.renderBedSelect()}
          </Col>
          <Col style={dateBoxStyle} xs={6}>
            {this.state.dateRange.start.format("YYYY-MM-DD")}
            {" : "}
            {this.state.dateRange.end.format("YYYY-MM-DD")}
          </Col>
        </Row>
      </SelectionValueBox>
    );
  };
  renderTotalPayment = () => {
    return (
      <TotalPaymentBox>
          <div> 
            {this.state.numGuests} Beds X {this.state.numDays} Nights X ₱700 Per Night = ₱{this.state.totalPayment}
          </div>
          <div>
            <label htmlFor="fname">Full Name:</label>
            <input style={fullNameInput} type="text" id="fname" name="fname" onChange={this.nameInput}/>
          </div>
          
      </TotalPaymentBox>
    );
  };
  render() {
    return (
      <div>
        <div>{this.renderSelectionValue()}</div>
            <DateRangePicker
              value={this.state.dateRange}
              onSelect={this.onSelect}
              singleDateRange={true}
              numberOfCalendars={1}
            />
        <div>{this.renderTotalPayment()}</div>
      </div>
    )
  }
}

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

export default Booking;