import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';
import useAsync from '../useAsync';

export default function useHotel() {
  const token = useToken();

  const { data } = useAsync(() => hotelApi.getHotels(token));

  return {
    data,
  };
}
