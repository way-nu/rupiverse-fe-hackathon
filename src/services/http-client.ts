import { handleMockRequest } from '@/services/mock-server';

export type HttpMethod = 'GET' | 'POST' | 'PATCH';

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
    authToken = token;
}

async function request<T>(method: HttpMethod, url: string, body?: unknown): Promise<T> {
    // Backend swap point: replace this call with fetch/axios and keep the signature.
    return handleMockRequest<T>({ method, url, body, token: authToken });
}

export const http = {
    get: <T>(url: string) => request<T>('GET', url),
    post: <T>(url: string, body?: unknown) => request<T>('POST', url, body),
    patch: <T>(url: string, body?: unknown) => request<T>('PATCH', url, body),
    /** multipart/form-data upload. Backend swap point: build a FormData from `fields` (files as Blobs). */
    postForm: <T>(url: string, fields: Record<string, unknown>) => request<T>('POST', url, fields),
};
