import { CgEnter } from 'react-icons/cg';
import styled from 'styled-components';

export default function ActivityCard({ activity }) {
  const { title, startDate, endDate, roomTitle, capacity } = activity;

  const startTime = new Date(startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endTime = new Date(endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);
  const timeDifference = Math.abs(endDateTime - startDateTime);
  const hoursDifference = Math.ceil(timeDifference / (1000 * 60 * 60));
  const mainContainerHeight = hoursDifference * 79;
  const dividerHeight = hoursDifference * 60;

  return (
    <>
      <MainContainer style={{ height: `${mainContainerHeight}px` }}>
        <TextContainer>
          <h3>{title}</h3>
          <h4 style={{ fontWeight: 400, marginTop: '6px' }}>
            {startTime} - {endTime}
          </h4>
        </TextContainer>
        <IconContainer>
          <Divider style={{ height: `${dividerHeight}px` }} />
          <CgEnter style={{ fontSize: '20px' }} />
          <h5 style={{ fontSize: '9px', marginTop: '5px' }}>{capacity} vagas</h5>
        </IconContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 275px;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin: 9px;
  cursor: pointer;
  h3,
  h4 {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 12px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #078632;
  margin-right: 22px;
  position: relative;
`;

const Divider = styled.div`
  position: absolute;
  left: -20px;
  width: 1px;
  background-color: #cfcfcf;
`;
