interface MidtransResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status?: string;
  currency: string;
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
}

interface DataLayerObject {
  event?: string;
  articleData?: {
    title: string;
    description: string;
    slug: string;
    url: string;
    imageUrl: string;
  };
  projectData?: {
    title: string;
    description: string;
    typeCategory: string;
    url: string;
    imageUrl: string;
  };
  [key: string]: unknown;
}

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
  dataLayer: DataLayerObject[];
}

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
