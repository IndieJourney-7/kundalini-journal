<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { loadContent, saveContent } from '@/content';

const items = reactive([]);

const emptyForm = () => ({ title: '', date: '', time: '', location: '', description: '' });
const form = reactive(emptyForm());
const errors = reactive({ title: '', date: '' });
const editingId = ref(null);

onMounted(() => {
    items.splice(0, items.length, ...loadContent('events'));
});

const persist = () => saveContent('events', items);

const resetForm = () => {
    Object.assign(form, emptyForm());
    errors.title = '';
    errors.date = '';
    editingId.value = null;
};

const submit = () => {
    errors.title = form.title.trim() ? '' : 'Please enter an event title.';
    errors.date = form.date.trim() ? '' : 'Please enter a date.';
    if (errors.title || errors.date) return;

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
        date: item.date,
        time: item.time,
        location: item.location,
        description: item.description,
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

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
</script>

<template>
    <Head title="Events" />

    <AdminLayout title="Events">
        <template #default>
            <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">Events</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage live sessions, workshops, and retreats shown on the public Events page.
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
                        {{ editingId !== null ? 'Edit Event' : 'Add an Event' }}
                    </h2>
                    <form class="mt-4 space-y-4" @submit.prevent="submit">
                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input
                                v-model="form.title"
                                type="text"
                                placeholder="e.g., Kundalini Awakening Workshop"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            />
                            <p v-if="errors.title" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ errors.title }}</p>
                        </div>

                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                                <input
                                    v-model="form.date"
                                    type="date"
                                    class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                                />
                                <p v-if="errors.date" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ errors.date }}</p>
                            </div>
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                                <input
                                    v-model="form.time"
                                    type="text"
                                    placeholder="7:00 PM - 8:30 PM IST"
                                    class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                            <input
                                v-model="form.location"
                                type="text"
                                placeholder="Online, Bangalore, Rishikesh..."
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            />
                        </div>

                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description <span class="normal-case text-gray-400 dark:text-gray-500">(optional)</span>
                            </label>
                            <textarea
                                v-model="form.description"
                                rows="3"
                                placeholder="What should practitioners expect?"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors resize-none dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            ></textarea>
                        </div>

                        <div class="flex gap-3">
                            <button
                                type="submit"
                                class="flex-1 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-600 dark:hover:bg-amber-500 dark:focus:ring-offset-[#1a1a23]"
                            >
                                {{ editingId !== null ? 'Save Changes' : 'Add Event' }}
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
                        <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">Live on Events Page</h2>
                    </div>

                    <div v-if="items.length === 0" class="py-16 text-center">
                        <p class="text-2xl mb-2">🗓️</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">No events yet. Add one to publish it.</p>
                    </div>

                    <div v-else class="divide-y divide-gray-100 dark:divide-[#262636]">
                        <div v-for="item in items" :key="item.id" class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                            <div class="min-w-0">
                                <p class="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">{{ formatDate(item.date) }}</p>
                                <p class="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.title }}</p>
                                <p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{{ item.time }}<span v-if="item.location"> &middot; {{ item.location }}</span></p>
                                <p v-if="item.description" class="mt-1 text-xs text-gray-400 dark:text-gray-500">{{ item.description }}</p>
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
