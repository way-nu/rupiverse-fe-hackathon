import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Linking } from 'react-native';
import { useState } from 'react';

import { useSingleFlight } from '@/hooks/use-single-flight';
import { fetchTripRecommendations } from '@/services/trips';
import { DEFAULT_BUDGET, DEFAULT_ORIGIN, DEFAULT_TRAVELERS } from '@/modules/trips/constants';

export function useTrips() {
    const [origin, setOrigin] = useState(DEFAULT_ORIGIN);
    const [budget, setBudget] = useState(DEFAULT_BUDGET);
    const singleFlight = useSingleFlight();
    const search = useMutation({ mutationFn: fetchTripRecommendations });

    const tripBudgetINR = Number(budget || 0);

    return {
        origin,
        setOrigin,
        budget,
        setBudget: (v: string) => setBudget(v.replace(/\D/g, '').slice(0, 9)),
        canSearch: origin.trim().length >= 2 && tripBudgetINR > 0,
        loading: search.isPending,
        error: search.isError ? 'Trip search is temporarily unavailable. Please try again.' : null,
        data: search.data,
        find: () =>
            singleFlight(() => search.mutateAsync({ origin: origin.trim(), tripBudgetINR, travelers: DEFAULT_TRAVELERS }).catch(() => undefined)),
        openSource: (url: string) => Linking.openURL(url),
        back: () => router.back(),
    };
}
