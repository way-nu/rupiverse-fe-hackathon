import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

export const SHEET_DETENTS: number[] = [0.8, 1];
