import { createContext, useState } from 'react';

import Splash from '../components/Splash';

import useEvent from '../hooks/api/useEvent';

const EventInfoContext = createContext();
export default EventInfoContext;

export function EventInfoProvider({ children }) {
  const { event, eventLoading, eventError } = useEvent();
  const [paymentEvent, setPaymentEvent] = useState(false);
  const [hasHotelEvent, setHasHotelEvent] = useState(false);

  if (eventLoading) {
    return <Splash loading />;
  }

  if (eventError) {
    let message = eventError.response
      ? eventError.response.data.message
      : 'Could not connect to server. Please try again later.';
    return <Splash message={message} />;
  }

  return (
    <EventInfoContext.Provider
      value={{
        eventInfo: event,
        eventInfoError: eventError,
        paymentEvent,
        setPaymentEvent,
        hasHotelEvent,
        setHasHotelEvent,
      }}
    >
      {children}
    </EventInfoContext.Provider>
  );
}
