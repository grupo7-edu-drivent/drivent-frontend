import { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { toast } from 'react-toastify';
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
    try {
      const response = await listBooking(token);
      const roomsData = await getRooms(token, response.Room.Hotel.id);
      setBooking(response);
      setRooms(roomsData);
      setLoading(false);
    } catch (error) {
      toast('Faça sua reserva! 🤗');
      setLoading(false);
    }
  }, [loading]);

  if(loading) {
    return (
      <Loading>
        <Loader color="#000" height={50} width={50} type="Oval"/>
      </Loading>
    );
  }
   
  if(booking) {
    return (
      <Booking loading={loading} setLoading={setLoading} token={token} booking={booking} rooms={rooms}/>
    );
  };

  return <SelectHotelAndRooms token={token} setBooking={setBooking} rooms={rooms} setRooms={setRooms} loading={loading} setLoading={setLoading}  />;
}

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
`;
