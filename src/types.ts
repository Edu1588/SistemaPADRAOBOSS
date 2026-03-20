export interface Service {
  id: string;
  name: string;
  price: string;
  icon: string;
  image?: string;
}

export interface Booking {
  id: number;
  date: string;
  time: string;
  serviceId: string;
  customerName: string;
  phone: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
}
