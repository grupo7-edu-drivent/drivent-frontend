import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';
import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';

export function useBookingByRoom(roomId) {
  const token = useToken();

  const { data: bookingsByRoomId } = useAsync(() => hotelApi.getBookingByRoomId(token, roomId));

  return {
    bookingsByRoomId,
  };
}

export function useCreateBooking() {
  const { 
    loading: createBookingLoading,
    error: createBookingError,
    act: createBookingAct 
  } = useAsync(() => bookingApi.createBooking, false);

  return {
    createBookingLoading,
    createBookingError,
    createBookingAct
  };
}
