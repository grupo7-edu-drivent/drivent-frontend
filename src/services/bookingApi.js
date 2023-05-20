import useToken from '../hooks/useToken';
import api from './api';

export async function createBooking(token, roomId) {
  const response = await api.post('/booking', { roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function listBooking(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
