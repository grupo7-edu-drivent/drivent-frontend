import styled from 'styled-components';
import ActivityCard from './../ActivityCard';

export default function ActivityRooms() {
  return (
    <>
      <MainContainer>
        <h2>Auditório Principal</h2>
        <h2>Auditório Lateral</h2>
        <h2>Auditório Lateral</h2>
      </MainContainer>
      <Table>
        <tbody>
          <tr>
            <Column><ActivityCard/></Column>
            <Column></Column>
            <Column></Column>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 61px;
  justify-content: space-around;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  color: #7b7b7b;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  margin-top: 13px;
`;

const Column = styled.td`
  width: 33.33%;
  height: 350px;
  border: 1px solid #D7D7D7;
  text-align: center;
`;
