import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export function useTicketTypes() {
  const token = useToken();

  const {
    data: ticketsType,
    loading: ticketsTypeLoading,
    error: ticketsTypeError,
    act: getTicketsType,
  } = useAsync(() => paymentApi.getTicketTypes(token), true);

  return {
    ticketsType,
    ticketsTypeLoading,
    ticketsTypeError,
    getTicketsType,
  };
}

export function useCreateTicket(ticketTypeId) {
  const token = useToken();

  const {
    data: ticket,
    loading: createTicketLoading,
    error: createTicketError,
    act: reserveTicket,
  } = useAsync(() => paymentApi.reserveTicket(token, ticketTypeId));

  return {
    ticket,
    createTicketLoading,
    createTicketError,
    reserveTicket,
  };
}
