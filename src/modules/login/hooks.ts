import { useState } from 'react';

import { useSession } from '@/hooks/use-session';

export function useLogin() {
    const { signIn } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setLoading(true);
        setError(null);
        try {
            await signIn({ email: email.trim(), password });
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return { email, setEmail, password, setPassword, submit, loading, error };
}
