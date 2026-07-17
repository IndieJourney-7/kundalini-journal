// Frontend-only donation settings storage (browser localStorage). No backend/database yet —
// swap this for a real API call once a `donation_settings` table + controller exist.
const STORAGE_KEY = 'gac_donation_settings';

export const DEFAULT_DONATION_SETTINGS = {
    intro: 'Your generous support helps us keep meditation, teachings, and community programs free for every seeker.',
    bankAccountName: '',
    bankAccountNumber: '',
    bankIFSC: '',
    bankName: '',
    bankBranch: '',
    upiId: '',
    phonePeLink: '',
    paypalLink: '',
    globalPaymentLink: '',
    note: '',
};

export function loadDonationSettings() {
    if (typeof window === 'undefined') {
        return { ...DEFAULT_DONATION_SETTINGS };
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return { ...DEFAULT_DONATION_SETTINGS };
        }

        const parsed = JSON.parse(raw);
        return { ...DEFAULT_DONATION_SETTINGS, ...parsed };
    } catch {
        return { ...DEFAULT_DONATION_SETTINGS };
    }
}

export function saveDonationSettings(settings) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
