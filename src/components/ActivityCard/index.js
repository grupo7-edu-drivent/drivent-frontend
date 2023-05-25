import { CgEnter } from 'react-icons/cg';
import styled from 'styled-components';

export const activities = [
  {
    id: 1,
    title: 'Minecraft: montando o PC ideal',
    startDate: '2023-11-18 11:00',
    endDate: '2023-11-18 12:00',
    roomTitle: 'Auditório Principal',
    capacity: 14,
    subscribed: false,
  },
  {
    id: 2,
    title: 'LoL: montando o PC ideal',
    startDate: '2023-11-18 14:00',
    endDate: '2023-11-18 16:00',
    roomTitle: 'Auditório Principal',
    capacity: 11,
    subscribed: false,
  },
  {
    id: 3,
    title: 'Palestra X',
    startDate: '2023-11-19 09:00',
    endDate: '2023-11-19 12:00',
    roomTitle: 'Auditório Lateral',
    capacity: 40,
    subscribed: false,
  },
  {
    id: 4,
    title: 'Palestra Y',
    startDate: '2023-11-20 10:00',
    endDate: '2023-11-20 12:00',
    roomTitle: 'Sala de Workshop',
    capacity: 16,
    subscribed: false,
  },
];

export default function ActivityCard() {
  return (
    <>
      <MainContainer>
        <TextContainer>
          <h3>Minecraft: montando o PC ideal</h3>
          <h4>18/11/2023</h4>
        </TextContainer>
        <IconContainer>
          <CgEnter />
        </IconContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextContainer = styled.div`
  width: 275px;
  height: 79px;
  background-color: #F1F1F1;
  border-radius: 5px;
  margin: 9px;

  h3 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
  }
`;

const IconContainer = styled.div``;
