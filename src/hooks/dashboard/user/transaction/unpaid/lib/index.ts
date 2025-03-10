import { Timestamp } from "firebase/firestore";

export interface VirtualAccountNumber {
  bank: string;
  va_number: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  projectId: string;
  projectTitle: string;
  imageUrl: string;
  amount: number;
  status: string;
  statusDelivery: string;
  licenseType: string;
  deliveryMethod: string;
  paymentMethod: string;
  userName: string;
  userEmail: string;
  userId: string;
  linkTransaction: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paymentToken?: string;
  transactionId?: string;
  paymentDetails?: {
    status_code?: string;
    status_message?: string;
    transaction_status?: string;
    transaction_id?: string;
    transaction_time?: string;
    payment_type?: string;
    finish_redirect_url?: string;
    gross_amount?: string;
    fraud_status?: string;
    permata_va_number?: string;
    va_numbers: Array<{
      bank: string;
      va_number: string;
    }>;
  };
  deliveryAddress?: {
    fullName: string;
    phone: string;
    streetAddress: string;
    city: string;
    district: string;
    province: string;
    postalCode: string;
    details: string;
  };
  downloadUrl?: string | null;
  redirectUrl?: string;
  pdfUrl?: string;
}

export interface MidtransResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  transaction_status: string;
  transaction_time: string;
  finish_redirect_url?: string;
  permata_va_number?: string;
  payment_type: string;
  gross_amount: string;
  fraud_status: string;
  va_numbers: VirtualAccountNumber[];
}
