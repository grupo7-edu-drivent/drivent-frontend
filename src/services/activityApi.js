import api from './api';

export async function postActivity(token, activityId) {
  const body = { activityId };

  const response = await api.post('/activity', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
