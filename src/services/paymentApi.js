import api from './api';

export async function getTicketTypes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function reserveTicket(token, ticketTypeId) {
  const response = await api.post(
    '/tickets',
    { ticketTypeId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}

export async function paymentProcess(token, ticketId, cardData) {
  const body = {
    ticketId,
    cardData
  };
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } );

  return response;
}

export async function getPaymentByTicketId(token, ticketId) {
  const response = await api.get(`/payments?ticketId=${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } );

  return response.data;
}
