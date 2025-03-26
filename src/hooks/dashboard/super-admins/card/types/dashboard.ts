export interface WeatherState {
    temp: number | null;
    condition: string;
    city: string;
    error: string | null;
}

export interface DashboardStats {
    totalTransactions: number;
    totalProducts: number;
    totalAccounts: number;
    totalTestimonials: number;
    totalArticles: number;
}

export interface SalesDataItem {
    name: string;
    value: number;
}

export interface CategoryDataItem {
    name: string;
    value: number;
    color: string;
}

export interface TopSellingItem {
    id: string;
    name: string;
    image: string;
    sales: number;
    trend: string;
}

export interface Transaction {
    id: string;
    date: Date;
    amount: number;
    productDetails: {
        title: string;
        image: string;
    };
}

export interface UserTransaction {
    userId: string;
    fullName: string;
    email: string;
    photoURL: string;
    totalAmount: number;
    transactions: Transaction[];
    lastTransactionDate: Date;
}

export interface RecapStats {
    totalAmount: number;
    successAmount: number;
    successTransactions: number;
    pendingAmount: number;
    pendingTransactions: number;
    failedAmount: number;
    failedTransactions: number;
    averageTransactionValue: number;
    totalTransactions: number;
    userTransactions: UserTransaction[];
}

export interface ChartData {
    salesData: SalesDataItem[];
    categoryData: CategoryDataItem[];
    topSellingItems: TopSellingItem[];
    loading: boolean;
    filterSalesByDate: (date: Date | null, period: string) => void;
}

export interface RecapStatistics {
    totalAmount: number;
    successAmount: number;
    successTransactions: number;
    pendingAmount: number;
    pendingTransactions: number;
    failedAmount: number;
    failedTransactions: number;
    averageTransactionValue: number;
    totalTransactions: number;
    userTransactions: UserTransaction[];
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    phoneNumber?: string;
    role?: string;
    photoURL?: string | undefined;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
}

export interface WelcomeSectionProps {
    user: User | null;
    currentTime: Date;
}

export interface UserTransactionSectionProps {
    userTransactions: UserTransaction[];
}

export interface CategoryDistributionSectionProps {
    categoryData: CategoryDataItem[];
}

export interface RecapAnalysisSectionProps {
    recapStats: RecapStatistics;
}

export interface StatsSectionProps {
    stats: DashboardStats;
    weather: WeatherState;
}

export interface WeatherState {
    temp: number | null;
    condition: string;
    city: string;
    error: string | null;
}

export interface TopSellingItem {
    id: string;
    name: string;
    image: string;
    sales: number;
    trend: string;
}

export interface TopSellingSectionProps {
    topSellingItems: TopSellingItem[];
}