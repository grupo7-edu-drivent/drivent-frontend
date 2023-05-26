import React from 'react';
import styled from 'styled-components';
import ActivityCard from './../ActivityCard';

export default function ActivityRooms({ activities }) {
  const uniqueRoomTitles = ['Auditório Principal', 'Auditório Lateral', 'Sala de Workshop'];

  const renderRoomTitles = () => {
    return uniqueRoomTitles.map((roomTitle, index) => <RoomTitle key={index}>{roomTitle}</RoomTitle>);
  };

  return (
    <Table>
      <thead>
        <tr>{renderRoomTitles()}</tr>
      </thead>
      <tbody>
        <tr>
          {uniqueRoomTitles.map((roomTitle, index) => (
            <Column key={index}>
              {activities.map((activity) => {
                if (activity.roomTitle === roomTitle) {
                  return <ActivityCard key={activity.id} activity={activity} />;
                }
                return null;
              })}
            </Column>
          ))}
        </tr>
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  height: 25rem;
  table-layout: fixed;
  margin-top: 40px;
`;

const Column = styled.td`
  width: 33.33%;
  border: 1px solid #d7d7d7;
  text-align: center;
`;

const RoomTitle = styled.th`
  position: sticky;
  top: 0;
  padding: 10px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #7b7b7b;
`;
