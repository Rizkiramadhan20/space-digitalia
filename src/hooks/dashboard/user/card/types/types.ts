import { ReactNode } from "react";

// Types for the chart data
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
  amount: number;
  paymentType: string;
  status: string;
}

export interface PaymentMethodStats {
  download: number;
  delivery: number;
}

export interface Stats {
  totalTransactions: number;
  totalProducts: number;
}

export interface WeatherState {
  temp: number | null;
  condition: string;
  city: string;
  error: string | null;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface CategoryChartProps {
  categoryData: CategoryData[];
}

export interface TopSellingItem {
  id: string;
  name: string;
  image: string;
  amount: number;
  paymentType: string;
  status: string;
}

export interface RecentPurchasesProps {
  items: TopSellingItem[];
}

export interface SalesData {
  name: string;
  value: number;
}

export interface SalesChartProps {
  salesData: SalesData[];
}

export interface StatCardProps {
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  value: number | string;
  label: string;
  badgeText?: string;
  badgeBgColor?: string;
  badgeTextColor?: string;
}

export interface WeatherState {
  temp: number | null;
  condition: string;
  city: string;
  error: string | null;
}
