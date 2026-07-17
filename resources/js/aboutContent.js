// Frontend-only About page content storage (browser localStorage). No backend/database yet —
// swap this for a real API call once an `about_content` table + controller exist.
// Images are persisted as data URLs (see media.js) so there is no file server involved yet.
const STORAGE_KEY = 'gac_about_content';

export const DEFAULT_ABOUT_CONTENT = {
    gasm: {
        text:
            'The Golden Age Spiritual Movement (GASM) supports sincere seekers in awakening Kundalini Shakti through ' +
            'grounded daily practice, conscious living, and reflective journaling — inspiring humanity to awaken to ' +
            'its true nature through meditation, wisdom, and self-discovery.',
        images: [],
    },
    grandMaster: {
        text: '',
        images: [],
    },
    coreTeam: {
        intro: 'The dedicated team supporting the Golden Age Spiritual Movement.',
        members: [],
    },
};

function cloneDefault() {
    return {
        gasm: { ...DEFAULT_ABOUT_CONTENT.gasm, images: [] },
        grandMaster: { ...DEFAULT_ABOUT_CONTENT.grandMaster, images: [] },
        coreTeam: { ...DEFAULT_ABOUT_CONTENT.coreTeam, members: [] },
    };
}

export function loadAboutContent() {
    if (typeof window === 'undefined') {
        return cloneDefault();
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return cloneDefault();
        }

        const parsed = JSON.parse(raw);
        const fallback = cloneDefault();

        return {
            gasm: { ...fallback.gasm, ...parsed.gasm },
            grandMaster: { ...fallback.grandMaster, ...parsed.grandMaster },
            coreTeam: {
                ...fallback.coreTeam,
                ...parsed.coreTeam,
                members: Array.isArray(parsed.coreTeam?.members) ? parsed.coreTeam.members : [],
            },
        };
    } catch {
        return cloneDefault();
    }
}

export function saveAboutContent(content) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}
