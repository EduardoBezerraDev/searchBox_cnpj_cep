import React, { useState } from 'react';
import { Alert, TextInput } from "react-native";

import axios from 'axios';

import {
    FormControl,
    Stack,
    Box,
    Input,
    Button,
    Heading,
    Divider,
    VStack,
    HStack,
    Text
} from "native-base";
import TitleInfo from '../../components/TitleInfo';
import { BoxStyled, Container } from './styles'

export default function SearchCep() {
    const baseUrl = 'https://viacep.com.br/ws';

    const [showOrHide, setShowOrHide] = useState(false)
    const [chars, setChars] = useState(0);
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [ddd, setDdd] = useState('');
    const [siafi, setSiafi] = useState('');

    const submit = () => {
        if (cep.length !== 8) {
            setChars(cep.length)
            return false
        }
        axios.get(`${baseUrl}/${cep}/json/`)
            .then((response) => {
                const info = response.data
                setState(info.uf)
                setStreet(info.logradouro)
                setCity(info.localidade)
                setDdd(info.ddd)
                setSiafi(info.siafi)

                setShowOrHide(true)
            })
            .catch(error => { Alert.alert("Erro", "CEP não encontrado") })
    }

    return (
        <Stack>
            <Container>
                <Box w="90%" background_color="white">
                    <FormControl isRequired>
                        <Stack mx="4" >
                            <FormControl.Label>Digite o CEP</FormControl.Label>
                            <Input
                                keyboardType={"number-pad"}
                                type="number"
                                placeholder={"CEP"}
                                onChangeText={newCep => setCep(newCep.replace(/[^0-9]/g, ''))}
                                defaultValue={cep} />
                            <FormControl.HelperText alignSelf="center">
                                CEP possui 8 caracteres
                            </FormControl.HelperText>
                          
                            <Button
                                top={4}
                                colorScheme="primary"
                                onPress={() => {
                                    submit()
                                }}
                            >
                                Buscar
                            </Button>
                        </Stack>
                    </FormControl>
                </Box>
            </Container>
            {
                showOrHide ?
                    <BoxStyled background_color="white">
                        <Divider />
                        <VStack top={5} space="3" p={3} >
                            <TitleInfo heading="Estado" text={state}></TitleInfo>
                            <TitleInfo heading="Cidade" text={city}></TitleInfo>
                            <TitleInfo heading="Rua" text={street}></TitleInfo>
                            <TitleInfo heading="DDD" text={ddd}></TitleInfo>
                            <TitleInfo heading="siafi" text={siafi}></TitleInfo>
                        </VStack>
                    </BoxStyled> :
                    <HStack h="100%" alignSelf="center">
                        <Heading>Você não fez uma busca ainda</Heading>
                    </HStack>
            }
        </Stack>
    )
}