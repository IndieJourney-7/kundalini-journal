<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import WriterLayout from '@/Layouts/WriterLayout.vue';
import GoldShiningText from '@/Components/GoldShiningText.vue';
import StatsCard from '@/Components/StatsCard.vue';
import GradientButton from '@/Components/GradientButton.vue';
import { getActiveWriter, slugify } from '@/writerSession';
import { loadEntries } from '@/journalEntries';

const writer = ref(null);
const entries = reactive([]);

const todaysPrompt = 'What energy are you sensing in your body today? Where does it originate, and how does it want to move?';

onMounted(() => {
    const active = getActiveWriter();
    if (!active) return; // WriterLayout handles the redirect
    writer.value = active;
    entries.splice(0, entries.length, ...loadEntries(active.code));
});

const stats = computed(() => {
    if (!writer.value) return { daysActive: 0, totalEntries: 0, gratitudesReceived: 0 };

    const start = writer.value.journeyStartDate ? new Date(writer.value.journeyStartDate) : new Date();
    const daysActive = Math.max(1, Math.ceil((Date.now() - start.getTime()) / 86400000));

    return {
        daysActive,
        totalEntries: entries.length,
        gratitudesReceived: entries.reduce((sum, e) => sum + (e.gratitudes || 0), 0),
    };
});

const recentEntries = computed(() =>
    [...entries]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
        .map((e) => ({ id: e.id, day: e.dayNumber, title: e.title, date: new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), mood: e.mood })),
);

const journeyHref = computed(() => writer.value ? '/journey/' + slugify(writer.value.name || writer.value.code) : '/journey/seeker');
</script>

<template>
    <Head title="Dashboard" />

    <WriterLayout>
        <template #header>
            <div v-if="writer">
                <GoldShiningText as="h2" size="text-2xl sm:text-3xl">
                    Namaste, {{ writer.name || 'Seeker' }} 🙏
                </GoldShiningText>
                <p class="text-sm text-gray-400 mt-1">Welcome to your sacred journal space.</p>
            </div>
        </template>

        <div v-if="writer" class="py-8">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <!-- Stats Row -->
                <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <StatsCard
                        title="Days Active"
                        :value="stats.daysActive"
                        color="gold"
                        icon="<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>"
                    />
                    <StatsCard
                        title="Total Entries"
                        :value="stats.totalEntries"
                        color="pink"
                        icon="<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'/></svg>"
                    />
                    <StatsCard
                        title="Gratitudes Received"
                        :value="stats.gratitudesReceived"
                        color="gold"
                        icon="<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'/></svg>"
                    />
                </div>

                <!-- Quick Actions -->
                <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <GradientButton href="/journal/create" variant="gold" size="lg">
                        <span class="mr-2">📝</span> New Journal Entry
                    </GradientButton>
                    <GradientButton :href="journeyHref" variant="outline-gold" size="lg">
                        <span class="mr-2">📖</span> View My Journey
                    </GradientButton>
                    <GradientButton variant="outline-pink" size="lg" title="PDF eBook export is coming soon">
                        <span class="mr-2">📕</span> Export eBook
                    </GradientButton>
                </div>

                <!-- Today's Prompt -->
                <div class="mb-8 rounded-2xl border-l-4 border-gold-500 border border-gold-500/20 bg-gradient-to-r from-gold-500/5 to-pink-500/5 bg-sacred-card/30 p-6">
                    <div class="flex items-start gap-3">
                        <span class="text-2xl flex-shrink-0">🕯️</span>
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-2">Today's Journaling Prompt</p>
                            <p class="text-base text-gray-200 leading-relaxed font-heading italic">"{{ todaysPrompt }}"</p>
                        </div>
                    </div>
                </div>

                <!-- Recent Entries -->
                <div class="rounded-2xl border border-gold-500/20 bg-sacred-card/50 backdrop-blur-sm p-6">
                    <div class="mb-4 flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gold-400 font-heading">Recent Entries</h3>
                        <GradientButton href="/journal/entries" variant="ghost" size="sm">
                            View All →
                        </GradientButton>
                    </div>

                    <div v-if="recentEntries.length === 0" class="py-8 text-center text-gray-500">
                        <p class="text-3xl mb-2">📝</p>
                        <p>No entries yet. Begin your sacred journey today.</p>
                        <GradientButton href="/journal/create" variant="outline-gold" size="sm" class="mt-4">
                            ✨ Write Your First Entry
                        </GradientButton>
                    </div>

                    <div v-else class="space-y-3">
                        <a
                            v-for="entry in recentEntries"
                            :key="entry.id"
                            :href="`/journal/create?edit=${entry.id}`"
                            class="flex items-center justify-between rounded-xl border border-gold-500/10 bg-sacred-dark/50 p-4 transition-all hover:border-gold-500/30 hover:bg-gold-500/5"
                        >
                            <div class="flex items-center gap-4">
                                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-sm font-bold text-gold-400">
                                    {{ entry.day }}
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-white">{{ entry.title }}</p>
                                    <p class="text-xs text-gray-500">{{ entry.date }}</p>
                                </div>
                            </div>
                            <span class="rounded-full bg-gold-500/10 px-2 py-0.5 text-[10px] text-gold-400" v-if="entry.mood">
                                {{ entry.mood }}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </WriterLayout>
</template>
