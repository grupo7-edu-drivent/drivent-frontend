import { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useToken from '../../../hooks/useToken';
import SelectHotelAndRooms from '../../../components/SelectHotelAndRoom';
import Loader from 'react-loader-spinner';
import Booking from '../../../components/Booking';
import { listBooking } from '../../../services/bookingApi';

export default function Hotel() {
  const token = useToken();
  const [ booking, setBooking ] = useState(null); 
  const [ loading, setLoading ] = useState(true);
  const [rooms, setRooms] = useState(null);

  useEffect(async() => {
    try {
      const response = await listBooking(token);
      setBooking(response);
      setLoading(false);
    } catch (error) {
      toast('Faça sua reserva! 🤗');
      setLoading(false);
    }
  }, []);

  if(loading) {
    return (
      <Loading>
        <Loader color="#000" height={50} width={50} type="Oval"/>
      </Loading>
    );
  }
   
  if(booking) {
    return (
      <Booking booking={booking} />
    );
  };

  return <SelectHotelAndRooms token={token} setBooking={setBooking} rooms={rooms} setRooms={setRooms} />;
}

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
`;
