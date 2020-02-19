import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {NavBar} from '../components'
import { ImageBoxes, Booking, Contact, BookingComplete, BookingFailed, Reservations, Reservation} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

const containerStyle = {
    marginTop:"20px",
    marginBottom:"20px",
    paddingLeft: "17vw",
    paddingRight: "17vw",
    width:"100%"
} 
function App() {
    return (
        <Router>
            <div style={containerStyle}>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={ImageBoxes} />
                    <Route path="/booking" exact component={Booking} />
                    <Route path="/reservations" exact component={Reservations} />
                    <Route path="/reservation/:id" exact component={Reservation} />
                    <Route path="/contact" exact component={Contact} />
                    <Route path="/bookingComplete" exact component={BookingComplete} />
                    <Route path="/bookingFailed" exact component={BookingFailed} />                    
                </Switch>
                {/* <Footer/> */}
            </div>
        </Router>
    )
}

export default App