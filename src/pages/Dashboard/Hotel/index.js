import { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';
import SelectHotelAndRooms from '../../../components/SelectHotelAndRoom';
import Loader from 'react-loader-spinner';
import Booking from '../../../components/Booking';
import { listBooking } from '../../../services/bookingApi';
import { getRooms } from '../../../services/hotelApi';

export default function Hotel() {
  const token = useToken();
  const [ booking, setBooking ] = useState(null); 
  const [ loading, setLoading ] = useState(true);
  const [rooms, setRooms] = useState(null);

  useEffect(async() => {
    getListBooking();
  }, [loading]);

  async function getListBooking() {
    try {
      const response = await listBooking(token);
      const roomsData = await getRooms(token, response.Room.Hotel.id);
      setBooking(response);
      setRooms(roomsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  if(loading) {
    return (
      <Loading>
        <Loader color="#000" height={50} width={50} type="Oval"/>
      </Loading>
    );
  }

  return (
    <MainContainer>
      <TitlePage>Escolha de Hotel e quarto</TitlePage>
      {booking ? (<Booking token={token} rooms={rooms} setRooms={setRooms} loading={loading} setLoading={setLoading} booking={booking}/>) 
        : (<SelectHotelAndRooms token={token} loading={loading} setLoading={setLoading} booking={booking} />)
      }
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
`;

const TitlePage = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 34px;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
`;
