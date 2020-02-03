import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logoSunset.jpg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="https://sambarros.com">
                <img src={logo} width="70" height="70" class="rounded-circle" alt="sambarros.com" />
            </Wrapper>
        )
    }
}

export default Logo