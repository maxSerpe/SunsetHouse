import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import styled from 'styled-components'

import 'react-table-6/react-table.css'
import originalMoment from "moment";
import { extendMoment } from "moment-range";

// TODO reseve this moment crap
var moment = require('moment');
const otherMoment = extendMoment(originalMoment);

const Wrapper = styled.div`
    padding: 0 0px 0px 0px;
`


let tableStyle = {
    textSize:"12px"
}

class ReservationType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type : props.type,
            reservations: [],
            columns: [],
            isLoading: false,
        }
    }
    dateWrapper = (date) => {
        return (
            <span>
                <div>{date.toDateString()}</div>
            </span>
        )
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllReservations().then(async (reservations) => {
            reservations = reservations.data.data
            await this.reduceReservations(reservations, this.state.type).then(reservationsReduced =>{
                this.setState({
                    reservations: reservationsReduced,
                    isLoading: false,
            })
            })
        })
    }

    reduceReservations = async (reservations, type) => {
        const today = otherMoment();
        var reservationsReduced = []

        reservations.forEach(function(value){
            if(type === 'enquiry'){
                if (value['approved'] === false) {
                    reservationsReduced.push(value);
                }
            }else if(type === 'upcoming'){
                if (moment(value['startDate']) > today) {
                    if(value['approved'] === true) {
                        reservationsReduced.push(value);
                    }
                }
            }else if(type === 'current'){
                if (moment(value['startDate']) < today) {
                    if (moment(value['endDate']) > today) {
                        if( value['approved'] === true) {
                            reservationsReduced.push(value);
                        }
                    }
                }
            }else if(type === 'past'){
                if (moment(value['endDate']) < today) {
                    if (value['approved'] === true) {
                        reservationsReduced.push(value);
                    }
                } 
            }
        })
        return reservationsReduced
    }

    render() {
        const { reservations, isLoading } = this.state
        const columns = [
            // {
            //     Header: 'ID',
            //     accessor: '_id',
            //     filterable: true,
            // },
            {
                Header: 'Name',
                minWidth: 150,
                Cell: function(props) {
                    return (
                        <span>
                            <a href={'/reservation/' + props.original._id}>{props.original.guestName}</a>
                        </span>
                    )
                }
            },
            {
                Header: '# Guests',
                accessor: 'numGuests',
                maxWidth: 80,
            },
            {
                Header: 'CheckIn',
                Cell: function(props) {
                    return (
                        <span>
                            <div>{moment(props.original.startDate).calendar('YYYY-MM-DD')}</div>
                        </span>
                    )
                },
                sortType: 'datetime'
            },
            {
                Header: 'CheckOut',
                Cell: function(props) {
                    return (
                        <span>
                            <div>{moment(props.original.endDate).calendar('YYYY-MM-DD')}</div>
                        </span>
                    )
                },
            },
            {
                Header: 'Total Cost',
                accessor: 'totalPayment',
                maxWidth: 60,
            },
            {
                Header: 'Date Submitted',
                id: 'dateSumbmitted',
                minWidth: 200,
                Cell: function(props) {
                    return (
                        <span>
                            <div>{moment(props.original.createdAt).format('ll LTS')}</div>
                        </span>
                    )
                },
            }
        ]
        let showTable = true
        if (!reservations.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={reservations}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={20}
                        showPageSizeOptions={true}
                        minRows={0}
                        sorted={[{ // the sorting model for the table
                            id: 'dateSumbmitted',
                            desc: true
                          }]}
                        style={tableStyle}
                    />
                )}
            </Wrapper>
        )
    }
}

class TabbedReservations extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="enquiry" title="Enquiry">
                    <ReservationType type="enquiry"/>
                </Tab>
                <Tab eventKey="upcoming" title="Upcoming">
                    <ReservationType type="upcoming"/>
                </Tab>
                <Tab eventKey="current" title="Current">
                    <ReservationType type="current"/>
                </Tab>
                <Tab eventKey="past" title="Past">
                    <ReservationType type="past"/>
                </Tab>
            </Tabs>
        )
    }
}

export default TabbedReservations