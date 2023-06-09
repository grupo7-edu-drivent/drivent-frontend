import styled from 'styled-components';
import CardBooking from '../CardBooking';
import { useState } from 'react';
import SelectHotelAndRooms from '../SelectHotelAndRoom';

export default function Booking({ token, rooms, setRooms, loading, setLoading, booking }) {
  const [ alterRoom, setAlterRoom ] = useState(false);

  return (
    <>
      <ContainerOptions>
        <InfoOptionBooking>Você já escolheu seu quarto:</InfoOptionBooking>
        <CardBooking booking={booking}/> 
        {!alterRoom ? (<ButtonAlterRoom onClick={() => setAlterRoom(true)}>TROCAR DE QUARTO</ButtonAlterRoom>) :
          <SelectHotelAndRooms token={token} rooms={rooms} setRooms={setRooms} loading={loading} setLoading={setLoading} booking={booking} setAlterRoom={setAlterRoom} />
        }
      </ContainerOptions>
    </>
  );
}

const ContainerOptions = styled.div`
  width: 100%;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
`;

const InfoOptionBooking = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
`;
const ButtonAlterRoom = styled.button`
  width: 25%;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 10px 25px;
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  margin-top: 40px;
`;

const ContainerRooms = styled.div`
  width: 100%;
  margin-top: 36px;
`;

const ContainerListRooms = styled.div`
  width: 100%;
  display: flex;
  margin-top: 18px;
`;

const InfoFirstRoom = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  color: #8e8e8e;
`;

const Button = styled.button`
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  padding: 10px 30px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  cursor: pointer;
  margin-top: 50px;
  margin-right: 20px;
`;
