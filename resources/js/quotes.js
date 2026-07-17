// Frontend-only quote storage (browser localStorage). No backend/database yet —
// swap this for a real API call once a `quotes` table + controller exist.
const STORAGE_KEY = 'gac_home_quotes';

export const DEFAULT_QUOTES = [
    {
        id: 1,
        text: 'నీ శ్వాసే నీ గురువు.',
        author: '',
        active: true,
        translations: [
            { lang: 'Telugu', text: 'నీ శ్వాసే నీ గురువు.' },
            { lang: 'English', text: 'Your breath is your guru.' },
            { lang: 'Hindi', text: 'तुम्हारी सांस ही तुम्हारा गुरु है।' },
        ],
    },
];

export function loadQuotes() {
    if (typeof window === 'undefined') {
        return DEFAULT_QUOTES;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return DEFAULT_QUOTES;
        }

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_QUOTES;
    } catch {
        return DEFAULT_QUOTES;
    }
}

export function saveQuotes(quotes) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

export function getActiveQuote() {
    const quotes = loadQuotes();
    return quotes.find((quote) => quote.active) ?? quotes[0] ?? null;
}
