<script setup>
import { onMounted, ref } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import GoldShiningText from '@/Components/GoldShiningText.vue';
import GradientButton from '@/Components/GradientButton.vue';
import { findWriterBySlug } from '@/writerSession';
import { loadEntries, isMilestoneDay } from '@/journalEntries';

const props = defineProps({
    practitioner: {
        type: Object,
        default: () => ({
            name: 'Maya Devi',
            tagline: 'Awakening since 2023',
            bio: 'On a profound journey of self-discovery through kundalini meditation and daily journaling.',
            daysActive: 108,
            totalEntries: 143,
            gratitudesReceived: 89,
            avatar: '🌺',
        }),
    },
    entries: {
        type: Array,
        default: () => [],
    },
});

const readingProgress = ref(0);
const expandedEntry = ref(null);

const toggleExpand = (day) => {
    expandedEntry.value = expandedEntry.value === day ? null : day;
};

const milestones = [
    { day: 7, label: 'Day 7 — Foundation', meaning: 'The energy stabilizes in the root chakra' },
    { day: 21, label: 'Day 21 — Integration', meaning: 'The practice becomes a living part of your being' },
    { day: 40, label: 'Day 40 — Transformation', meaning: 'A profound shift in consciousness occurs' },
    { day: 108, label: 'Day 108 — Illumination', meaning: 'The awakened light shines bright within' },
];

const sampleEntries = [
    { day: 1, date: 'March 15, 2026', title: 'The First Spark', content: 'A gentle warmth began at the base of my spine during meditation. Subtle, yet unmistakable. Like a slumbering serpent stirring for the first time in eons. I felt a cascade of golden light washing through my being, bringing with it an inexplicable peace.', mood: 'blissful', chakra: 'root', gratitudes: 12 },
    { day: 7, date: 'March 21, 2026', title: 'Rooted in Being', content: 'Seven days of consistent practice. The root chakra pulses with warm, red light. I feel more grounded than ever before. The old anxieties that once plagued me seem to dissolve like morning mist. Each session brings new layers of release.', mood: 'peaceful', chakra: 'root', gratitudes: 18, milestone: true },
    { day: 21, date: 'April 4, 2026', title: 'The Waters of Creativity', content: 'The energy has risen to my sacral chakra. Waves of orange-gold light, warm and creative. Visions flow like a river — images, symbols, ancient memories. The creative urge is overwhelming. Poetry pours from my pen unbidden.', mood: 'energetic', chakra: 'sacral', gratitudes: 24, milestone: true },
    { day: 40, date: 'April 23, 2026', title: 'Solar Awakening', content: 'A dramatic shift today. The solar plexus ignited like a golden sun. I felt an surge of personal power — not egoic, but authentic. Old chains of self-doubt incinerated in the blaze. I stood in my truth for the first time.', mood: 'blissful', chakra: 'solar', gratitudes: 31, milestone: true },
    { day: 72, date: 'May 25, 2026', title: 'Heart Opening', content: 'The green light of the heart chakra, infinite and compassionate. Tears streamed unbidden — not of sadness, but of pure recognition. The boundary between self and other dissolved. I AM the other. Love is all there is.', mood: 'grateful', chakra: 'heart', gratitudes: 45 },
    { day: 108, date: 'June 30, 2026', title: 'The Thousand-Petaled Lotus', content: 'Today marks 108 days — a sacred number. The crown chakra blooms like a thousand-petaled lotus of pure violet light. Silence. Not the absence of sound, but the presence of pure consciousness. I see clearly now: the journey was never about reaching. It was about awakening to what has always been.', mood: 'blissful', chakra: 'crown', gratitudes: 67, milestone: true },
];

const entries = ref(props.entries.length > 0 ? props.entries : sampleEntries);
const practitionerData = ref(props.practitioner);
const isAtMilestone = (day) => milestones.some(m => m.day === day);

function mapEntryForDisplay(entry) {
    return {
        day: entry.dayNumber,
        date: entry.date ? new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
        title: entry.title,
        content: entry.content || '',
        mood: entry.mood,
        chakra: entry.chakra,
        gratitudes: entry.gratitudes || 0,
        milestone: isMilestoneDay(entry.dayNumber),
        type: entry.type,
        mediaUrl: entry.mediaUrl,
        images: entry.images || [],
    };
}

onMounted(() => {
    const slug = window.location.pathname.split('/').filter(Boolean).pop();
    const localWriter = findWriterBySlug(slug);
    if (!localWriter) return;

    const publishedEntries = loadEntries(localWriter.code)
        .filter((e) => e.status === 'published')
        .sort((a, b) => a.dayNumber - b.dayNumber);

    const start = localWriter.journeyStartDate ? new Date(localWriter.journeyStartDate) : new Date();
    const daysActive = Math.max(1, Math.ceil((Date.now() - start.getTime()) / 86400000));

    practitionerData.value = {
        name: localWriter.name || localWriter.code,
        tagline: localWriter.tagline,
        bio: localWriter.bio,
        daysActive,
        totalEntries: publishedEntries.length,
        gratitudesReceived: publishedEntries.reduce((sum, e) => sum + (e.gratitudes || 0), 0),
        avatar: localWriter.avatar || '🪷',
    };

    entries.value = publishedEntries.map(mapEntryForDisplay);
});
</script>

