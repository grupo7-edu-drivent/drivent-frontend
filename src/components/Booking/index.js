import styled from 'styled-components';
import CardBooking from '../CardBooking';
import { useState } from 'react';
import CardRoom from '../CardRoom';
import { toast } from 'react-toastify';
import { alterRoomBooking } from '../../services/bookingApi';

export default function Booking({ token, booking, rooms, loading, setLoading }) {
  const [ alterRoom, setAlterRoom ] = useState(false);
  const [ selectRoom, setSelectRoom ] = useState(null);

  function cancel() {
    setSelectRoom(null);
    setAlterRoom(false);
  }

  async function handleAlterRoom() {
    try {
      await alterRoomBooking(token, booking.id, selectRoom);
      setLoading(!loading);
      toast('Quarto alterado com sucesso!');
    } catch (error) {
      cancel();
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
    <MainContainer>
      <TitlePage>Escolha de Hotel e quarto</TitlePage>
      <ContainerOptions>
        <InfoOptionBooking>Você já escolheu seu quarto:</InfoOptionBooking>
        <CardBooking booking={booking}/>
        {!alterRoom ? 
          (<ButtonAlterRoom onClick={() => setAlterRoom(true)}>TROCAR DE QUARTO</ButtonAlterRoom>) : 
          (<ContainerRooms>
            <InfoFirstRoom>Ótima pedida! Agora escolha seu quarto:</InfoFirstRoom>
            <ContainerListRooms>
              {rooms.Rooms.map((item) => <CardRoom key={item.id} item={item} select={selectRoom} setSelectRoom={setSelectRoom}/>)}
            </ContainerListRooms>
            <Button onClick={handleAlterRoom}>ALTERAR QUARTO</Button>
            <Button onClick={cancel}>CANCELAR</Button>
          </ContainerRooms>)
        }
      </ContainerOptions>
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
