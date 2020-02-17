import React, { Component } from 'react'

class BookingFailed extends Component {
    render() {
        return (
            <div style={{textAlign: "center", width:"100%"}}>
                <p style={{align: "center", paddingLeft:"10vw", paddingRight:"10vw"}}>
                Submition Failed, our bad! If you would still like to make a reservation, 
                reach out to us from the contact page found <a href="/contact">here</a>.</p>
            </div>
        )
    }
}

export default BookingFailed