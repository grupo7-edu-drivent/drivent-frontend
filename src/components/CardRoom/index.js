import { IoPersonOutline, IoPerson } from 'react-icons/io5';
import styled from 'styled-components';
import { useBookingByRoom } from '../../hooks/api/useBooking';
import { useEffect, useState } from 'react';

export default function CardRoom({ item, select, setSelectRoom }) {
  console.log(item);
  const { name, capacity } = item;
  const { bookingsByRoomId } = useBookingByRoom(item.id);
  const [listRoom, setListRoom] = useState([]);
 
  useEffect(() => {
    setSelectRoom(null);
    if(bookingsByRoomId) {
      let list = [];
      for(let i = 0; i < capacity - bookingsByRoomId.length; i++) {
        list.push(1);
      };
      setListRoom(list);
    }
  }, [bookingsByRoomId]);

  function handleCardRoom() {
    if(listRoom.length > 0) return setSelectRoom(item.id);
  }

  return (
    <ContainerCardRoom disabled={listRoom.length === 0} select={select} id={item.id} listRoom={listRoom} onClick={handleCardRoom}>
      <NameRoom>{name}</NameRoom>
      <ContainerPersons>
        {listRoom.length > 0 && listRoom.map((item, i) => 
          (<IconPerson key={i}>
            <IoPersonOutline/>
          </IconPerson >
          )
        )}
        {
          bookingsByRoomId && bookingsByRoomId.map((item, i) => <IconPerson key={i} list={listRoom.length === 0 && '#8C8C8C'}><IoPerson/></IconPerson>)
        }
      </ContainerPersons>
    </ContainerCardRoom>
  );
}

const ContainerCardRoom = styled.span`
  display: flex;
  align-items: center;
  padding: 11px 16px;
  border: 1px solid #CECECE;
  background: ${(props) => props.select === props.id ? '#FFEED2' : props.listRoom.length === 0 ? '#E9E9E9' : null};
  border-radius: 10px;
  margin-right: 17px;
  cursor: ${(props) => props.listRoom.length > 0 && 'pointer'};
`;

const NameRoom = styled.div`
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 20px;
  color: #454545;
`;

const ContainerPersons = styled.div`
  display: flex;
  margin-left: 80px;
`;

const IconPerson = styled.div`
  font-size: 20px;
  color: ${(props) => props.list};
`;
