type StatusColorMap = {
  'in-progress': string;
  recieved: string;
};

export const orderStatusTagColorMapping = (status: string): string => {
  const map: StatusColorMap = { 'in-progress': 'blue', recieved: 'orange' };
  return (map as Record<string, string>)[status] || 'green';
};

enum OrderStatus {
  InProgress = 'in-progress',
  Received = 'recieved',
  Billed = 'Billed',
  Cancelled = 'cancel',
  All = 'All',
}

export const orderStatusOptions = [
  { label: 'All', value: OrderStatus.All },
  { label: 'In Progress', value: OrderStatus.InProgress },
  { label: 'Received', value: OrderStatus.Received },
  { label: 'Billed', value: OrderStatus.Billed },
  { label: 'Cancelled', value: OrderStatus.Cancelled },
];