<template>
    <Head :title="practitionerData.name + ' - Journey'" />

    <div class="min-h-screen bg-sacred-dark text-white">
        <!-- Reading Progress Bar -->
        <div class="fixed top-0 left-0 right-0 z-50 h-1 bg-sacred-dark">
            <div class="h-full bg-gold-gradient transition-all duration-300" :style="{ width: readingProgress + '%' }"></div>
        </div>

        <!-- Navbar -->
        <nav class="sticky top-1 z-40 border-b border-gold-500/10 bg-sacred-dark/80 backdrop-blur-xl">
            <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div class="flex items-center gap-4">
                    <Link href="/community" class="text-gray-400 hover:text-gold-400 transition-colors">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div class="h-4 w-px bg-gold-500/20"></div>
                    <span class="text-sm text-gold-400 font-medium font-heading">{{ practitionerData.name }}'s Journey</span>
                </div>
                <GradientButton variant="outline-gold" size="sm">
                    📖 Export eBook
                </GradientButton>
            </div>
        </nav>

        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Sidebar -->
                <aside class="lg:w-72 flex-shrink-0">
                    <div class="space-y-6 lg:sticky lg:top-20">
                        <!-- Profile Card -->
                        <div class="rounded-2xl border border-gold-500/20 bg-sacred-card/50 backdrop-blur-sm p-6 text-center">
                            <div class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold-500/30 bg-sacred-dark text-4xl shadow-gold">
                                {{ practitionerData.avatar || practitionerData.name.charAt(0) }}
                            </div>
                            <h2 class="text-xl font-bold text-white font-heading">{{ practitionerData.name }}</h2>
                            <p class="text-sm text-gray-400 mb-4">{{ practitionerData.tagline }}</p>
                            <p class="text-xs text-gray-500 leading-relaxed mb-6">{{ practitionerData.bio }}</p>

                            <!-- Stats -->
                            <div class="grid grid-cols-3 gap-3 border-t border-gold-500/10 pt-4">
                                <div>
                                    <p class="text-lg font-bold text-gold-400">{{ practitionerData.daysActive }}</p>
                                    <p class="text-[10px] text-gray-500">Days Active</p>
                                </div>
                                <div>
                                    <p class="text-lg font-bold text-pink-300">{{ practitionerData.totalEntries }}</p>
                                    <p class="text-[10px] text-gray-500">Entries</p>
                                </div>
                                <div>
                                    <p class="text-lg font-bold text-green-400">{{ practitionerData.gratitudesReceived }}</p>
                                    <p class="text-[10px] text-gray-500">🙏 Received</p>
                                </div>
                            </div>
                        </div>

                        <!-- Milestones -->
                        <div class="rounded-2xl border border-gold-500/20 bg-sacred-card/50 backdrop-blur-sm p-5">
                            <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-400">Sacred Milestones</p>
                            <div class="space-y-3">
                                <a
                                    v-for="milestone in milestones"
                                    :key="milestone.day"
                                    :href="'#day-' + milestone.day"
                                    class="block rounded-xl border border-gold-500/10 bg-sacred-dark/50 p-3 transition-all hover:border-gold-500/30 hover:bg-gold-500/5"
                                >
                                    <p class="text-sm font-medium text-gold-400">{{ milestone.label }}</p>
                                    <p class="text-xs text-gray-500 mt-1">{{ milestone.meaning }}</p>
                                </a>
                            </div>
                        </div>

                        <!-- Gratitude Stats -->
                        <div class="rounded-2xl border border-gold-500/20 bg-sacred-card/50 backdrop-blur-sm p-5 text-center">
                            <p class="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-2">Total Gratitudes</p>
                            <p class="text-3xl font-bold text-gold-400">{{ practitionerData.gratitudesReceived }}</p>
                            <p class="text-xs text-gray-500 mt-1">🙏 from the community</p>
                        </div>
                    </div>
                </aside>

                <!-- Main Content -->
                <div class="flex-1 min-w-0">
                    <!-- Large Profile Banner -->
                    <div class="relative mb-8 overflow-hidden rounded-2xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 via-sacred-card to-pink-500/10">
                        <!-- Sacred geometry background -->
                        <div class="absolute inset-0 opacity-10">
                            <svg class="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#D4A017" stroke-width="0.3"/>
                                <circle cx="100" cy="100" r="50" fill="none" stroke="#D4A017" stroke-width="0.3"/>
                                <polygon points="100,20 170,90 150,170 50,170 30,90" fill="none" stroke="#D4A017" stroke-width="0.2"/>
                            </svg>
                        </div>
                        <div class="relative px-6 py-8 sm:px-10 sm:py-12">
                            <GoldShiningText as="h1" size="text-3xl sm:text-4xl mb-2">
                                {{ practitionerData.name }}
                            </GoldShiningText>
                            <p class="text-gray-400 text-sm mb-6">{{ practitionerData.tagline }}</p>
                            <div class="flex flex-wrap gap-4">
                                <div class="flex items-center gap-2 text-sm text-gray-300">
                                    <span class="text-gold-400">✦</span>
                                    {{ practitionerData.daysActive }} days on the path
                                </div>
                                <div class="flex items-center gap-2 text-sm text-gray-300">
                                    <span class="text-pink-300">✦</span>
                                    {{ practitionerData.totalEntries }} journal entries
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Journal Entries -->
                    <div class="space-y-6">
                        <div
                            v-for="entry in entries"
                            :key="entry.day"
                            :id="'day-' + entry.day"
                            class="group rounded-2xl border border-gold-500/10 bg-sacred-card/30 backdrop-blur-sm p-6 transition-all duration-300 hover:border-gold-500/30 hover:bg-sacred-card/50"
                        >
                            <!-- Milestone banner -->
                            <div
                                v-if="entry.milestone"
                                class="mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-gold-500/20 via-pink-500/20 to-gold-500/20 border border-gold-500/30 p-4 text-center"
                            >
                                <p class="text-xs uppercase tracking-widest text-gold-400 font-semibold">✨ Sacred Milestone ✨</p>
                                <p class="text-sm text-gray-300 mt-1">Day {{ entry.day }} — {{ milestones.find(m => m.day === entry.day)?.meaning }}</p>
                            </div>

                            <!-- Entry header -->
                            <div class="mb-4 flex items-start justify-between">
                                <div class="flex items-start gap-4">
                                    <div class="flex flex-shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 border border-gold-500/30 text-sm font-bold text-gold-400">
                                        {{ entry.day }}
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-semibold text-white font-heading">{{ entry.title }}</h3>
                                        <p class="text-xs text-gray-500 mt-1">{{ entry.date }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="rounded-full bg-gold-500/10 px-2.5 py-0.5 text-[10px] text-gold-400">
                                        {{ entry.mood }}
                                    </span>
                                    <span
                                        class="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                                        :style="{ backgroundColor: entry.chakra + '20', color: entry.chakra }"
                                    >
                                        {{ entry.chakra }}
                                    </span>
                                </div>
                            </div>

                            <!-- Audio -->
                            <div v-if="entry.type === 'audio' && entry.mediaUrl" class="mb-4">
                                <audio :src="entry.mediaUrl" controls class="w-full"></audio>
                            </div>

                            <!-- Video -->
                            <div v-if="entry.type === 'video' && entry.mediaUrl" class="mb-4 overflow-hidden rounded-xl border border-gold-500/10">
                                <video :src="entry.mediaUrl" controls class="w-full max-h-96"></video>
                            </div>

                            <!-- Images -->
                            <div v-if="entry.images && entry.images.length" class="mb-4 flex flex-wrap gap-2">
                                <img
                                    v-for="img in entry.images"
                                    :key="img.id"
                                    :src="img.dataUrl"
                                    :alt="img.name"
                                    class="h-24 w-24 rounded-lg border border-gold-500/10 object-cover"
                                />
                            </div>

                            <!-- Content (expandable) -->
                            <div v-if="entry.content" class="relative">
                                <p
                                    class="text-sm text-gray-300 leading-relaxed"
                                    :class="{ 'line-clamp-3': expandedEntry !== entry.day }"
                                    v-text="entry.content"
                                ></p>
                                <button
                                    v-if="entry.content.length > 200"
                                    @click="toggleExpand(entry.day)"
                                    class="mt-2 text-xs text-gold-400 hover:text-gold-300 transition-colors"
                                >
                                    {{ expandedEntry === entry.day ? 'Show less ▲' : 'Read more ▼' }}
                                </button>
                            </div>

                            <!-- Gratitude button -->
                            <div class="mt-4 flex items-center justify-between border-t border-gold-500/10 pt-4">
                                <button class="flex items-center gap-2 rounded-xl border border-gold-500/20 bg-gold-500/5 px-4 py-2 text-sm text-gold-400 transition-all hover:bg-gold-500/15 hover:shadow-gold group/btn">
                                    <span class="transition-transform duration-300 group-hover/btn:scale-125">🙏</span>
                                    <span>{{ entry.gratitudes }}</span>
                                </button>

                                <div class="flex items-center gap-3 text-xs text-gray-500">
                                    <span v-if="isAtMilestone(entry.day)" class="text-gold-400">✦ Milestone Entry</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
