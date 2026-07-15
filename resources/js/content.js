// Frontend-only content store (browser localStorage) for Events, Meditations, and
// Knowledge articles. No backend/database yet — swap loadContent()/saveContent() for
// real API calls once matching tables + controllers exist. Keeping the schema below
// stable makes that swap mechanical.
const STORAGE_PREFIX = 'gac_content_';

export const DEFAULT_CONTENT = {
    events: [
        {
            id: 1,
            title: 'Online Meditation Session',
            date: '2026-06-22',
            time: '7:00 PM - 8:30 PM IST',
            location: 'Online',
            description: 'A guided group meditation to align and recharge together.',
        },
        {
            id: 2,
            title: 'Kundalini Awakening Workshop',
            date: '2026-07-05',
            time: '10:00 AM - 5:00 PM IST',
            location: 'Bangalore',
            description: 'A full-day immersive workshop on awakening practices.',
        },
        {
            id: 3,
            title: '7 Day Silent Retreat',
            date: '2026-08-15',
            time: 'All day',
            location: 'Rishikesh',
            description: 'A week of silence, stillness, and deep inner work.',
        },
    ],
    meditations: [
        {
            id: 1,
            title: 'Root to Crown Awakening',
            description: 'A guided journey through all seven chakras, from grounding to crown.',
            duration: '20 min',
            mediaType: 'audio',
            mediaUrl: '',
        },
        {
            id: 2,
            title: 'Breath of Stillness',
            description: 'A gentle breath-awareness practice, ideal for beginners.',
            duration: '12 min',
            mediaType: 'audio',
            mediaUrl: '',
        },
    ],
    knowledge: [
        { id: 1, title: 'Kundalini Fundamentals', category: 'Foundations', summary: 'Understand what Kundalini energy is and how it moves through the body.', link: '' },
        { id: 2, title: 'Chakra Integration', category: 'Practice', summary: 'How to work consciously with each energy center.', link: '' },
        { id: 3, title: 'Daily Discipline and Rhythm', category: 'Practice', summary: 'Building a sustainable daily sadhana.', link: '' },
        { id: 4, title: 'Energy Hygiene and Boundaries', category: 'Wellbeing', summary: 'Protecting your energy field in daily life.', link: '' },
        { id: 5, title: 'Nutrition and Grounding Practices', category: 'Wellbeing', summary: 'Foods and habits that support a grounded awakening.', link: '' },
        { id: 6, title: 'Journaling for Inner Clarity', category: 'Practice', summary: 'Using reflective writing to track your inner journey.', link: '' },
    ],
};

export function loadContent(type) {
    const fallback = [...(DEFAULT_CONTENT[type] ?? [])];

    if (typeof window === 'undefined') {
        return fallback;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_PREFIX + type);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : fallback;
    } catch {
        return fallback;
    }
}

export function saveContent(type, items) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_PREFIX + type, JSON.stringify(items));
}
