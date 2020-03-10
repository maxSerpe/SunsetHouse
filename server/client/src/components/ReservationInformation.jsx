import React from 'react'
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import styled from 'styled-components'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import api from '../api';
import './ReservationInformation.css';
const moment = require('moment-timezone');

const SelectionValueBox = styled.div`
min-height: 30px;   
`
const TotalPaymentBox = styled.div`
min-height: 30px;  
line-height: 40px;
`

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
      stateDefinitions:{
        available: {
          color: null,
          label: 'Available',
        },
        selected: {
          color: "#4285f4",
          label: 'Selected',
        },
        unavailable: {
          selectable: false,
          color: '#78818b',
          label: 'Unavailable',
        },
      }
    }
  }
  componentDidMount = async () => {
    // get all approved reservations
    let reservations = await api.getApprovedReservations()
    reservations = reservations.data.data
    // make dictionary with dates as key
    let bedsOccupiedByDate = {}

    // for each res, add # of beds to each date in reservation (save the checkout date) 
    reservations.forEach(function(value){
      let startDate = moment.parseZone(value['startDate'], "YYYY-MM-DDTHH:mm:ss.SSSSZ", 'Asia/Manila')
      let endDate = moment.parseZone(value['endDate'], "YYYY-MM-DDTHH:mm:ss.SSSSZ", 'Asia/Manila')
      let beds = value['numGuests']
      if (startDate.toString() === endDate.toString()) {
        console.log('still have test res in the database')
      } else {
        while(startDate < endDate){
          if(startDate.toString() in bedsOccupiedByDate) {
            let key = startDate.toString()
            bedsOccupiedByDate[key]["bedsOccupied"] = bedsOccupiedByDate[key]["bedsOccupied"] + beds
          } else {
            bedsOccupiedByDate[startDate.toString()] = { 
              "bedsOccupied": beds
            }
            
          }
          startDate.add(1, 'days')
        } 
      }
      
    })
    // add this dictionary to state 
    this.setState({bedsOccupiedByDate})
    // calling update availability ranges
    this.updateAvailabilityRanges(this.state.numGuests)
  }

  updateAvailabilityRanges = async (numGuests) => {
    numGuests = parseInt(numGuests)
    // // get reservation count by day dict from state
    // let bedsOccupiedByDate = this.state.bedsOccupiedByDate
    // // create new/empty dateStates dict
    // let dateStates = []
    // // check each dictionary value to see if # of guests + current res > 14
    // let dateRangeFlag = false
    // let dateRange = this.state.dateRange   
    // for ( value in bedsOccupiedByDate) {
    //   if(bedsOccupiedByDate[value]["bedsOccupied"] + numGuests > 14) {
    //     // if so, add that date to the dateStates (pass via string because Moment is scary)
    //     let currentMoment = moment(value)
    //     dateStates.push({
    //       selectable: false,
    //       state: 'unavailable',
    //       range: moment.range(currentMoment.clone(),currentMoment.clone().add(1, 'days'))
    //     })
    //     if(currentMoment.isBetween(this.state.dateRange.start.startOf('day'), this.state.dateRange.end.startOf('day'))){
    //       if(currentMoment.isBetween(this.state.dateRange.start.startOf('day'), this.state.dateRange.end.startOf('day'))){
    //       dateRange.start = currentMoment.clone().add(1, 'days')
    //     }
    //   }
    // };

    // this.setState({dateStates, dateRange})
    // }
  }

  guestSelect = (numGuests) => {
    numGuests = numGuests.nativeEvent.target.value
    let totalPayment = numGuests * this.state.numDays * this.state.pricePerDay
    this.setState({numGuests, totalPayment});
    this.props.hoistState({"numGuests":numGuests, "totalPayment":totalPayment})
    this.updateAvailabilityRanges(numGuests)
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
    let dateRange = "nothing"
    if(Object.keys(this.state.dateRange).length === 0) {
      const today = moment();
      let todaysDate = today.clone()
      dateRange = 
        <div style={dateBoxStyle}>
        {todaysDate.format("YYYY-MM-DD")}
        {" : "}
        {todaysDate.format("YYYY-MM-DD")}
        </div>
    } else {
      dateRange = 
        <div style={dateBoxStyle}>
        {this.state.dateRange.start.format("YYYY-MM-DD")}
        {" : "}
        {this.state.dateRange.end.format("YYYY-MM-DD")}
        </div>
    }
    return (
      <SelectionValueBox>
        <div style={bedsStyle}>
          {this.renderBedSelect()}
        </div>
        {dateRange}
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
  renderCalendar = () => {
    if (Object.keys(this.state.dateRange).length === 0) {
      return (
      <DateRangePicker
        value={this.state.dateRange}
        onSelect={this.onSelect}
        singleDateRange={true}
        numberOfCalendars={1}
        dateStates={this.state.dateStates}
        stateDefinitions={this.state.stateDefinitions}
        defaultState="available"
        selectionType='range'
        />);
    } else {
      return (<DateRangePicker
        value={this.state.dateRange}
        onSelect={this.onSelect}
        singleDateRange={true}
        numberOfCalendars={1}
        dateStates={this.state.dateStates}
        stateDefinitions={this.state.stateDefinitions}
        defaultState="available"
        selectionType='range'
        />);
    }
  }
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
          {this.renderCalendar()}
        </Col>
        
        
      </Row>
    )
  }
}

export default ReservationInformation