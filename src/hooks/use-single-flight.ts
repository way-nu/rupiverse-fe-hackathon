import { useCallback, useRef } from 'react';

/** Ignores calls while a previous one is still running, so a double tap cannot submit twice. */
export function useSingleFlight() {
    const busy = useRef(false);
    return useCallback(async (fn: () => Promise<unknown> | unknown) => {
        if (busy.current) return;
        busy.current = true;
        try {
            await fn();
        } finally {
            busy.current = false;
        }
    }, []);
}
