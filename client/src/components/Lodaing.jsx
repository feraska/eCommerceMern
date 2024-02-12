import React from 'react';
import styled from 'styled-components';
const Img = styled.img`
    width: 50px;
    height: 50px;
`
const Loading = () => {
    return (
        <Img src="/loading.png"/>
    )
}


export default Loading;