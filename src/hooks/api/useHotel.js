import useToken from '../useToken';
import * as hotelApi from '../../services/hotelApi';
import useAsync from '../useAsync';

export default function useHotel() {
  const token = useToken();

  const { data: dataGetHotels,
    loading: loadingGetHotels,
    error: errorGetHotels,
    act: actGetHotels } = useAsync(() => hotelApi.getHotels(token));

  return {
    dataGetHotels,
    loadingGetHotels,
    errorGetHotels,
    actGetHotels
  };
}
