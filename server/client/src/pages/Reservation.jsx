import React, { Component } from 'react'
import api from '../api';

class Reservation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            guestName: '',
            rating: '',
            time: '',
        }
    }
    componentDidMount = async () => {
        const { id } = this.state
        const reservation = await api.getReservationById(id)

        this.setState({
            guestName: reservation.data.data.guestName
        })
    }
    render() {
        return (
            <div>
                <p>This is where you will find the reservation for {this.state.name}</p>
            </div>
        )
    }
}

export default Reservation