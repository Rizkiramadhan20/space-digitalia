import { Timestamp } from "firebase/firestore";

export interface Transaction {
  id: string;
  amount: number;
  createdAt: Timestamp;
  deliveryAddress: null | string;
  deliveryMethod: string;
  imageUrl: string;
  licenseType: string;
  linkTransaction: string;
  orderId: string;
  paymentMethod: string;
  projectId: string;
  projectTitle: string;
  status: string;
  statusDelivery: null | string;
  updatedAt: Timestamp;
  userEmail: string;
  userId: string;
  userName: string;
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
  downloadUrl: string;
  paymentToken: string;
  redirectUrl: string;
  transactionId: string;
}

// Add this script to your HTML head or import it in your _app.tsx
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: MidtransResult) => void;
          onPending: (result: MidtransResult) => void;
          onError: (result: MidtransResult) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}
