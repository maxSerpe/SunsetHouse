import React, { Component} from 'react'
import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './Logo'

const linkStyle = {
    fontWeight: "200",
    fontStyle: "normal",
    letterSpacing: ".03em",
    textTransform: "none",
    lineHeight: '1em',
    color: "#535252",
}

const rowStyle = {
    color: "#535252",
    paddingTop: "20px",
    paddingBottom: "45px",
    width: "100%",
    marginLeft: "0px",
}

const noStyle = {
    paddingTop: "37px",
    paddingLeft: "10px",
    verticalAlign: "baseline",
    fontSize: "11px",

}
const topStyle ={
    
}
// paddingTop: "30px"

class NavBar extends Component {
    render() {
        return (
            <div style={topStyle}>
                    <Row style={rowStyle}>
                    <Logo/>
                        <div style={noStyle}>
                            <Link style={linkStyle} to="/booking">
                                BOOKING
                            </Link>
                            &nbsp;|&nbsp;
                            <Link style={linkStyle} to="/contact">
                                CONTACT
                            </Link>
                        </div>
                    </Row>   
            </div>
        )
    }
}

export default NavBar