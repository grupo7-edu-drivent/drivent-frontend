import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useTicketTypes() {
  const token = useToken();
  
  const {
    data: ticketsType,
    loading: ticketsTypeLoading,
    error: ticketsTypeError,
    act: getTicketsType
  } = useAsync(() => paymentApi.getTicketTypes(token), true);

  return {
    ticketsType,
    ticketsTypeLoading,
    ticketsTypeError,
    getTicketsType
  };
}
