import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useTicketTypes() {
  const token = useToken();
  
  const {
    data: tycketsType,
    loading: tycketsTypeLoading,
    error: tycketsTypeError,
    act: getTycketsType
  } = useAsync(() => paymentApi.getTicketTypes(token), true);

  return {
    tycketsType,
    tycketsTypeLoading,
    tycketsTypeError,
    getTycketsType
  };
}
