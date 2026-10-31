import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { login, logout } from '@/services/auth';
import type { LoginInput, Session } from '@/types';

type SessionContextValue = {
    session: Session | null;
    signIn: (input: LoginInput) => Promise<void>;
    signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);

    const signIn = useCallback(async (input: LoginInput) => {
        setSession(await login(input));
    }, []);

    const signOut = useCallback(() => {
        logout();
        setSession(null);
    }, []);

    const value = useMemo(() => ({ session, signIn, signOut }), [session, signIn, signOut]);
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
    const ctx = useContext(SessionContext);
    if (!ctx) throw new Error('useSession must be used inside SessionProvider');
    return ctx;
}
