import { Timestamp } from "firebase/firestore";

export interface DeliveryAddress {
  city: string;
  details: string;
  district: string;
  fullName: string;
  phone: string;
  postalCode: string;
  province: string;
  streetAddress: string;
}

export interface VaNumber {
  bank: string;
  va_number: string;
}

export interface PaymentDetails {
  bca_va_number: string;
  finish_redirect_url: string;
  fraud_status: string;
  gross_amount: string;
  order_id: string;
  payment_type: string;
  pdf_url: string;
  status_code: string;
  status_message: string;
  transaction_id: string;
  transaction_status: string;
  transaction_time: string;
  va_numbers: VaNumber[];
}

export interface Transaction {
  amount: number;
  createdAt: Timestamp;
  deliveryAddress: DeliveryAddress;
  deliveryMethod: string;
  downloadUrl: null | string;
  imageUrl: string;
  licenseType: string;
  linkTransaction: string;
  orderId: string;
  paymentDetails: PaymentDetails;
  paymentMethod: string;
  paymentToken: string;
  projectId: string;
  projectTitle: string;
  redirectUrl: string;
  status: string;
  statusDelivery: string;
  transactionId: string;
  updatedAt: Timestamp;
  userEmail: string;
  userId: string;
  userName: string;
}
