import { Timestamp } from "firebase/firestore";

export interface PaymentDetails {
  bill_key?: string;
  biller_code?: string;
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

export interface VaNumber {
  bank: string;
  va_number: string;
}

export interface Transaction {
  id: string;
  amount: number;
  createdAt: Timestamp;
  deliveryAddress: DeliveryAddress;
  deliveryMethod: string;
  downloadUrl: string | null;
  imageUrl: string;
  licenseType: string;
  linkTransaction: string;
  orderId: string;
  paymentDetails: PaymentDetails;
  paymentMethod: string;
  paymentToken: string;
  projectId: string;
  projectTitle: string;
  userPhotoURL: string;
  redirectUrl: string;
  status: string;
  statusDelivery: string;
  transactionId: string;
  updatedAt: Timestamp;
  userEmail: string;
  userId: string;
  userName: string;
}

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

export interface Filters {
  status: string[];
  paymentMethod: string[]; // This will now store 'delivery' or 'download'
  paymentType: string[];
}

export interface TransactionHeaderProps {
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (value: boolean) => void;
}

export interface TransactionStatsProps {
  filteredTransactions: Transaction[];
  transactions: Transaction[];
}

export interface TransactionGridProps {
  paginatedTransactions: Transaction[];
  setSelectedTransaction: (transaction: Transaction) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export interface ProjectOverviewProps {
  transaction: Transaction;
}

export interface UserInformationProps {
  transaction: Transaction;
}

export interface LicenseAndDeliveryProps {
  transaction: Transaction;
}

export interface DeliveryInformationProps {
  transaction: Transaction;
}

export interface FilterProps {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
  transactions: Transaction[];
  setFilteredTransactions: (transactions: Transaction[]) => void;
  applyFilters: () => void;
}

export interface TransactionModalProps {
  selectedTransaction: Transaction;
  handleClickOutside: (e: React.MouseEvent<HTMLDivElement>) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export interface PaymentDetailsProps {
  transaction: Transaction;
}

export interface QuickActionsProps {
  transaction: Transaction;
}

export interface TimestampsProps {
  transaction: Transaction;
}
