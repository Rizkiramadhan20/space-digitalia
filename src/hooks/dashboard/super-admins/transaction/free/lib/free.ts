import { Timestamp } from "firebase/firestore";

export interface Transaction {
  amount: number;
  createdAt: Timestamp;
  deliveryAddress: null;
  deliveryMethod: string;
  downloadUrl: string;
  imageUrl: string;
  isProcessing: boolean;
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
  };
  paymentMethod: string;
  projectId: string;
  projectTitle: string;
  status: string;
  transactionId: string;
  updatedAt: Timestamp;
  userEmail: string;
  userId: string;
  userName: string;
}
