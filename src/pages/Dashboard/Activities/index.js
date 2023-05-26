import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import { activities } from './data';
import ActivityRooms from '../../../components/ActivityRoom';

dayjs.locale('pt-br');

export default function Activities() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [showRooms, setShowRooms] = useState(false);

  const handleButtonClick = (date) => {
    setSelectedButton(date);
    setShowRooms(true);
  };

  const formatarData = (data) => {
    return dayjs(data).format('dddd, DD/MM');
  };

  const uniqueDates = new Set();

  activities.forEach((activity) => {
    const formattedDate = formatarData(activity.startDate);
    uniqueDates.add(formattedDate);
  });

  const uniqueDatesArray = Array.from(uniqueDates);

  const filteredActivities = activities.filter(
    (activity) => formatarData(activity.startDate) === selectedButton
  );

  return (
    <>
      <Main>
        <h1>Escolha de atividades</h1>
        {!showRooms && <h2>Primeiro, filtre pelo dia do evento:</h2>}
        <Container>
          {uniqueDatesArray.map((date) => (
            <Button
              key={date}
              style={{
                margin: '0 17px 17px 0',
                backgroundColor: selectedButton === date ? '#FFD37D' : undefined,
              }}
              onClick={() => handleButtonClick(date)}
            >
              {date}
            </Button>
          ))}
        </Container>
        {showRooms && <ActivityRooms activities={filteredActivities} />}
      </Main>
    </>
  );
}

const Main = styled.div`
  h1 {
    font-size: 34px;
    color: #000000;
    margin-bottom: 40px;
  }
  h2 {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
