import apiClient from '../apiClient';

export const fetchBuses = async (from: string, to: string, date: string) => {
  const {data} = await apiClient.post('/api/bus/search', {
    from,
    to,
    date,
  });
  return data?.data || [];
};

export const fetchBusDetails = async (busId: string) => {
  const {data} = await apiClient.get(`/api/bus/${busId}`);
  return data?.data || [];
};

export const fetchUserTickets = async () => {
  const {data} = await apiClient.get('/api/ticket/my-tickets');
  return data?.tickets;
};

export const bookTicket = async ({
  busId,
  date,
  seatNumbers,
}: {
  busId: string;
  date: string;
  seatNumbers: number[];
}) => {
  const {data} = await apiClient.post('/api/ticket/book', {
    busId,
    date,
    seatNumbers,
  });
  return data?.ticket;
};
