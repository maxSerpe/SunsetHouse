import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import img1 from '../ImgBoxes/img1.png'
import img3 from '../ImgBoxes/img2.png'
import img2 from '../ImgBoxes/img3.png'
import img4 from '../ImgBoxes/img4.png'

const rowStyle = {
    width: "100%",
    margin:0
}
const colStyle = {
    padding:"0px",
    overflow:"hidden",
    display: "inlineBlock",
    width:"100%"
}

const imgStyle = {
    minWidth:"80vw",
    maxWidth:"90vw",
    minHeight:"50vh",
    maxHeight:"60vh",
}
 

class ImageBoxes extends Component {
    render() {
        return (
            <div>
                <Row style={rowStyle}>
                    <Col style={colStyle} xs={12} md={6}>
                        <Image style={imgStyle} src={img1} fluid/>
                    </Col>
                    <Col style={colStyle} xs={12} md={6}>
                        <Image style={imgStyle} src={img2} fluid/>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col style={colStyle} xs={12} md={6}>
                        <Image style={imgStyle} src={img3} fluid/>
                    </Col>
                    <Col style={colStyle} xs={12} md={6}>
                        <Image style={imgStyle} src={img4} fluid/>
                    </Col>
                </Row>
            </div>
        );
      }
}

export default ImageBoxes




