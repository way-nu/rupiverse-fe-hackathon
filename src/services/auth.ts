import { Endpoints } from '@/constants/api';
import { http, setAuthToken } from '@/services/http-client';
import type { LoginInput, Session } from '@/types';

export async function login(input: LoginInput): Promise<Session> {
    const session = await http.post<Session>(Endpoints.login, input);
    setAuthToken(session.token);
    return session;
}

export function logout() {
    setAuthToken(null);
}
