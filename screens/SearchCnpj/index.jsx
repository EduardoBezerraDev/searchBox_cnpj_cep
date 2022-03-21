import React, { useState } from 'react';
import axios from 'axios';
import { Alert, TextInput } from "react-native";

import {
  FormControl,
  Stack,
  Box,
  Input,
  Button,
  Heading,
  Divider,
  VStack,
  HStack
} from "native-base";
import TitleInfo from '../../components/TitleInfo';
import { BoxStyled, Container } from './styles'

export default function SearchCnpj() {
  const baseUrl = 'https://publica.cnpj.ws/cnpj';

  const [showOrHide, setShowOrHide] = useState(false)
  const [cnpj, setCnpj] = useState('96668918000263');
  const [razao_social, setRazaoSocial] = useState("")
  const [description, setDescription] = useState("")
  const [shareCapital, setShareCapital] = useState("")
  const [legalNature, setLegalNature] = useState("")
  const [size, setSize] = useState("")
  const [dateStart, setDateStart] = useState("")

  const submit = () => {
    
    axios.get(`${baseUrl}/${cnpj}`)
      .then((response) => {
        const info = response.data
        setRazaoSocial(info.razao_social)
        setDescription(info.estabelecimento.atividade_principal.descricao)
        setShareCapital(info.capital_social)
        setLegalNature(info.natureza_juridica.descricao)
        setSize(info.porte.descricao)
        setDateStart(info.estabelecimento.data_inicio_atividade)
        setShowOrHide(true)
      })
      .catch(error => {Alert.alert("Erro", "CNPJ não encontrado")})

  }

  return (
    <Stack>
      <Container>
        <Box w="90%" background_color = "white">
          <FormControl isRequired>
            <Stack mx="4">
              <FormControl.Label>Digite o CNPJ</FormControl.Label>
              <Input
                keyboardType={"number-pad"}
                type="number"
                placeholder="CNPJ"
                onChangeText={newCnpj => setCnpj(newCnpj)}
                defaultValue={cnpj} />
              <FormControl.HelperText>
                CNPJ possui 14 caracteres
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
          <BoxStyled  background_color="white">
            <Heading >{razao_social}</Heading>
            <Divider />
            <VStack top={5} space="3" p={3} >
              <TitleInfo heading="Porte" text={size}></TitleInfo>
              <TitleInfo heading="Atividade principal" text={description}></TitleInfo>
              <TitleInfo heading="Capital Principal" text={shareCapital}></TitleInfo>
              <TitleInfo heading="Natureza jurífica" text={legalNature}></TitleInfo>
              <TitleInfo heading="Início de atividade" text={dateStart}></TitleInfo>

            </VStack>
          </BoxStyled> :
          <HStack h="100%" alignSelf="center">
            <Heading>Você não fez uma busca ainda</Heading>
          </HStack>
      }
    </Stack>
  )
}