import styled from 'styled-components';
import {
    Box,
    Input
  } from "native-base";

export const BoxStyled = styled(Box) `
    text-align: left;
    height: 90% ;
    background-color: ${props=>props.background_color?props.background_color:"whitesmoke"} ;
`;

export const Container = styled(Box) `
    background-color: ${props=>props.background_color?props.background_color:"whitesmoke"} ;
    align-items: center;
    min-height: 40%;
    width: 100%;
    justify-content:center
`;
