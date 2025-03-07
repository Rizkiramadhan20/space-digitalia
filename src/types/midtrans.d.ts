export interface MidtransResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status?: string;
  payment_code?: string;
  pdf_url?: string;
  finish_redirect_url?: string;
}

export interface SnapConfig {
  isProduction: boolean;
  serverKey: string;
  clientKey: string;
}

export interface TransactionDetails {
  order_id: string;
  gross_amount: number;
}

export interface CustomerDetails {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export interface ItemDetails {
  id: string;
  price: number;
  quantity: number;
  name: string;
  category?: string;
}

export interface TransactionOptions {
  transaction_details: TransactionDetails;
  credit_card?: {
    secure?: boolean;
  };
  customer_details?: CustomerDetails;
  item_details?: ItemDetails[];
  callbacks?: {
    finish?: string;
    error?: string;
    pending?: string;
  };
}

export interface TransactionResponse {
  token: string;
  redirect_url: string;
}

declare global {
  interface Window {
    MidtransClientKey: string;
    snap: {
      pay: (
        snapToken: string,
        options: {
          onSuccess: (result: MidtransResult) => void | Promise<void>;
          onPending: (result: MidtransResult) => void;
          onError: (result: MidtransResult) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}

declare module "midtrans-client" {
  interface SnapConstructor {
    new (options: SnapConfig): {
      createTransaction(
        options: TransactionOptions
      ): Promise<TransactionResponse>;
    };
  }

  interface MidtransClient {
    Snap: SnapConstructor;
  }

  const midtransClient: MidtransClient;
  export = midtransClient;
}
