import api from './api';

export async function getTicketTypes(token) {
  const response = await api.get('/tyckets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
