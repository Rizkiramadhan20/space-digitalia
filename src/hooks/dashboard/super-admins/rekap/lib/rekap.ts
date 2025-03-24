import { Timestamp } from "firebase/firestore";

export interface PaymentDetails {
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
}

export interface UserDetails {
    accountType: string;
    email: string;
    fullName: string;
    id: string;
    photoURL: string;
    userId: string;
}

export interface Transaction {
    amount: number;
    createdAt: Timestamp;
    deliveryMethod: string;
    downloadUrl: null | string;
    imageUrl: string;
    licenseType: string;
    linkTransaction: string;
    orderId: string;
    paymentDetails: PaymentDetails;
    paymentMethod: string;
    paymentToken: string;
    projectId: string;
    projectTitle: string;
    rating: number;
    redirectUrl: string;
    review: string;
    status: string;
    statusDelivery: string;
    transactionId: string;
    updatedAt: Timestamp;
    userEmail: string;
    userId: string;
    userName: string;
    userPhotoURL: string;
}

// Define interface for chart data
export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        tension: number;
        fill: boolean;
        borderWidth?: number;
        pointBackgroundColor?: string;
        pointBorderColor?: string;
        pointHoverRadius?: number;
        pointHoverBorderWidth?: number;
        pointHoverBackgroundColor?: string;
        pointHoverBorderColor?: string;
    }[];
}