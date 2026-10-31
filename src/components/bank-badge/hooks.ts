import { BANK_COLORS, DEFAULT_BANK_COLOR } from '@/constants/banks';

export function useBankBadge(name: string, kind: 'bank' | 'card') {
    const code = (name.trim().split(/\s+/)[0] ?? '').toUpperCase().slice(0, 5) || '₹';
    const bankColor = BANK_COLORS[code] ?? DEFAULT_BANK_COLOR;
    return { code, color: kind === 'card' ? '#1A1A1A' : bankColor };
}
