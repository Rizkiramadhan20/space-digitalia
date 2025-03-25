import { useState, useEffect } from 'react'

import { database } from '@/utils/firebase'

import { ref, onValue } from 'firebase/database'

import { Subscriber } from '@/hooks/dashboard/super-admins/subscription/lib/subscriber'

export const useSubscribers = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscribersRef = ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_SUBSCRIBERS);

        const unsubscribe = onValue(subscribersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const subscribersArray = Object.entries(data).map(([, value]) => ({
                    ...(value as Subscriber)
                }));
                setSubscribers(subscribersArray);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { subscribers, loading };
}