import { routes } from '@/services/mock-server/routes';
import { MOCK_LATENCY_MS } from '@/services/mock-server/constants';
import { ApiError, type MockRequest } from '@/services/mock-server/types';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function handleMockRequest<T>(req: MockRequest): Promise<T> {
    await wait(MOCK_LATENCY_MS);
    const route = routes.find((r) => r.method === req.method && r.url === req.url);
    if (!route) throw new ApiError(404, `No mock for ${req.method} ${req.url}`);
    return (await route.handler(req)) as T;
}
