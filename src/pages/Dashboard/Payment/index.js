/* eslint-disable no-console */
import styled from 'styled-components';
import PaymentButton from '../../../layouts/PaymentButton';
import { useState } from 'react';
import Button from '../../../components/Form/Button';
import useTicketTypes from '../../../hooks/api/usePayment';
import { useEffect } from 'react';

export default function Payment() {
  const [ticket, setTicket] = useState({});
  const [select, setSelect] = useState();
  // const [remote, setRemote] = useState([]);
  // const [inPerson, setInPerson] = useState([]);
  // const [ticketTypeData, setTicketTypeData] = useState([]);

  const { ticketsType, ticketsTypeLoading } = useTicketTypes();
  if (ticketsTypeLoading) { return <h1>Loaging</h1>; }
  console.log(ticketsType);

  const remote = [];
  const inPerson = [];

  for (const item of ticketsType) {
    if (item.isRemote) {
      remote.push(item);
    } else {
      inPerson.push(item);
    }
  }

  const withHotel = inPerson.filter((i) => i.includesHotel);
  const noHotel = inPerson.filter((i) => !i.includesHotel);

  console.log(remote);
  console.log(inPerson);

  return (
    <Main>
      <h1>Ingressos e pagamento</h1>
      <ManagementButton data={[noHotel[0].price, remote[0].price, setSelect]} />
      <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
      <ButtonsContainer>
        <PaymentButton price={withHotel[0].price - noHotel[0].price} subtitle={'Com hotel'} selected={select} onClick={() => setSelect(!select)} />
        <PaymentButton price={0} subtitle={'Sem Hotel'} selected={select} onClick={() => setSelect(!select)} />
      </ButtonsContainer>
      <h3>Fechado! O total ficou em R$ {'x'}. Agora é só confirmar:</h3>
      <Button>
        <p>RESERVAR INGRESSO</p>
      </Button>
    </Main>
  );
}

function ManagementButton({ data }) {
  function userChosen(chosen) {
    console.log('chose');
    data.setSelect(chosen);
  }
  return (
    <>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <ButtonsContainer>
        <PaymentButton price={data[0]} subtitle={'Presencial'} onClick={() => userChosen('Presencial')}/>
        <PaymentButton price={data[1]} subtitle={'Online'}  onClick={() => console.log('clicado')}/>
      </ButtonsContainer>
    </>
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

