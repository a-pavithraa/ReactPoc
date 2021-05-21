import React,{useState} from 'react';
import styled from 'styled-components';

const SideDrawDiv = styled.div`
    position: fixed;
    width: 280px;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: white;
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;

@media (min-width: 500px) {
    
}

.Open {
    transform: translateX(0);
}

.Close {
    transform: translateX(-100%);
}

.Logo {
    height: 11%;
    margin-bottom: 32px;
}
`

const sideBar = React.memo((props)=>{

    const open=props.open;
    return <SideDrawDiv open></SideDrawDiv>;



});


export default sideBar;