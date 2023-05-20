import styled from 'styled-components';
import CardBooking from '../CardBooking';

export default function Booking({ booking }) {
  return (
    <MainContainer>
      <TitlePage>Escolha de Hotel e quarto</TitlePage>
      <ContainerOptions>
        <InfoOptionBooking>Você já escolheu seu quarto:</InfoOptionBooking>
        <CardBooking booking={booking}/>
        <ButtonAlterRoom>TROCAR DE QUARTO</ButtonAlterRoom>
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
