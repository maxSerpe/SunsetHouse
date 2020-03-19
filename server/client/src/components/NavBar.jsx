import React, { Component} from 'react'
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './Logo'

const linkStyleInquiry = {
    fontWeight: "200",
    fontStyle: "normal",
    textTransform: "none",
    lineHeight: '1em',
    color: "#535252",
    letterSpacing: "0.07em",
    textDecoration: "none"
}
const linkStyleContact = {
    fontWeight: "200",
    fontStyle: "normal",
    textTransform: "none",
    lineHeight: '1em',
    color: "#535252",
    letterSpacing: "0.05em",
    paddingLeft: "2px",
    textDecoration: "none"
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
    paddingLeft: "17px",
    verticalAlign: "baseline",
    fontSize: "11px"
}
// paddingTop: "30px"

class NavBar extends Component {
    render() {
        return (
            <div>
                    <Row style={rowStyle}>
                    <Logo/>
                        <div style={noStyle}>
                            <Link style={linkStyleInquiry} to="/inquiry">
                                INQUIRY
                            </Link>
                            &nbsp;|&nbsp;
                            <Link style={linkStyleContact} to="/contact">
                                CONTACT
                            </Link>
                        </div>
                    </Row>   
            </div>
        )
    }
}

export default NavBar