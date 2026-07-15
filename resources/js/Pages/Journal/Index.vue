<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import WriterLayout from '@/Layouts/WriterLayout.vue';
import GoldShiningText from '@/Components/GoldShiningText.vue';
import GradientButton from '@/Components/GradientButton.vue';
import { getActiveWriter } from '@/writerSession';
import { loadEntries, saveEntries, isMilestoneDay } from '@/journalEntries';

const writer = ref(null);
const entries = reactive([]);
const filter = ref('all');
const confirmDeleteId = ref(null);

onMounted(() => {
    const active = getActiveWriter();
    if (!active) return;
    writer.value = active;
    entries.splice(0, entries.length, ...loadEntries(active.code));
});

const persist = () => saveEntries(writer.value.code, entries);

const filtered = computed(() => {
    if (filter.value === 'all') return entries;
    return entries.filter((e) => e.status === filter.value);
});

const stats = computed(() => ({
    total: entries.length,
    published: entries.filter((e) => e.status === 'published').length,
    drafts: entries.filter((e) => e.status === 'draft').length,
    gratitudes: entries.reduce((sum, e) => sum + (e.gratitudes || 0), 0),
}));

const togglePublish = (entry) => {
    entry.status = entry.status === 'published' ? 'draft' : 'published';
    persist();
};

const askDelete = (entry) => {
    confirmDeleteId.value = entry.id;
};

const confirmDelete = () => {
    const idx = entries.findIndex((e) => e.id === confirmDeleteId.value);
    if (idx !== -1) entries.splice(idx, 1);
    persist();
    confirmDeleteId.value = null;
};

const typeIcon = (type) => ({ text: '📝', audio: '🎵', video: '🎬' }[type] ?? '📝');

function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
</script>

<template>
    <Head title="My Journal" />

    <WriterLayout>
        <template #header>
            <div>
                <GoldShiningText as="h2" size="text-2xl">My Journal</GoldShiningText>
                <p class="text-sm text-gray-400 mt-1">Every entry on your sacred path, in one place.</p>
            </div>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <!-- Stats -->
                <div class="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div class="rounded-xl border border-gold-500/20 bg-sacred-card/50 p-4 text-center">
                        <p class="text-2xl font-bold text-gold-400">{{ stats.total }}</p>
                        <p class="text-xs text-gray-500">Total Entries</p>
                    </div>
                    <div class="rounded-xl border border-gold-500/20 bg-sacred-card/50 p-4 text-center">
                        <p class="text-2xl font-bold text-emerald-400">{{ stats.published }}</p>
                        <p class="text-xs text-gray-500">Published</p>
                    </div>
                    <div class="rounded-xl border border-gold-500/20 bg-sacred-card/50 p-4 text-center">
                        <p class="text-2xl font-bold text-gray-300">{{ stats.drafts }}</p>
                        <p class="text-xs text-gray-500">Drafts</p>
                    </div>
                    <div class="rounded-xl border border-gold-500/20 bg-sacred-card/50 p-4 text-center">
                        <p class="text-2xl font-bold text-pink-300">🙏 {{ stats.gratitudes }}</p>
                        <p class="text-xs text-gray-500">Gratitudes</p>
                    </div>
                </div>

                <!-- Filter + CTA -->
                <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div class="flex gap-1.5">
                        <button
                            v-for="opt in [['all', 'All'], ['published', 'Published'], ['draft', 'Drafts']]"
                            :key="opt[0]"
                            @click="filter = opt[0]"
                            :class="filter === opt[0] ? 'bg-gold-500/20 text-gold-400 border-gold-500/40' : 'text-gray-400 border-gold-500/10 hover:text-gold-300'"
                            class="rounded-xl border px-3.5 py-1.5 text-sm transition-all"
                        >
                            {{ opt[1] }}
                        </button>
                    </div>
                    <GradientButton href="/journal/create" variant="gold" size="sm">✨ New Entry</GradientButton>
                </div>

                <!-- Empty state -->
                <div v-if="filtered.length === 0" class="rounded-2xl border border-dashed border-gold-500/20 bg-sacred-card/30 py-16 text-center">
                    <p class="text-3xl mb-2">📝</p>
                    <p class="text-gray-400">{{ entries.length === 0 ? 'No entries yet. Begin your sacred journey today.' : 'No entries in this filter.' }}</p>
                    <GradientButton v-if="entries.length === 0" href="/journal/create" variant="outline-gold" size="sm" class="mt-4">
                        Write Your First Entry
                    </GradientButton>
                </div>

                <!-- Entries -->
                <div v-else class="space-y-3">
                    <div
                        v-for="entry in filtered"
                        :key="entry.id"
                        class="rounded-xl border border-gold-500/10 bg-sacred-card/40 p-4 transition-all hover:border-gold-500/30"
                    >
                        <div class="flex items-start justify-between gap-3">
                            <div class="flex items-start gap-3 min-w-0">
                                <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold-500/10 text-sm font-bold text-gold-400">
                                    {{ entry.dayNumber }}
                                </div>
                                <div class="min-w-0">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <h3 class="text-sm font-semibold text-white truncate">{{ entry.title }}</h3>
                                        <span v-if="isMilestoneDay(entry.dayNumber)" class="text-[10px] text-gold-400">✦ Milestone</span>
                                    </div>
                                    <p class="text-xs text-gray-500 mt-0.5">{{ typeIcon(entry.type) }} {{ entry.type }} &middot; {{ formatDate(entry.date) }}</p>
                                    <div class="mt-1.5 flex flex-wrap gap-1.5">
                                        <span v-if="entry.mood" class="rounded-full bg-gold-500/10 px-2 py-0.5 text-[10px] text-gold-400">{{ entry.mood }}</span>
                                        <span v-if="entry.chakra" class="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-gray-300">{{ entry.chakra }}</span>
                                        <span v-if="entry.images?.length" class="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-gray-400">📷 {{ entry.images.length }}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-shrink-0 flex-col items-end gap-2">
                                <span
                                    class="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                                    :class="entry.status === 'published' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'"
                                >
                                    {{ entry.status === 'published' ? 'Published' : 'Draft' }}
                                </span>
                                <div class="flex items-center gap-2">
                                    <a :href="`/journal/create?edit=${entry.id}`" class="text-xs text-gold-400 hover:text-gold-300">Edit</a>
                                    <button @click="togglePublish(entry)" class="text-xs text-gray-400 hover:text-gold-300">
                                        {{ entry.status === 'published' ? 'Unpublish' : 'Publish' }}
                                    </button>
                                    <button @click="askDelete(entry)" class="text-xs text-gray-500 hover:text-pink-400">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Confirm delete -->
        <div v-if="confirmDeleteId !== null" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div class="w-full max-w-sm rounded-2xl border border-gold-500/20 bg-sacred-card p-6">
                <p class="text-sm text-white font-medium">Delete this entry?</p>
                <p class="mt-1 text-xs text-gray-500">This can't be undone.</p>
                <div class="mt-5 flex justify-end gap-3">
                    <button @click="confirmDeleteId = null" class="rounded-lg border border-gold-500/20 px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Cancel</button>
                    <button @click="confirmDelete" class="rounded-lg bg-pink-600 px-4 py-2 text-sm text-white hover:bg-pink-500">Delete</button>
                </div>
            </div>
        </div>
    </WriterLayout>
</template>
