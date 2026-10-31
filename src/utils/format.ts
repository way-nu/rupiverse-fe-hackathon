export function formatRupees(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatDate(iso: string): string {
    const d = new Date(iso);
    const month = d.toLocaleString('en-GB', { month: 'short' });
    return `${String(d.getDate()).padStart(2, '0')} ${month} ${d.getFullYear()}`;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "2026-10-31" -> "Sat, 31 Oct" */
export function formatDayHeading(iso: string): string {
    const [y, m, d] = iso.split('-').map(Number);
    return `${WEEKDAYS[new Date(y, m - 1, d).getDay()]}, ${d} ${MONTHS[m - 1]}`;
}

/** "2026-10-31" -> "October 2026" */
export function formatMonthYear(iso: string): string {
    const [y, m] = iso.split('-').map(Number);
    return `${MONTHS_LONG[m - 1]} ${y}`;
}

/** Signed amount with a real minus sign: -320 -> "−₹320", 1200 -> "+₹1,200" */
export function formatSignedRupees(amount: number): string {
    return `${amount < 0 ? '−' : '+'}${formatRupees(Math.abs(amount))}`;
}
