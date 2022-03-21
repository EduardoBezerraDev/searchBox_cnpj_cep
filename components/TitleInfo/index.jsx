import React, { useState } from 'react';

import {
    FormControl,
    Stack,
    Box,
    Input,
    Button,
    Text,
    Heading,
    Divider,
    VStack
} from "native-base";

export default TitleInfo = (props) => {
    return (
        <>
            <Heading size="sm">{props.heading}</Heading>
            <Text>{props.text}</Text>
        </>
    )
}