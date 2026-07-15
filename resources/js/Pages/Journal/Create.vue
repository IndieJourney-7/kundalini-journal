<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import WriterLayout from '@/Layouts/WriterLayout.vue';
import GoldShiningText from '@/Components/GoldShiningText.vue';
import GradientButton from '@/Components/GradientButton.vue';
import { getActiveWriter } from '@/writerSession';
import { loadEntries, saveEntries, nextDayNumber } from '@/journalEntries';
import { readFileAsDataUrl, formatBytes, MAX_PERSISTABLE_BYTES } from '@/media';

const writer = ref(null);
const ready = ref(false);
const entryId = ref(null);
const dayNumber = ref(1);

const form = reactive({
    title: '',
    content: '',
    mood: '',
    chakra: '',
    tags: [],
    mediaSource: 'upload', // 'upload' | 'link'
    mediaUrl: '',
    mediaFileName: '',
});

const activeTab = ref('text');
const showChakraPicker = ref(false);
const mediaWarning = ref('');
const images = reactive([]);
const imageWarning = ref('');
const status = ref('idle'); // idle | saving | saved
const errorMsg = ref('');

const moods = [
    { value: 'blissful', label: '😌 Blissful' },
    { value: 'peaceful', label: '🕊️ Peaceful' },
    { value: 'energetic', label: '⚡ Energetic' },
    { value: 'reflective', label: '🌙 Reflective' },
    { value: 'challenging', label: '🌊 Challenging' },
    { value: 'grateful', label: '🙏 Grateful' },
];

const chakras = [
    { value: 'root', label: 'Root', icon: '🟥' },
    { value: 'sacral', label: 'Sacral', icon: '🟧' },
    { value: 'solar', label: 'Solar Plexus', icon: '🟨' },
    { value: 'heart', label: 'Heart', icon: '🟩' },
    { value: 'throat', label: 'Throat', icon: '🟦' },
    { value: 'third-eye', label: 'Third Eye', icon: '🟪' },
    { value: 'crown', label: 'Crown', icon: '💜' },
];

const experienceTags = [
    'Heat', 'Tingling', 'Spontaneous Movements', 'Light Visions',
    'Spiritual Insights', 'Emotional Release', 'Energy Rush', 'Deep Meditation',
    'Body Sensations', 'Sound Vibrations',
];

const toggleTag = (tag) => {
    const idx = form.tags.indexOf(tag);
    if (idx === -1) form.tags.push(tag);
    else form.tags.splice(idx, 1);
};

const wordCount = computed(() => (form.content.trim() ? form.content.trim().split(/\s+/).length : 0));
const readingTime = computed(() => Math.max(1, Math.round(wordCount.value / 200)));

onMounted(() => {
    const active = getActiveWriter();
    if (!active) return; // WriterLayout handles the redirect
    writer.value = active;

    const editId = new URLSearchParams(window.location.search).get('edit');
    const entries = loadEntries(active.code);

    if (editId) {
        const existing = entries.find((e) => String(e.id) === editId);
        if (existing) {
            entryId.value = existing.id;
            dayNumber.value = existing.dayNumber;
            form.title = existing.title;
            form.content = existing.content;
            form.mood = existing.mood;
            form.chakra = existing.chakra;
            form.tags = [...(existing.tags || [])];
            form.mediaSource = existing.mediaSource || 'upload';
            form.mediaUrl = existing.mediaUrl || '';
            form.mediaFileName = existing.mediaFileName || '';
            activeTab.value = existing.type || 'text';
            images.splice(0, images.length, ...(existing.images || []));
        }
    } else {
        dayNumber.value = nextDayNumber(active.code);
    }

    ready.value = true;
});

const handleMediaFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    form.mediaSource = 'upload';
    form.mediaFileName = file.name;
    mediaWarning.value = '';

    if (file.size <= MAX_PERSISTABLE_BYTES) {
        form.mediaUrl = await readFileAsDataUrl(file);
    } else {
        form.mediaUrl = URL.createObjectURL(file);
        mediaWarning.value = `"${file.name}" (${formatBytes(file.size)}) is large — this preview works now but won't be saved after a refresh. Paste a hosted link below instead to save it permanently.`;
    }
};

const clearMedia = () => {
    form.mediaUrl = '';
    form.mediaFileName = '';
    mediaWarning.value = '';
};

const handleImageFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    imageWarning.value = '';

    for (const file of files) {
        if (file.size > MAX_PERSISTABLE_BYTES) {
            imageWarning.value = `"${file.name}" (${formatBytes(file.size)}) is too large — max ${formatBytes(MAX_PERSISTABLE_BYTES)} per image.`;
            continue;
        }
        const dataUrl = await readFileAsDataUrl(file);
        images.push({ id: Date.now() + Math.random(), name: file.name, dataUrl });
    }

    event.target.value = '';
};

const removeImage = (id) => {
    const idx = images.findIndex((img) => img.id === id);
    if (idx !== -1) images.splice(idx, 1);
};

const persistEntry = (nextStatus) => {
    const code = writer.value.code;
    const entries = loadEntries(code);
    const existingIndex = entryId.value !== null ? entries.findIndex((e) => e.id === entryId.value) : -1;
    const now = new Date().toISOString();

    const payload = {
        id: entryId.value ?? Date.now(),
        title: form.title.trim() || 'Untitled Entry',
        type: activeTab.value,
        content: form.content,
        mediaSource: form.mediaSource,
        mediaUrl: form.mediaUrl,
        mediaFileName: form.mediaFileName,
        images: [...images],
        mood: form.mood,
        chakra: form.chakra,
        tags: [...form.tags],
        dayNumber: dayNumber.value,
        date: existingIndex !== -1 ? entries[existingIndex].date : now,
        status: nextStatus,
        gratitudes: existingIndex !== -1 ? (entries[existingIndex].gratitudes ?? 0) : 0,
        createdAt: existingIndex !== -1 ? entries[existingIndex].createdAt : now,
        updatedAt: now,
    };

    if (existingIndex !== -1) entries[existingIndex] = payload;
    else entries.unshift(payload);

    saveEntries(code, entries);
    entryId.value = payload.id;
    return payload;
};

// Silent autosave every 30s while there's a title to save against (spec: "auto-save every 30 seconds").
let autosaveTimer = null;
const scheduleAutosave = () => {
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => {
        if (!ready.value || !writer.value || !form.title.trim()) return;
        status.value = 'saving';
        const existing = entryId.value ? loadEntries(writer.value.code).find((e) => e.id === entryId.value) : null;
        persistEntry(existing ? existing.status : 'draft');
        status.value = 'saved';
    }, 30000);
};

watch(() => [form.title, form.content, form.mediaUrl, images.length], () => {
    if (ready.value) scheduleAutosave();
}, { deep: true });

onBeforeUnmount(() => clearTimeout(autosaveTimer));

const saveDraft = () => {
    errorMsg.value = '';
    if (!form.title.trim()) {
        errorMsg.value = 'Please add a title before saving.';
        return;
    }
    persistEntry('draft');
    status.value = 'saved';
};

const publish = () => {
    errorMsg.value = '';
    if (!form.title.trim()) {
        errorMsg.value = 'Please add a title before publishing.';
        return;
    }
    if (activeTab.value === 'text' && !form.content.trim()) {
        errorMsg.value = 'Please write something before publishing a text entry.';
        return;
    }
    if ((activeTab.value === 'audio' || activeTab.value === 'video') && !form.mediaUrl) {
        errorMsg.value = `Please add ${activeTab.value === 'audio' ? 'an audio file/link' : 'a video file/link'} before publishing.`;
        return;
    }
    persistEntry('published');
    router.visit('/journal/entries');
};
</script>

