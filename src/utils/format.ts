export function formatRupees(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatDate(iso: string): string {
    const d = new Date(iso);
    const month = d.toLocaleString('en-GB', { month: 'short' });
    return `${String(d.getDate()).padStart(2, '0')} ${month} ${d.getFullYear()}`;
}
