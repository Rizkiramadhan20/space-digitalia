import { Timestamp } from "firebase/firestore";

export interface Transaction {
  id: string;
  status: string;
  amount: string;
  createdAt: Timestamp;
  deliveryMethod: string;
  imageUrl: string;
  licenseType: string;
  linkTransaction: string;
  orderId: string;
  paymentDetails: {
    fraud_status: string;
    gross_amount: string;
    order_id: string;
    payment_type: string;
    status_code: string;
    status_message: string;
    transaction_id: string;
    transaction_status: string;
    transaction_time: string;
    va_numbers: {
      bank: string;
      va_number: string;
    }[];
  };
  paymentMethod: string;
  paymentToken: string;
  projectId: string;
  statusDelivery: string;
  deliveryAddress: {
    city: string;
    details: string;
    district: string;
    fullName: string;
    phone: string;
    postalCode: string;
    province: string;
    streetAddress: string;
  };
  projectTitle: string;
  transactionId: string;
  updatedAt: Timestamp;
  userEmail: string;
  userId: string;
  userName: string;
  userPhotoURL: string;
}