<template>
    <Head title="New Journal Entry" />

    <WriterLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <div>
                    <GoldShiningText as="h2" size="text-2xl">
                        {{ entryId ? 'Edit Journal Entry' : 'New Journal Entry' }}
                    </GoldShiningText>
                    <p class="text-sm text-gray-400 mt-1">Document your sacred journey</p>
                </div>
                <div class="flex items-center gap-2 rounded-xl border border-gold-500/20 bg-sacred-card/50 px-4 py-2 text-sm">
                    <span class="text-gold-400 font-medium">Day</span>
                    <span class="text-white font-bold">{{ dayNumber }}</span>
                </div>
            </div>
        </template>

        <div v-if="ready" class="py-8">
            <div class="mx-auto max-w-4xl">
                <div class="rounded-2xl border border-gold-500/20 bg-sacred-card/50 backdrop-blur-sm overflow-hidden">
                    <!-- Entry type tabs -->
                    <div class="flex border-b border-gold-500/10">
                        <button
                            v-for="tab in ['text', 'audio', 'video']"
                            :key="tab"
                            @click="activeTab = tab"
                            :class="activeTab === tab
                                ? 'text-gold-400 border-b-2 border-gold-500 bg-gold-500/5'
                                : 'text-gray-500 hover:text-gold-300'"
                            class="flex-1 px-6 py-4 text-sm font-medium capitalize transition-all"
                        >
                            {{ tab === 'text' ? '📝' : tab === 'audio' ? '🎵' : '🎬' }}
                            {{ tab }}
                        </button>
                    </div>

                    <!-- Form content -->
                    <div class="p-6">
                        <form @submit.prevent="publish" class="space-y-5">
                            <!-- Title -->
                            <div>
                                <input
                                    v-model="form.title"
                                    type="text"
                                    placeholder="Title of your entry..."
                                    class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3.5 text-base text-white placeholder-gray-500 backdrop-blur-sm focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all font-heading"
                                />
                            </div>

                            <!-- Text content -->
                            <div v-if="activeTab === 'text'">
                                <textarea
                                    v-model="form.content"
                                    rows="12"
                                    placeholder="Write your sacred thoughts..."
                                    class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3.5 text-sm text-white placeholder-gray-500 backdrop-blur-sm focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all resize-none leading-relaxed"
                                ></textarea>
                                <div class="mt-2 flex items-center justify-between text-xs text-gray-500">
                                    <span>{{ wordCount }} words · ~{{ readingTime }} min read</span>
                                    <span v-if="status === 'saving'" class="text-gold-400">Auto-saving...</span>
                                    <span v-else-if="status === 'saved'" class="text-emerald-400">Saved</span>
                                </div>
                            </div>

                            <!-- Audio upload -->
                            <div v-if="activeTab === 'audio'">
                                <div v-if="!form.mediaUrl" class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gold-500/20 bg-sacred-dark/30 p-10">
                                    <p class="text-4xl mb-4">🎵</p>
                                    <p class="text-sm text-gray-400 mb-2">Upload audio</p>
                                    <p class="text-xs text-gray-600 mb-4">Share your mantra, chant, or voice reflection</p>
                                    <label class="cursor-pointer">
                                        <span class="inline-flex items-center justify-center rounded-xl border border-gold-500/70 px-5 py-2.5 text-sm font-medium text-gold-700 hover:bg-gold-500/10 transition-all">
                                            Choose Audio File
                                        </span>
                                        <input type="file" accept="audio/*" class="hidden" @change="handleMediaFile" />
                                    </label>
                                </div>
                                <div v-else class="rounded-xl border border-gold-500/20 bg-sacred-dark/30 p-5">
                                    <audio :src="form.mediaUrl" controls class="w-full"></audio>
                                    <div class="mt-3 flex items-center justify-between">
                                        <p class="text-xs text-gray-500 truncate">{{ form.mediaFileName }}</p>
                                        <button type="button" @click="clearMedia" class="text-xs text-pink-400 hover:text-pink-300">Remove</button>
                                    </div>
                                </div>
                                <p class="mt-2 text-xs text-gray-500">Or paste a hosted audio link instead:</p>
                                <input
                                    v-model="form.mediaUrl"
                                    @input="form.mediaSource = 'link'"
                                    type="text"
                                    placeholder="https://..."
                                    class="mt-1 w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                                />
                                <p v-if="mediaWarning" class="mt-2 text-xs text-amber-400">{{ mediaWarning }}</p>
                            </div>

                            <!-- Video upload -->
                            <div v-if="activeTab === 'video'">
                                <div v-if="!form.mediaUrl" class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gold-500/20 bg-sacred-dark/30 p-10">
                                    <p class="text-4xl mb-4">🎬</p>
                                    <p class="text-sm text-gray-400 mb-2">Upload video</p>
                                    <p class="text-xs text-gray-600 mb-4">Share your meditation or movement practice</p>
                                    <label class="cursor-pointer">
                                        <span class="inline-flex items-center justify-center rounded-xl border border-gold-500/70 px-5 py-2.5 text-sm font-medium text-gold-700 hover:bg-gold-500/10 transition-all">
                                            Choose Video File
                                        </span>
                                        <input type="file" accept="video/*" class="hidden" @change="handleMediaFile" />
                                    </label>
                                </div>
                                <div v-else class="rounded-xl border border-gold-500/20 bg-sacred-dark/30 p-3">
                                    <video :src="form.mediaUrl" controls class="w-full rounded-lg max-h-80"></video>
                                    <div class="mt-3 flex items-center justify-between px-2 pb-1">
                                        <p class="text-xs text-gray-500 truncate">{{ form.mediaFileName }}</p>
                                        <button type="button" @click="clearMedia" class="text-xs text-pink-400 hover:text-pink-300">Remove</button>
                                    </div>
                                </div>
                                <p class="mt-2 text-xs text-gray-500">Or paste a hosted video link instead:</p>
                                <input
                                    v-model="form.mediaUrl"
                                    @input="form.mediaSource = 'link'"
                                    type="text"
                                    placeholder="https://..."
                                    class="mt-1 w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                                />
                                <p v-if="mediaWarning" class="mt-2 text-xs text-amber-400">{{ mediaWarning }}</p>
                            </div>

                            <!-- Images (available for any entry type) -->
                            <div class="border-t border-gold-500/10 pt-5">
                                <label class="mb-2 block text-xs font-medium text-gray-400">
                                    📷 Images <span class="normal-case text-gray-600">(optional, any entry type)</span>
                                </label>
                                <div class="flex flex-wrap gap-3">
                                    <div v-for="img in images" :key="img.id" class="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gold-500/20">
                                        <img :src="img.dataUrl" class="h-full w-full object-cover" :alt="img.name" />
                                        <button
                                            type="button"
                                            @click="removeImage(img.id)"
                                            class="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-pink-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <label class="flex h-20 w-20 flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gold-500/20 text-gray-500 hover:border-gold-500/40 hover:text-gold-400 transition-all">
                                        <span class="text-xl">+</span>
                                        <span class="text-[10px]">Add</span>
                                        <input type="file" accept="image/*" multiple class="hidden" @change="handleImageFiles" />
                                    </label>
                                </div>
                                <p v-if="imageWarning" class="mt-2 text-xs text-amber-400">{{ imageWarning }}</p>
                            </div>

                            <!-- Tags row -->
                            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <!-- Mood -->
                                <div>
                                    <label class="mb-2 block text-xs font-medium text-gray-400">Mood</label>
                                    <select
                                        v-model="form.mood"
                                        class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-3 py-2.5 text-sm text-white focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                                    >
                                        <option value="" disabled>Select mood...</option>
                                        <option v-for="mood in moods" :key="mood.value" :value="mood.value">{{ mood.label }}</option>
                                    </select>
                                </div>

                                <!-- Chakra -->
                                <div>
                                    <label class="mb-2 block text-xs font-medium text-gray-400">Chakra</label>
                                    <div class="relative">
                                        <button
                                            type="button"
                                            @click="showChakraPicker = !showChakraPicker"
                                            class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-3 py-2.5 text-sm text-white text-left focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                                        >
                                            {{ form.chakra ? chakras.find(c => c.value === form.chakra)?.icon + ' ' + chakras.find(c => c.value === form.chakra)?.label : 'Select chakra...' }}
                                        </button>
                                        <div v-if="showChakraPicker" class="absolute top-full left-0 right-0 z-10 mt-1 rounded-xl border border-gold-500/20 bg-sacred-card p-2 shadow-xl">
                                            <button
                                                v-for="chakra in chakras"
                                                :key="chakra.value"
                                                type="button"
                                                @click="form.chakra = chakra.value; showChakraPicker = false"
                                                class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gold-500/10 hover:text-white transition-all"
                                            >
                                                <span>{{ chakra.icon }}</span>
                                                <span>{{ chakra.label }}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Experience Tags -->
                            <div>
                                <label class="mb-2 block text-xs font-medium text-gray-400">Experience Tags</label>
                                <div class="flex flex-wrap gap-2">
                                    <button
                                        v-for="tag in experienceTags"
                                        :key="tag"
                                        type="button"
                                        @click="toggleTag(tag)"
                                        :class="form.tags.includes(tag)
                                            ? 'bg-gold-500/20 text-gold-400 border-gold-500/40'
                                            : 'text-gray-400 border-gold-500/10 hover:text-gold-300'"
                                        class="rounded-xl border px-3 py-1.5 text-xs transition-all"
                                    >
                                        {{ tag }}
                                    </button>
                                </div>
                            </div>

                            <p v-if="errorMsg" class="text-sm text-pink-400">{{ errorMsg }}</p>

                            <!-- Actions -->
                            <div class="flex flex-wrap items-center gap-3 border-t border-gold-500/10 pt-5">
                                <GradientButton type="button" @click="saveDraft" variant="outline-gold">
                                    💾 Save as Draft
                                </GradientButton>
                                <GradientButton type="submit" variant="gold">
                                    ✨ Publish Entry
                                </GradientButton>
                                <span class="ml-auto text-xs text-gray-600">Your journey is sacred. Write from the heart.</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </WriterLayout>
</template>
