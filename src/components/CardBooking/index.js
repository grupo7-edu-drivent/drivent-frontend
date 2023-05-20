import styled from 'styled-components';
import { useBookingByRoom } from '../../hooks/api/useBooking';
import { useState } from 'react';
import { useEffect } from 'react';

export default function CardBooking({ booking }) {
  const { bookingsByRoomId } = useBookingByRoom(booking.Room.id);
  const { image, name: hotelName } = booking.Room.Hotel;
  const { name: RoomName } = booking.Room;
  const [ qtyPeoples, setQtyPeoples ] = useState('');
  let typeAccomodation = '';

  switch(booking.Room.capacity) {
  case 1:
    typeAccomodation = 'Single';
    break;
  case 2:
    typeAccomodation = 'Double';
    break;
  case 3:
    typeAccomodation = 'Triple';
    break;
  default:
    typeAccomodation = 'Other';
    break;
  }

  useEffect(() => {
    if(bookingsByRoomId) {
      if(bookingsByRoomId.length > 1) {
        const qty = bookingsByRoomId.length - 1;
        setQtyPeoples(` e mais ${qty}`);
      }
    }
  }, [bookingsByRoomId]);

  return (
    <MainContainer>
      <ImageCard src={image}></ImageCard>
      <TitleCard>{hotelName}</TitleCard>
      <TitleInfosCard>Quarto reservado</TitleInfosCard>
      <InfoAdditional>{RoomName}({typeAccomodation})</InfoAdditional>
      <TitleInfosCard>Pessoas no seu quarto</TitleInfosCard>
      <InfoAdditional>Você{qtyPeoples && (qtyPeoples)}</InfoAdditional>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 25%;
  background: #FFEED2;
  border-radius: 10px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  margin-top: 14px;
`;

const ImageCard = styled.img`
  width: 100%;
  height: 50%;
  border-radius: 5px;
  object-fit: fill;
`;

const TitleCard = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #343434;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleInfosCard = styled.h2`
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #3c3c3c;
`;

const InfoAdditional = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #3C3C3C;
  margin-bottom: 14px;
`;
