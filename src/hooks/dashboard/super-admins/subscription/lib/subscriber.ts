export interface Subscriber {
    id: string;
    email: string;
    timestamp: string;
}

// Filter Section Props
export interface FilterSectionProps {
    showFilter: boolean;
    filterEmail: string;
    setFilterEmail: (email: string) => void;
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
}

// Subscriber Grid Props
export interface SubscriberGridProps {
    subscribers: Subscriber[];
}

// Subscriber Header Props
export interface SubscriberHeaderProps {
    showFilter: boolean;
    setShowFilter: (show: boolean) => void;
}