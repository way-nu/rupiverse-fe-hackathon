/** Indian digit grouping (12,34,567) without relying on Intl support on the device. */
export function formatRupees(amount: number): string {
    const [whole, fraction] = Math.abs(amount).toFixed(2).split('.');
    const last3 = whole.slice(-3);
    const rest = whole.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    const grouped = rest ? `${rest},${last3}` : last3;
    return `${amount < 0 ? '-' : ''}₹${grouped}${fraction === '00' ? '' : `.${fraction}`}`;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function formatDate(iso: string): string {
    const [y, m, d] = iso.split('-').map(Number);
    return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`;
}

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

export function formatFileSize(bytes: number): string {
    return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
