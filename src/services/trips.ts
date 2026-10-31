import { Endpoints } from '@/constants/api';
import { http } from '@/services/http-client';
import type { TripRecommendationInput, TripRecommendations } from '@/types';

export const fetchTripRecommendations = (input: TripRecommendationInput) =>
    http.post<TripRecommendations>(Endpoints.tripRecommendations, input);
