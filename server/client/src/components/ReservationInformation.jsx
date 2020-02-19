import React from 'react'
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import styled from 'styled-components'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import api from '../api';
import './ReservationInformation.css';


const moment = extendMoment(originalMoment);

const SelectionValueBox = styled.div`
min-height: 30px;   
`
const TotalPaymentBox = styled.div`
min-height: 30px;  
line-height: 40px;
`

const rowStyle = {
paddingTop: "10px",
paddingBottom: "10px",
}

const bedsStyle = {
textAlign: "left",
}
const dateBoxStyle = {
  textAlign: "left",
  paddingBottom: '8px'
}

const totalCalculatorBoxStyle = {
  textAlign: "left",
  lineHeight: "1.6"
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
      guestName:props.state.guestName,
      dateStates:[],
      bedsOccupiedByDate:{},
    };
  }
  componentDidMount = async () => {
    // get all approved reservations
    let reservations = await api.getApprovedReservations()
    reservations = reservations.data.data
    // make dictionary with dates as key
    let bedsOccupiedByDate = {}

    // for each res, add # of beds to each date in reservation (save the checkout date) 
    reservations.forEach(function(value){
      let startDate = moment(value['startDate'])
      let endDate = moment(value['endDate'])
      let beds = value['numGuests']
      if (startDate.format('L') === endDate.format('L')) {
        console.log('still have test res in the database')
      } else {
        while(startDate < endDate.subtract(1, 'days')){
          if(startDate.format('L') in bedsOccupiedByDate) {
            bedsOccupiedByDate[startDate.format('L')] = bedsOccupiedByDate[startDate.format('L')] + beds
          } else {
            bedsOccupiedByDate[startDate.format('L')] = beds
          }
          startDate = startDate.add(1, 'days')
        } 
      }
      
    })
    // add this dictionary to state 
    this.setState({bedsOccupiedByDate})
    // calling update availability ranges
    this.updateAvailabilityRanges()
  }

  updateAvailabilityRanges = () => {
    // get #guests from state
    let numbGuests = this.state.numGuests
    // get reservation count by day dict from state
    let bedsOccupiedByDate = this.state.bedsOccupiedByDate
    // create new/empty dateStates dict
    let dateStates = []
    // check each dictionary value to see if # of guests + current res > 14
    for(var key in bedsOccupiedByDate) {
      if(bedsOccupiedByDate[key] + numbGuests > 14) {
        // if so, add that date to the dateStates 
        dateStates.push({
          state: 'unavailable',
          range: moment.range(moment(key),moment(key).add(1, 'days'))
        })
      }
    }
    // set the dateStates in state
    this.setState(dateStates)
  }

  guestSelect = (numGuests) => {
    numGuests = numGuests.nativeEvent.target.value
    let totalPayment = numGuests * this.state.numDays * this.state.pricePerDay
    this.setState({numGuests, totalPayment});
    this.props.hoistState({"numGuests":numGuests, "totalPayment":totalPayment})
    this.updateAvailabilityRanges()
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
      <div style={{paddingTop:"8px", paddingBottom:'8px'}}>
        <label htmlFor="guests">Guests:&nbsp;&nbsp;</label>
        <select id="guests" onChange={this.guestSelect}>
          {this.creatListElements(14)}
        </select>
      </div>
    );
  };
  renderSelectionValue = () => {
    return (
      <SelectionValueBox>
        <div style={bedsStyle}>
          {this.renderBedSelect()}
        </div>
        <div style={dateBoxStyle}>
          {this.state.dateRange.start.format("YYYY-MM-DD")}
          {" : "}
          {this.state.dateRange.end.format("YYYY-MM-DD")}
        </div>
      </SelectionValueBox>
    );
  };
  renderTotalPayment = () => {
    return (
      <TotalPaymentBox>
          <div style={totalCalculatorBoxStyle}> 
            <div>{this.state.numGuests} Beds X </div>
            <div>{this.state.numDays} Nights X </div>
            <div> ₱700 Per Night</div>
            <hr style={{height:'1px', margin:'3px'}}/>
            <div>= ₱{this.state.totalPayment}</div>
          </div>
      </TotalPaymentBox>
    );
  };
  render() {
    return (
      <Row style={{width:"100%", margin:'0px'}}>
        <Col l={6} m={12} style={{paddingLeft:"20px"}}>
          <div>
            <label htmlFor="fname" >Full Name:&nbsp;&nbsp;</label>
            <input style={fullNameInput} type="text" id="fname" name="fname" defaultValue={this.state.guestName} onChange={this.nameInput}/>
          </div>
          <div>{this.renderSelectionValue()}</div>
          <div>{this.renderTotalPayment()}</div>
        </Col>
        <Col l={6} m={12}>
          <DateRangePicker
            value={this.state.dateRange}
            onSelect={this.onSelect}
            singleDateRange={true}
            numberOfCalendars={1}
          />
        </Col>
        
      </Row>
    )
  }
}

export default ReservationInformation