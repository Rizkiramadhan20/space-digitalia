import { Timestamp } from "firebase/firestore";

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  streetAddress: string;
  details?: string;
}

export interface PaymentDetails {
  payment_type: string;
  transaction_status: string;
  fraud_status: string;
  transaction_time: string;
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
}

export interface Transaction {
  id: string;
  orderId: string;
  projectId: string;
  projectTitle: string;
  imageUrl: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  status: string;
  licenseType: string;
  deliveryMethod: string;
  statusDelivery?: string;
  paymentMethod: string;
  paymentDetails?: PaymentDetails;
  deliveryAddress?: DeliveryAddress;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userPhotoURL?: string;
}

export interface DeleteConfirmationModalProps {
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface TransactionCardProps {
  transaction: Transaction;
  onViewDetails: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export interface TransactionDetailsModalProps {
  transaction: Transaction;
  onClose: () => void;
}

export interface TransactionListProps {
  transactions: Transaction[];
  onViewDetails: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}
