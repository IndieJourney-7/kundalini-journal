// Frontend-only journal entries store, keyed by writer code (localStorage).
// Swap loadEntries()/saveEntries() for real API calls once a `journal_entries`
// table + controller exist — every page using this already treats entries as
// plain data, so the swap is mechanical.
const PREFIX = 'gac_journal_';

export const MILESTONE_DAYS = [7, 21, 40, 108, 365];

export function loadEntries(code) {
    if (!code) return [];

    try {
        const raw = window.localStorage.getItem(PREFIX + code);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveEntries(code, entries) {
    if (!code) return;
    window.localStorage.setItem(PREFIX + code, JSON.stringify(entries));
}

export function nextDayNumber(code) {
    return loadEntries(code).length + 1;
}

export function isMilestoneDay(day) {
    return MILESTONE_DAYS.includes(day);
}
