/* eslint-disable no-console */
import styled from 'styled-components';
import PaymentButton from '../../../layouts/PaymentButton';
import { useState } from 'react';

import useTicketTypes from '../../../hooks/api/usePayment';

export default function Payment() {
  const [select, setSelect] = useState(false);
  const [ticket, setTicket] = useState({});
  const [remote, setRemote] = useState({});
  const [inPerson, setInPerson] = useState([]);

  const { tycketsType } = useTicketTypes();
  console.log(tycketsType);
  
  function ticketTypeData(tycketsType) {
    const isRemote = tycketsType.filter((t) => t.isRemote === true);
    setRemote(isRemote);
    const noIsRemote = tycketsType.filter((t) => t.isRemote === false);
    setInPerson(noIsRemote);
  }
  console.log(remote);
  console.log(inPerson);
  // function featTicket() {

  // }

  const value = 250;
  const title = 'presencial'; 

  return (
    <Main>
      <h1>Ingressos e pagamento</h1>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <ButtonsContainer>
        <PaymentButton  price={value} subtitle={title} selected={select} onClick={ticketTypeData}/>
        <PaymentButton price={value} subtitle={title} selected={select} onClick={ticketTypeData}/>
      </ButtonsContainer>
      <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
      <ButtonsContainer>
        <PaymentButton  price={value} subtitle={'Com hotel'} selected={select} onClick={() => setSelect(!select)}/>
        <PaymentButton price={value} subtitle={'Sem Hotel'} selected={select} onClick={() => setSelect(!select)}/>
      </ButtonsContainer>
      <h3>Fechado! O total ficou em R$ {'x'}. Agora é só confirmar:</h3>
      <ComfirmatioButton>
        <p>RESERVAR INGRESSO</p>
      </ComfirmatioButton>
    </Main>
  );
}

const Main = styled.div`
  h1{
    font-size: 34px;
    color: #000000;
    
  }
  h2{
    font-size: 20px;
    color: #8E8E8E;
    margin-bottom: 10px;
    margin-top: 30px;
  } 
  h3{
    font-size: 20px;
    color: #8E8E8E;
    margin-bottom: 10px;
    margin-top: 20px;
  } 
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 15px;
  width: 310px;
  justify-content: space-between;
`;

const ComfirmatioButton = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 37px;
width: 162px;
background-color: #E0E0E0;
color: #000000;
font-size: 10;
border-radius: 4px;
margin-top: 10px;
box-shadow: 4px 4px 1.5px 0.5px lightgray;
p{
  background-color: #E0E0E0;
  color: #000000;
 font-size: 14px;
 font-weight: 500;
}
:hover{
  cursor: pointer;
  opacity: 0.7;
  box-shadow: 4px 4px 1.5px 0.5px gray;
}
`;
