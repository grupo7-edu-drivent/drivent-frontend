import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import { activities } from './data';
import ActivityRooms from '../../../components/ActivityRoom';

dayjs.locale('pt-br');

function formatarData(data) {
  return dayjs(data).format('dddd, DD/MM');
}

export default function Activities() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [showRooms, setShowRooms] = useState(false);

  const handleButtonClick = (activityId) => {
    setSelectedButton(activityId);
    setShowRooms(true);
  };

  return (
    <>
      <Main>
        <h1>Escolha de atividades</h1>
        {!showRooms && <h2>Primeiro, filtre pelo dia do evento:</h2>}
        <Container>
          {activities.map((activity) => (
            <Button
              key={activity.id}
              style={{
                margin: '0 17px 17px 0',
                backgroundColor: selectedButton === activity.id ? '#FFD37D' : undefined,
              }}
              onClick={() => handleButtonClick(activity.id)}
            >
              {formatarData(activity.startDate)}
            </Button>
          ))}
        </Container>
        {showRooms && <ActivityRooms activityId={selectedButton} />}
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
