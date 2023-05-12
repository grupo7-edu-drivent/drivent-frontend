/* eslint-disable no-console */
import styled from 'styled-components';
import { useState } from 'react';
import Button from '../../../components/Form/Button';
import useTicketTypes from '../../../hooks/api/usePayment';
import RadioGroup from '../../../components/Form/RadioGroup';

export default function Payment() {
  const [ticket, setTicket] = useState({});
  const [isRemote, setIsRemote] = useState([]);
  const [haveHotel, setHaveHotel] = useState([]);

  const { ticketsType, ticketsTypeLoading } = useTicketTypes();
  if (ticketsTypeLoading) {
    return <h1>Loaging</h1>;
  }
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
  
  console.log(`Evento é remoto: ${isRemote}`);
  console.log(`Presencial com hotel: ${haveHotel}`);
  console.log(remote);
  console.log(inPerson);
  console.log(noHotel);
  console.log(withHotel);

  return (
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
      {}
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
      <h3>Fechado! O total ficou em R$ {'x'}. Agora é só confirmar:</h3>
      <Button>
        <p>RESERVAR INGRESSO</p>
      </Button>
    </Main>
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
