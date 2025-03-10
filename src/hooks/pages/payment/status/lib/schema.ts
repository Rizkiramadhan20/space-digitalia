import { Timestamp } from "firebase/firestore";

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  streetAddress: string;
  details: string;
  postalCode: string;
}

export interface PaymentDetails {
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
  linkStatus?: string;
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
}

export interface TransactionData {
  amount: number;
  createdAt: Timestamp;
  deliveryMethod: string;
  licenseType: string;
  orderId: string;
  paymentToken: string;
  projectId: string;
  projectTitle: string;
  redirectUrl: string;
  status: string;
  transactionId: string;
  updatedAt: Timestamp;
  userEmail: string;
  userId: string;
  userName: string;
  downloadUrl?: string | null;
  imageUrl?: string;
  userPhotoURL: string;
  paymentDetails?: PaymentDetails;
  paymentMethod: string;
  deliveryAddress?: DeliveryAddress;
  linkTransaction?: string;
  statusDelivery?: string | null;
}

export interface PaymentStatusContentProps {
  transactionId: string;
}
