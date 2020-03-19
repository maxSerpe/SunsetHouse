import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {NavBar} from '../components'
import { ImageBoxes, Inquiry, Contact, BookingComplete, BookingFailed, Reservations, Reservation} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

const containerStyle = {
    marginTop:"18px",
    marginBottom:"20px",
    paddingLeft: "18vw",
    paddingRight: "18vw",
    width:"100%"
} 
function App() {
    return (
        <Router>
            <div style={containerStyle}>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={ImageBoxes} />
                    <Route path="/inquiry" exact component={Inquiry} />
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