export interface Transaction {
  orderId: string;
  projectId: string;
  userId: string;
  amount: number;
  projectTitle: string;
  licenseType: string;
  deliveryMethod: "download" | "delivery";
  status: "pending" | "success" | "failed" | "expired";
  createdAt: Date;
  updatedAt: Date;
  paymentToken: string;
  redirectUrl: string;
}
