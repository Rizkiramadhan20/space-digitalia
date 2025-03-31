import { Timestamp } from "firebase/firestore";

export interface Transaction {
  id: string;
  amount: number;
  createdAt: Timestamp;
  deliveryMethod: string;
  imageUrl: string;
  licenseType: string;
  linkTransaction: string;
  orderId: string;
  paymentMethod: string;
  projectId: string;
  projectTitle: string;
  status: string;
  userPhotoURL: string;
  statusDelivery: null | string;
  updatedAt: Timestamp;
  userEmail: string;
  userId: string;
  userName: string;
  deliveryAddress: {
    address: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
    details: string;
    district: string;
    fullName: string;
    phone: string;
    streetAddress: string;
  };
  paymentDetails: {
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
    va_numbers: Array<{
      bank: string;
      va_number: string;
    }>;
  };
}

export interface TransactionDetailsModalProps {
  transaction: Transaction;
  onClose: () => void;
  handleClickOutside: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface TransactionCardProps {
  transaction: Transaction;
  onViewDetails: (transaction: Transaction) => void;
}
