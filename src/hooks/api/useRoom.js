import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';
import useAsync from '../useAsync';

export default function useRoom(hotelId) {
  const token = useToken();

  const { data } = useAsync(() => hotelApi.getRooms(token, hotelId));

  return {
    data,
  };
}
