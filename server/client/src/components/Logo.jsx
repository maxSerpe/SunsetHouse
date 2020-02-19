import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../Sunset-Website-Logo-A.png'

const Wrapper = styled.a.attrs({
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="/">
                <img src={logo} width="90" height="50" margin-left="0px"/>
            </Wrapper>
        )
    }
}

export default Logo