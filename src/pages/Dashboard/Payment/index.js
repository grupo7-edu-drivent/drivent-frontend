import styled from 'styled-components';
import PaymentButton from '../../../layouts/PaymentButton';
import { useState } from 'react';

import useTicketTypes from '../../../hooks/api/usePayment';

export default function Payment() {
  const [select, setSelect] = useState(false);
  const value = '250';
  const title = 'Presencial';
  const ticketTypes = useTicketTypes();

  return (
    <Main>
      <h1>Ingressos e pagamento</h1>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <ButtonsContainer>
        <PaymentButton price={value} subtitle={title} selected={select} onClick={() => setSelect(!select)}/>
        <PaymentButton price={value} subtitle={title} selected={select} onClick={() => setSelect(!select)}/>
      </ButtonsContainer>
      
    </Main>
  );
}

const Main = styled.div`
  h1{
    font-size: 34px;
    color: #000000;
    margin-bottom: 40px;
  }
  h2{
    font-size: 20px;
    color: #8E8E8E;
    margin-bottom: 10px;
  } 
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 15px;
  width: 310px;
  justify-content: space-between;
`;
