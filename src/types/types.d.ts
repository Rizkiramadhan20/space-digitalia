interface Window {
  snap: {
    pay: (
      snapToken: string,
      options: {
        onSuccess: (result: MidtransResult) => void;
        onPending: (result: MidtransResult) => void;
        onError: (result: MidtransResult) => void;
        onClose: () => void;
      }
    ) => void;
  };
}

export interface MidtransResult {
  transaction_status: string;
  status_code: string;
  status_message: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  finish_redirect_url?: string;
}
