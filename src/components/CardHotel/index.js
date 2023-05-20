import styled from 'styled-components';
import useRoom from '../../hooks/api/useRoom';
import { useState } from 'react';
import { useEffect } from 'react';
import TypeAccommodation from '../TypeAccommodation';

export default function CardHotel({ setRooms, item, select, setSelectHotel }) {
  const { id, name, image } = item;
  const { data } = useRoom(id);
  const [typeRoomList, setTypeRoomList] = useState(null);
  const [capacity, setCapacity] = useState(null);

  useEffect(() => {
    if (data) {
      const rooms = data.Rooms;
      const typesRooms = rooms.map((item) => item.capacity);
      setTypeRoomList(typesRooms);
      let countCapacity = 0;
      rooms.forEach((item) => {
        return countCapacity += item.capacity;
      });

      setCapacity(countCapacity);
    }
  }, [data]);

  function handleSelectCardHotel() {
    setRooms(data.Rooms);
    setSelectHotel(item.id);
  }

  return (
    <ContainerCardHotel select={select} id={item.id} onClick={handleSelectCardHotel}>
      <ImageCard src={image} alt="Imagem do hotel" />
      <TitleCard>{name}</TitleCard>
      <TitleInfosCard>Tipos de acomodação:</TitleInfosCard>
      <TypeAccommodation types={typeRoomList} />
      <TitleInfosCard>Vagas disponíveis:</TitleInfosCard>
      <InfoCapacity>{capacity}</InfoCapacity>
    </ContainerCardHotel>
  );
}

const ContainerCardHotel = styled.div`
  width: 20%;
  padding: 16px;
  background: ${(props) => props.select === props.id ? '#FFEED2' : '#F1F1F1'};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  cursor: pointer;
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

const InfoCapacity = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #3c3c3c;
  margin-bottom: 14px;
`;
