import api from './api';

export async function getTicketByUser(token) {
  const response = await api.get('/tickets/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getTicketPaidByUser(token) {
  const response = await api.get('/tickets/paid', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
