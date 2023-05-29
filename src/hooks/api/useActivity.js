import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitytApi from '../../services/activityApi';

export function useCreateTicket(activityId) {
  const token = useToken();

  const {
    data: activity,
    loading: createActivityLoading,
    error: createActivityError,
    act: reserveActivity,
  } = useAsync(() => activitytApi.postActivity(token, activityId));

  return {
    activity,
    createActivityLoading,
    createActivityError,
    reserveActivity,
  };
}
