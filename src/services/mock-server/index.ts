import { routes } from '@/services/mock-server/routes';
import { MOCK_LATENCY_MS } from '@/services/mock-server/constants';
import { ApiError, type MockRequest, type MockRoute } from '@/services/mock-server/types';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Route urls may contain `:name` segments, which are returned as params. */
function match(route: MockRoute, req: MockRequest): Record<string, string> | null {
    if (route.method !== req.method) return null;
    const names: string[] = [];
    const pattern = route.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/:(\w+)/g, (_, name) => {
        names.push(name);
        return '([^/]+)';
    });
    const found = new RegExp(`^${pattern}$`).exec(req.url);
    return found ? Object.fromEntries(names.map((n, i) => [n, decodeURIComponent(found[i + 1])])) : null;
}

export async function handleMockRequest<T>(req: MockRequest): Promise<T> {
    await wait(MOCK_LATENCY_MS);
    for (const route of routes) {
        const params = match(route, req);
        if (params) return (await route.handler({ ...req, params })) as T;
    }
    throw new ApiError(404, `No mock for ${req.method} ${req.url}`);
}
