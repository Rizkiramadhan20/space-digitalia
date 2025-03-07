declare module "midtrans-client" {
  interface SnapConfig {
    isProduction: boolean;
    serverKey: string | undefined;
    clientKey: string | undefined;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface CustomerDetails {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  }

  interface TransactionParameter {
    transaction_details: TransactionDetails;
    customer_details?: CustomerDetails;
    credit_card?: {
      secure?: boolean;
      save_card?: boolean;
    };
    [key: string]: unknown;
  }

  interface TransactionResponse {
    token: string;
    redirect_url: string;
    status_code: string;
    transaction_id: string;
    [key: string]: unknown;
  }

  class Snap {
    constructor(config: SnapConfig);
    createTransaction(
      parameter: TransactionParameter
    ): Promise<TransactionResponse>;
    createTransactionToken(parameter: TransactionParameter): Promise<string>;
    createTransactionRedirectUrl(
      parameter: TransactionParameter
    ): Promise<string>;
  }

  export = {
    Snap: Snap,
  };
}
