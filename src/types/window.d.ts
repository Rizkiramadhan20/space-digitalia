interface MidtransResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
}

interface Window {
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
