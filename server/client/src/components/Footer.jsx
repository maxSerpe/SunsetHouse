import React, { Component} from 'react'
import styled from 'styled-components'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from './Logo'

const rowStyle = {
    padding: "46px",
    paddingTop: "40px",
    paddingBottom: "30px",
    minHeight: "70px",
    marginBottom: "70px",

}
const colStyle = {
    textAlign:"left",
    whiteSpace:"pre-wrap",
    color: "#000",
    fontFamily: "futura-pt",
    fontHeight: "400",
    fontStyle: "normal",
    lineHeight: "1.6em",
    letterSpacing: ".01em",
    fontSize: "14px",
}

const aStyle = {
    color: "#787878",
    fontSize: "14px",
}

class Footer extends Component {
    render() {
        return (
            <Row style={rowStyle}>
                <Col xl='2' lg='1' sm='0'></Col>
                <Col xl='4'lg='5' style={colStyle} id="yui_3_17_2_1_1580645438987_1609">
                    instagram: 
                    <a style={aStyle} href="https://www.instagram.com/sunsethouselaunion/" target="_blank" id="yui_3_17_2_1_1580645438987_1608" > @sunsethouselaunion </a> 
                     facebook: 
                    <a style={aStyle} href="https://www.facebook.com/VesselHostel" target="_blank">&nbsp;/sunsethouselaunion&nbsp;</a> 
                </Col>
                <Col xl='4' lg='5' style={colStyle} id="yui_3_17_2_1_1580645438987_1609">
                    official photos by 
                    <a style={aStyle} href="https://www.instagram.com/billygupita/" target="_blank">&nbsp;Lola Liegaillao(?)&nbsp;</a>
                    and
                    <a style={aStyle} href="https://www.instagram.com/mtouano/" target="_blank"> Jerik Robleza </a>
                </Col>
                <Col xl='2' lg='1' sm='0'></Col>
            </Row>
        )
    }
}

export default Footer