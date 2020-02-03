import React, { Component} from 'react'
import styled from 'styled-components'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from './Logo'
import Links from './Links'

const Container = styled.div.attrs({
    className: 'container',
})`
    padding-bottom: 10px;
    padding-top: 0px;
`

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-xl',
})`
    margin-bottom: 20 px;
    
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Links/>
                </Nav>
            </Container>
        )
    }
}

export default NavBar