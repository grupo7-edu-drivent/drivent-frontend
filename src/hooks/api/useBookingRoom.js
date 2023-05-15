import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';
import useAsync from '../useAsync';

export default function useBookingRoom(roomId) {
  const token = useToken();

  const { data: bookingsByRoomId } = useAsync(() => hotelApi.getBookingByRoomId(token, roomId));

  return {
    bookingsByRoomId,
  };
}
