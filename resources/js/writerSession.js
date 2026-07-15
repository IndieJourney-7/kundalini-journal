// Frontend-only "sacred code" identity for practitioners. No backend/database yet —
// typing any code creates (or resumes) a local writer profile in the browser.
// Swap this for real code-based auth against the `users` table once that backend exists.
const WRITERS_KEY = 'gac_writers'; // { [code]: writerProfile }
const SESSION_KEY = 'gac_active_writer_code';

export function normalizeCode(code) {
    return code.trim().toUpperCase().replace(/\s+/g, '-');
}

export function slugify(name) {
    return (name || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function loadWriters() {
    try {
        const raw = window.localStorage.getItem(WRITERS_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
        return {};
    }
}

function saveWriters(writers) {
    window.localStorage.setItem(WRITERS_KEY, JSON.stringify(writers));
}

export function getActiveCode() {
    return window.localStorage.getItem(SESSION_KEY);
}

export function getActiveWriter() {
    const code = getActiveCode();
    if (!code) return null;
    return loadWriters()[code] ?? null;
}

export function getWriter(code) {
    if (!code) return null;
    return loadWriters()[normalizeCode(code)] ?? null;
}

export function findWriterBySlug(slug) {
    const writers = loadWriters();
    return Object.values(writers).find((w) => slugify(w.name) === slug) ?? null;
}

// Enters (or creates) a writer identity for the given code and makes it the active session.
export function enterWithCode(rawCode) {
    const code = normalizeCode(rawCode);
    if (!code) return null;

    const writers = loadWriters();
    let isNew = false;

    if (!writers[code]) {
        isNew = true;
        writers[code] = {
            code,
            name: '',
            avatar: '🪷',
            tagline: '',
            bio: '',
            journeyStartDate: new Date().toISOString().slice(0, 10),
            mantra: '',
            location: '',
            createdAt: new Date().toISOString(),
        };
        saveWriters(writers);
    }

    window.localStorage.setItem(SESSION_KEY, code);
    return { writer: writers[code], isNew };
}

export function updateWriterProfile(code, updates) {
    const writers = loadWriters();
    const normalized = normalizeCode(code);
    if (!writers[normalized]) return null;

    writers[normalized] = { ...writers[normalized], ...updates };
    saveWriters(writers);
    return writers[normalized];
}

export function logout() {
    window.localStorage.removeItem(SESSION_KEY);
}
