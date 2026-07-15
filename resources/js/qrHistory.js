// Frontend-only QR code history (browser localStorage). No backend/database yet —
// swap this for a real API call once a `qr_codes` table + controller exist.
const STORAGE_KEY = 'gac_qr_codes';
const MAX_HISTORY = 24;

export function loadHistory() {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveHistory(items) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_HISTORY)));
}
