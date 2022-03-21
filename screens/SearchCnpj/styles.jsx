import styled from 'styled-components';
import {
    Box,
  } from "native-base";

export const BoxStyled = styled(Box) `
    align-items: center;
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