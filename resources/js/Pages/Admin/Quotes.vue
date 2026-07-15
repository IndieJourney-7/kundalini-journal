<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { DEFAULT_QUOTES, loadQuotes, saveQuotes } from '@/quotes';

const quotes = reactive([]);

const form = reactive({
    text: '',
    author: '',
});
const errors = reactive({ text: '' });

onMounted(() => {
    quotes.splice(0, quotes.length, ...loadQuotes());
});

const persist = () => saveQuotes(quotes);

const addQuote = () => {
    errors.text = '';

    if (!form.text.trim()) {
        errors.text = 'Please enter a quote or statement.';
        return;
    }

    const isFirst = quotes.length === 0;

    quotes.unshift({
        id: Date.now(),
        text: form.text.trim(),
        author: form.author.trim(),
        active: isFirst, // first quote ever added becomes the homepage quote automatically
    });

    form.text = '';
    form.author = '';
    persist();
};

const setActive = (quote) => {
    quotes.forEach((q) => (q.active = q.id === quote.id));
    persist();
};

const removeQuote = (quote) => {
    const index = quotes.findIndex((q) => q.id === quote.id);
    if (index === -1) return;

    const wasActive = quote.active;
    quotes.splice(index, 1);

    if (wasActive && quotes.length) {
        quotes[0].active = true;
    }

    persist();
};

const resetToDefault = () => {
    quotes.splice(0, quotes.length, ...DEFAULT_QUOTES.map((q) => ({ ...q })));
    persist();
};
</script>

<template>
    <Head title="Quotes" />

    <AdminLayout title="Quotes">
        <template #default>
            <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">Quotes</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        The featured quote appears in a banner below the navbar on the public homepage.
                    </p>
                </div>
                <span class="inline-flex w-fit items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-[#262636] dark:text-gray-400">
                    Stored in this browser only — no backend yet
                </span>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
                <!-- Add quote form -->
                <div class="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                    <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">Add a Quote</h2>
                    <form class="mt-4 space-y-4" @submit.prevent="addQuote">
                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Quote / Statement</label>
                            <textarea
                                v-model="form.text"
                                rows="3"
                                placeholder="e.g., నీ శ్వాసే నీ గురువు."
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors resize-none dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            ></textarea>
                            <p v-if="errors.text" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ errors.text }}</p>
                        </div>

                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Attribution <span class="normal-case text-gray-400 dark:text-gray-500">(optional)</span>
                            </label>
                            <input
                                v-model="form.author"
                                type="text"
                                placeholder="e.g., Golden Age Community"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            />
                        </div>

                        <button
                            type="submit"
                            class="w-full rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-600 dark:hover:bg-amber-500 dark:focus:ring-offset-[#1a1a23]"
                        >
                            Add Quote
                        </button>
                    </form>

                    <button
                        @click="resetToDefault"
                        class="mt-4 text-xs font-medium text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    >
                        Reset to default quote
                    </button>
                </div>

                <!-- Quotes list -->
                <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                    <div class="border-b border-gray-100 px-5 py-4 dark:border-[#262636]">
                        <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">All Quotes</h2>
                    </div>

                    <div v-if="quotes.length === 0" class="py-16 text-center">
                        <p class="text-2xl mb-2">💬</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">No quotes yet. Add one to feature it on the homepage.</p>
                    </div>

                    <div v-else class="divide-y divide-gray-100 dark:divide-[#262636]">
                        <div
                            v-for="quote in quotes"
                            :key="quote.id"
                            class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div class="min-w-0">
                                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ quote.text }}</p>
                                <p v-if="quote.author" class="mt-1 text-xs text-gray-500 dark:text-gray-400">— {{ quote.author }}</p>
                                <span
                                    v-if="quote.active"
                                    class="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/30"
                                >
                                    <span class="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                    Live on homepage
                                </span>
                            </div>
                            <div class="flex flex-shrink-0 items-center gap-2">
                                <button
                                    v-if="!quote.active"
                                    @click="setActive(quote)"
                                    class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-[#2e2e3e] dark:text-gray-300 dark:hover:bg-[#262636]"
                                >
                                    Set as Homepage Quote
                                </button>
                                <button
                                    @click="removeQuote(quote)"
                                    class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:border-[#2e2e3e] dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                >
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
