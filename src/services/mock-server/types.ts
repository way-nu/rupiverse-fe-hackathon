import type { HttpMethod } from '@/services/http-client';

export type MockRequest = { method: HttpMethod; url: string; body?: unknown; token: string | null; params?: Record<string, string> };

export type MockRoute = {
    method: HttpMethod;
    url: string;
    handler: (req: MockRequest) => unknown | Promise<unknown>;
};

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public code?: string,
    ) {
        super(message);
    }
}
