import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import CardHotel from '../CardHotel';
import CardRoom from '../CardRoom';
import { alterRoomBooking, createBooking, listBooking } from '../../services/bookingApi';
import { toast } from 'react-toastify';
import UserContext from '../../contexts/UserContext';
import { getHotels } from '../../services/hotelApi';

export default function SelectHotelAndRooms({ token, loading, setLoading, booking, setAlterRoom }) {
  const { paymentEvent, hasHotelEvent } = useContext(UserContext);
  const [selectHotel, setSelectHotel] = useState(null);
  const [selectRoom, setSelectRoom] = useState(null);
  const [ hotels, setHotels ] = useState(null);
  const [rooms, setRooms] = useState(null);

  useEffect(async() => {
    try {
      const hotelResponse = await getHotels(token);
      setHotels(hotelResponse);
    } catch (error) {
      console.log('Não tem quartos!');
    }
  }, []);

  function cancel() {
    setAlterRoom(false);
  }

  async function handleSubmitReserve() {
    try {
      await createBooking(token, selectRoom);
      setLoading(!loading);
      setSelectHotel(null);
      setSelectRoom(null);
      setHotels(null);
      setRooms(null);
      toast('Reserva realizada com sucesso!!');
    } catch (error) {
      toast.error('Erro ao reservar sua hospedagem!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }

  async function handleAlterRoom() {
    try {
      await alterRoomBooking(token, booking.id, selectRoom);
      setLoading(!loading);
      toast('Quarto alterado com sucesso!');
    } catch (error) {
      toast.error('Erro ao tentar alterar sua hospedagem', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }

  return (
    <>
      {!paymentEvent ? (
        <ContainerNotPayOfNotFound>
          <InfoCenter>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</InfoCenter>
        </ContainerNotPayOfNotFound>
      ) : !hasHotelEvent ? (
        <ContainerNotPayOfNotFound>
          <InfoCenter>
            Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades
          </InfoCenter>
        </ContainerNotPayOfNotFound>
      ) : (
        <>
          <ContainerHotels>
            <InfoFirstHotel>Primeiro, escolha seu hotel</InfoFirstHotel>
            <ContainerListHotels>
              {hotels && hotels.map((item) => <CardHotel setRooms={setRooms} key={item.id} select={selectHotel} setSelectHotel={setSelectHotel} item={item} />)}
            </ContainerListHotels>
          </ContainerHotels>
          {rooms && (
            <ContainerRooms>
              <InfoFirstRoom>Ótima pedida! Agora escolha seu quarto:</InfoFirstRoom>
              <ContainerListRooms>
                {rooms.map((item) => <CardRoom key={item.id} item={item} select={selectRoom} setSelectRoom={setSelectRoom}/>)}
              </ContainerListRooms>
              {!booking ? (<ButtonReserve onClick={handleSubmitReserve}>RESERVER QUARTO</ButtonReserve>) 
                : (<><ButtonAlter onClick={handleAlterRoom}>TROCAR DE QUARTO</ButtonAlter> <ButtonAlter onClick={cancel}>CANCELAR</ButtonAlter></>)}
            </ContainerRooms>
          )}
        </>
      )
      }
    </>
  );
}

const ContainerNotPayOfNotFound = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoCenter = styled.h4`
  width: 60%;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;

const ContainerHotels = styled.div`
  width: 100%;
  margin-top: 36px;
  margin-bottom: 36px;
`;

const InfoFirstHotel = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  color: #8e8e8e;
`;

const ContainerListHotels = styled.div`
  width: 100%;
  display: flex;
  margin-top: 18px;
`;

const ContainerRooms = styled.div`
  width: 100%;
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

const ButtonReserve = styled.button`
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
`;

const ButtonAlter = styled.button`
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
  margin-bottom: 20px;
`;
