import React, { Component } from 'react'
import api from '../api';
import {ReservationForm} from '../components'

class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            isLoaded: false

        }
    }

    componentDidMount = async () => {
        const id = this.state.id
        const reservation = await api.getReservationById(id)
        this.setState({
            reservation: reservation.data.data,
            isLoaded: true
        })
    }

    showIfLoaded = () => {
        if (this.state.isLoaded) {
            let title = ''
            if (this.state.reservation.approved) {
                title = "APPROVED INQUIRY"
            } else {
                title = "PENDING INQUIRY"
            }
            return <ReservationForm formType="updateCancel" data={this.state.reservation} title={title}/> 
        }
        else {
            return <div>waiting...</div>
        }
    }
    render() {
        return (
            <div>
                {this.showIfLoaded()}
            </div>
        )
    }
}

export default Reservation