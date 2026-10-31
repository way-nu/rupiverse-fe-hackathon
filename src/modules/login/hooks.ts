import { useState } from 'react';

import { useSingleFlight } from '@/hooks/use-single-flight';
import { useSession } from '@/hooks/use-session';

export function useLogin() {
    const { signIn } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const singleFlight = useSingleFlight();
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [forgotShown, setForgotShown] = useState(false);

    const submit = () => singleFlight(async () => {
        setLoading(true);
        setError(null);
        try {
            await signIn({ email: email.trim(), password });
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    });

    return {
        email,
        setEmail,
        password,
        setPassword,
        submit,
        loading,
        error,
        isSignup: mode === 'signup',
        toggleMode: () => {
            setMode((m) => (m === 'login' ? 'signup' : 'login'));
            setError(null);
        },
        forgotShown,
        showForgot: () => setForgotShown(true),
    };
}
