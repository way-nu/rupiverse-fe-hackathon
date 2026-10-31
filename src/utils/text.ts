/** Turns scraped markdown-ish snippet text into a short plain excerpt. */
export function cleanSnippet(raw: string, maxLength = 220): string {
    const text = raw
        .replace(/[#*_`>]/g, ' ')
        .replace(/\.{2,}|…/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > maxLength ? `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}…` : text;
}

/** "https://www.makemytrip.com/tripideas/x" -> "makemytrip.com" */
export function sourceHost(url: string): string {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
}
