import { createContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getTicketPaidByUser } from '../services/ticketApi';

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useLocalStorage('userData', {});
  const [paymentEvent, setPaymentEvent] = useState(false);
  const [hasHotelEvent, setHasHotelEvent] = useState(false);
  const [ loadUseEffect, setLoadUseEffect ] = useState(false);

  useEffect(() => {
    verifyPayment();
  }, [loadUseEffect]);

  async function verifyPayment() {
    try {
      const ticket = await getTicketPaidByUser(userData.token);
      console.log(ticket);
      if(ticket.status === 'PAID') {
        console.log('entrou!');
        setPaymentEvent(true);
      }
      if(ticket.TicketType.isRemote === false && ticket.TicketType.includesHotel === true) {
        console.log('entrou hotel');
        setHasHotelEvent(true);
      }
    } catch (error) {
      setPaymentEvent(false);
      setHasHotelEvent(false);
    }
  }
  
  return (
    <UserContext.Provider value={{ userData, setUserData, paymentEvent, setPaymentEvent, hasHotelEvent, setHasHotelEvent, loadUseEffect, setLoadUseEffect }}>
      {children}
    </UserContext.Provider>
  );
}
