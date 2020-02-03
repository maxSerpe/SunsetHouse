import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Logo from './Logo'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';


const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})`
`

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const logoStyle = {
    color: "#1c1c1c",
    fontSize: "18px",
    fontWeight: "700",
    border: "solid",
    borderWidth: "2px",
    paddingLeft: "20px",
    paddingRight: "7px"
} 

const linkStyle = {
    color: "#999",
    fontSize: "13px",
    paddingTop: "20px"
}
const rowStyle = {
    paddingTop: "25px",
    paddingBottom: "10px",
    width: "100%",
    paddingLeft: "30px",
    paddingRight: "30px"
}



class Links extends Component {
    render() {
        return (
            <React.Fragment>
                    <Row style={rowStyle}>
                        <Col lg="4">
                            <Link style={logoStyle} to="/" className="navbar-brand">
                                Sunset House
                            </Link>
                        </Col>
                    
                        <Col lg="8">
                            <Navbar>
                                <List>
                                    <Item>
                                        <Link style={linkStyle} to="/" className="nav-link">
                                            Home
                                        </Link>
                                    </Item>
                                    <Item>
                                        <Link style={linkStyle} to="/" className="nav-link">
                                            About
                                        </Link>
                                    </Item>
                                    <Item>
                                        <Link style={linkStyle} to="/" className="nav-link">
                                            Gallery
                                        </Link>
                                    </Item>
                                    <Item>
                                        <Link style={linkStyle} to="/" className="nav-link">
                                            News
                                        </Link>
                                    </Item>
                                    <Item>
                                        <Link style={linkStyle} to="/" className="nav-link">
                                            Rates & Amenities 
                                        </Link>
                                    </Item>
                                    <Item>
                                        <Link style={linkStyle} to="/" className="nav-link">
                                            Woah Look! A List Item
                                        </Link>
                                    </Item>
                                    <Item>
                                        <Link style={linkStyle} to="/" className="nav-link">
                                            Policy
                                        </Link>
                                    </Item>
                                    <Item>
                                        <Link style={linkStyle} to="/" className="nav-link">
                                            Location
                                        </Link>
                                    </Item>
                                </List>
                            </Navbar>
                        </Col>
                    </Row>
            </React.Fragment>
        )
    }
}

export default Links