/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import RadioGroup from '../../../components/Form/RadioGroup';
import { useTicketTypes } from '../../../hooks/api/usePayment';
import CreditCard from './CreditCard';
import useToken from '../../../hooks/useToken';
import { reserveTicket } from '../../../services/paymentApi';
import { toast } from 'react-toastify';
import { getTicketByUser } from '../../../services/ticketApi';

export default function Payment() {
  const token = useToken();
  const [ticket, setTicket] = useState(null);
  const [isRemote, setIsRemote] = useState(null);
  const [haveHotel, setHaveHotel] = useState(null);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [paymentType, setPaymentType] = useState(null);
  const { ticketsType, ticketsTypeLoading } = useTicketTypes();

  useEffect(async() => {
    if(!ticket) {
      let ticketData;
      try {
        ticketData = await getTicketByUser(token);
    
        if (ticketData.TicketType.isRemote === true) {
          setPaymentType('Online');
          setTicket(ticketData);
          setShowCreditCard(true);
        }
        if (!ticketData.TicketType.isRemote && !ticketData.TicketType.includesHotel) {
          setPaymentType('Presencial + Sem Hotel');
          setTicket(ticketData);
          setShowCreditCard(true);
        }
        if (!ticketData.TicketType.isRemote && ticketData.TicketType.includesHotel) {
          setTicket(ticketData);
          setPaymentType('Presencial + Com Hotel');
          setShowCreditCard(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [ticket]);

  if (ticketsTypeLoading) {
    return <h1>Loading</h1>;
  }
  async function handleReserveHotel() {
    let ticketType;

    if (isRemote === true) {
      ticketType = remote[0];
      setPaymentType('Online');
    }
    if (!isRemote && !haveHotel) {
      ticketType = noHotel[0];
      setPaymentType('Presencial + Sem Hotel');
    }
    if (!isRemote && haveHotel) {
      ticketType = withHotel[0];
      setPaymentType('Presencial + Com Hotel');
    }

    try {
      const response = await reserveTicket(token, ticketType.id);
      const reservedTicket = response.data;
      setTicket(reservedTicket);
      setShowCreditCard(true);
    } catch (error) {
      toast('Não foi possível reservar o hotel');
    }
  }

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

  // console.log(`Evento é remoto: ${isRemote}`);
  // console.log(`Presencial com hotel: ${haveHotel}`);
  // console.log(remote);
  // console.log(inPerson);
  // console.log(noHotel);
  // console.log(withHotel);

  // function featTicket(isRemote, haveHotel) {
  //   if (isRemote === true) {
  //     setTicketType(remote[0]);
  //     setPaymentType('Online');
  //   }
  //   if (!isRemote && !haveHotel) {
  //     setTicketType(noHotel[0]);
  //     setPaymentType('Presencial + Sem Hotel');
  //   }
  //   if (!isRemote && haveHotel) {
  //     setTicketType(withHotel[0]);
  //     setPaymentType('Presencial + Com Hotel');
  //   }
  // }

  return (
    <>
      {showCreditCard ? (
        <CreditCard paymentType={paymentType} ticket={ticket} token={token}/>
      ) : (
        <Main>
          <h1>Ingressos e pagamento</h1>
          <RadioGroup
            selectOptions={{
              options: [
                { ...noHotel[0], subtitle: 'Presencial' },
                { ...remote[0], subtitle: 'Online' },
              ],
              valueKey: 'isRemote',
            }}
            handleSelect={setIsRemote}
          />
          {isRemote ? (
            <>
              <h3>Fechado! O total ficou em R$ {remote[0].price}. Agora é só confirmar:</h3>
              <Button onClick={handleReserveHotel}>
                <p>RESERVAR INGRESSO</p>
              </Button>
            </>
          ) : (
            <>
              <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
              <RadioGroup
                selectOptions={{
                  options: [
                    { ...noHotel[0], subtitle: 'Sem Hotel' },
                    { ...withHotel[0], subtitle: 'Com Hotel' },
                  ],
                  valueKey: 'includesHotel',
                }}
                handleSelect={setHaveHotel}
              />
            </>
          )}
          {!isRemote && haveHotel !== null ? (
            <>
              <h3>
                Fechado! O total ficou em R$ {haveHotel ? withHotel[0].price : noHotel[0].price}. Agora é só confirmar:
              </h3>
              <Button onClick={handleReserveHotel}>
                <p>RESERVAR INGRESSO</p>
              </Button>
            </>
          ) : (
            <></>
          )}
        </Main>
      )}
    </>
  );
}

const Main = styled.div`
  h1 {
    font-size: 34px;
    color: #000000;
  }
  h2 {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 10px;
    margin-top: 30px;
  }
  h3 {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 10px;
    margin-top: 20px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 15px;
  width: 310px;
  justify-content: space-between;
`;
