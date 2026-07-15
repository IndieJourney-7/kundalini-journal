<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { loadContent, saveContent } from '@/content';

const mediaTypes = [
    { value: 'audio', label: 'Audio', icon: '🎧' },
    { value: 'video', label: 'Video', icon: '🎬' },
    { value: 'text', label: 'Text Guide', icon: '📄' },
];

const items = reactive([]);

const emptyForm = () => ({ title: '', description: '', duration: '', mediaType: 'audio', mediaUrl: '' });
const form = reactive(emptyForm());
const errors = reactive({ title: '', description: '' });
const editingId = ref(null);

onMounted(() => {
    items.splice(0, items.length, ...loadContent('meditations'));
});

const persist = () => saveContent('meditations', items);

const resetForm = () => {
    Object.assign(form, emptyForm());
    errors.title = '';
    errors.description = '';
    editingId.value = null;
};

const submit = () => {
    errors.title = form.title.trim() ? '' : 'Please enter a title.';
    errors.description = form.description.trim() ? '' : 'Please enter a short description.';
    if (errors.title || errors.description) return;

    if (editingId.value !== null) {
        const item = items.find((i) => i.id === editingId.value);
        if (item) Object.assign(item, { ...form });
    } else {
        items.unshift({ id: Date.now(), ...form });
    }

    persist();
    resetForm();
};

const editItem = (item) => {
    Object.assign(form, {
        title: item.title,
        description: item.description,
        duration: item.duration,
        mediaType: item.mediaType,
        mediaUrl: item.mediaUrl,
    });
    editingId.value = item.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const removeItem = (item) => {
    const index = items.findIndex((i) => i.id === item.id);
    if (index !== -1) items.splice(index, 1);
    persist();
    if (editingId.value === item.id) resetForm();
};

const mediaLabel = (value) => mediaTypes.find((m) => m.value === value)?.label ?? value;
const mediaIcon = (value) => mediaTypes.find((m) => m.value === value)?.icon ?? '🧘';
</script>

<template>
    <Head title="Meditations" />

    <AdminLayout title="Meditations">
        <template #default>
            <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">Meditations</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage the guided meditation library shown on the public Meditation page.
                    </p>
                </div>
                <span class="inline-flex w-fit items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-[#262636] dark:text-gray-400">
                    Stored in this browser only — no backend yet
                </span>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
                <!-- Form -->
                <div class="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                    <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {{ editingId !== null ? 'Edit Meditation' : 'Add a Meditation' }}
                    </h2>
                    <form class="mt-4 space-y-4" @submit.prevent="submit">
                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input
                                v-model="form.title"
                                type="text"
                                placeholder="e.g., Root to Crown Awakening"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            />
                            <p v-if="errors.title" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ errors.title }}</p>
                        </div>

                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                v-model="form.description"
                                rows="3"
                                placeholder="What does this practice guide the listener through?"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors resize-none dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            ></textarea>
                            <p v-if="errors.description" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ errors.description }}</p>
                        </div>

                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
                                <input
                                    v-model="form.duration"
                                    type="text"
                                    placeholder="20 min"
                                    class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                                />
                            </div>
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                                <select
                                    v-model="form.mediaType"
                                    class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                                >
                                    <option v-for="type in mediaTypes" :key="type.value" :value="type.value">{{ type.icon }} {{ type.label }}</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Media URL <span class="normal-case text-gray-400 dark:text-gray-500">(optional — audio/video link)</span>
                            </label>
                            <input
                                v-model="form.mediaUrl"
                                type="text"
                                placeholder="https://..."
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            />
                        </div>

                        <div class="flex gap-3">
                            <button
                                type="submit"
                                class="flex-1 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-600 dark:hover:bg-amber-500 dark:focus:ring-offset-[#1a1a23]"
                            >
                                {{ editingId !== null ? 'Save Changes' : 'Add Meditation' }}
                            </button>
                            <button
                                v-if="editingId !== null"
                                type="button"
                                @click="resetForm"
                                class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-[#3a3a4e] dark:text-gray-300 dark:hover:bg-[#262636]"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                <!-- List -->
                <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                    <div class="border-b border-gray-100 px-5 py-4 dark:border-[#262636]">
                        <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">Live on Meditation Page</h2>
                    </div>

                    <div v-if="items.length === 0" class="py-16 text-center">
                        <p class="text-2xl mb-2">🧘</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">No meditations yet. Add one to publish it.</p>
                    </div>

                    <div v-else class="divide-y divide-gray-100 dark:divide-[#262636]">
                        <div v-for="item in items" :key="item.id" class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                            <div class="min-w-0">
                                <p class="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                    {{ mediaIcon(item.mediaType) }} {{ mediaLabel(item.mediaType) }}<span v-if="item.duration"> &middot; {{ item.duration }}</span>
                                </p>
                                <p class="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.title }}</p>
                                <p v-if="item.description" class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ item.description }}</p>
                            </div>
                            <div class="flex flex-shrink-0 items-center gap-2">
                                <button @click="editItem(item)" class="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-[#2e2e3e] dark:text-gray-300 dark:hover:bg-[#262636]">
                                    Edit
                                </button>
                                <button @click="removeItem(item)" class="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:border-[#2e2e3e] dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </AdminLayout>
</template>
