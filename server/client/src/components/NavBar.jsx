import React, { Component} from 'react'
import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';

const logoStyle = {
    color: "#000",
    fontSize: "18px",
    fontWeight: "570",
    letterSpacing: ".18em",
    lineHeight: '2.5em',
    
} 
const linkStyle = {
    fontWeight: "200",
    fontStyle: "normal",
    fontSize: "13px",
    letterSpacing: ".03em",
    textTransform: "none",
    lineHeight: '1em',
    color: "#000",
}
const rowStyle = {
    width: "100%",
    margin: "0px",
    paddingBottom: "50px"
}
const colStyle = {
    textAlign:"right",
    paddingLeft:"0px",
    paddingRight:"0px",
    paddingTop:"16px"
}
const LogoStyle = {
    paddingLeft:"0px",
    paddingRight:"0px",
}
const pStyle = {
    display:"inline-block",
}


class NavBar extends Component {
    render() {
        return (
            <React.Fragment>
                    <Row style={rowStyle}>
                        <Col style={LogoStyle}>
                            <Link style={logoStyle} to="/" className="navbar-brand">
                                SUNSET HOUSE
                            </Link>
                        </Col>
                    
                        <Col style={colStyle}>
                            <p style={pStyle}>
                                <Link style={linkStyle} to="/booking">
                                    BOOKING
                                </Link>
                                &nbsp;|&nbsp;
                                <Link style={linkStyle} to="/contact">
                                    CONTACT
                                </Link>
                            </p>    
                        </Col>
                    </Row>
            </React.Fragment>
        )
    }
}

export default NavBar