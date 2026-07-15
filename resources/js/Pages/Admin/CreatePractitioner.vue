<script setup>
import { reactive, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

// Frontend-only preview: generates a code in the browser (GA-YYYY-XXXXXX pattern).
// No request is sent — wire this up to a real backend endpoint once the practitioner
// data model exists.
const form = reactive({
    name: '',
    processing: false,
    errors: {},
});

const generatedCode = ref(null);
const copied = ref(false);

const generateAccessCode = () => {
    const year = new Date().getFullYear();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 6; i += 1) {
        suffix += chars[Math.floor(Math.random() * chars.length)];
    }
    return `GA-${year}-${suffix}`;
};

const submit = () => {
    form.errors = {};

    if (!form.name.trim()) {
        form.errors.name = 'Please enter the practitioner\'s full name.';
        return;
    }

    form.processing = true;

    // Simulated latency so the button state reads naturally; remove once backed by a real API call.
    setTimeout(() => {
        generatedCode.value = generateAccessCode();
        form.name = '';
        form.processing = false;
    }, 350);
};

const copyCode = () => {
    if (generatedCode.value) {
        navigator.clipboard.writeText(generatedCode.value);
        copied.value = true;
        setTimeout(() => (copied.value = false), 2000);
    }
};

const generateAnother = () => {
    generatedCode.value = null;
    copied.value = false;
};
</script>

<template>
    <Head title="Create Practitioner" />

    <AdminLayout title="Create Practitioner">
        <template #default>
            <div class="max-w-2xl mx-auto">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">Create Practitioner</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Generate a unique access code for a new practitioner.</p>
                </div>

                <!-- Form card -->
                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                    <form @submit.prevent="submit" class="space-y-5">
                        <!-- Name -->
                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input
                                v-model="form.name"
                                type="text"
                                placeholder="e.g., Amara Devi"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            />
                            <p v-if="form.errors.name" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ form.errors.name }}</p>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center gap-3 pt-1">
                            <button
                                type="submit"
                                :disabled="form.processing"
                                class="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-amber-600 dark:hover:bg-amber-500 dark:focus:ring-offset-[#1a1a23]"
                            >
                                {{ form.processing ? 'Generating...' : 'Generate Code' }}
                            </button>
                            <a
                                :href="$page.url.startsWith('/ui/') ? '/ui/admin/practitioners' : '/admin/practitioners'"
                                class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-[#3a3a4e] dark:text-gray-300 dark:hover:bg-[#262636]"
                            >
                                Cancel
                            </a>
                        </div>
                    </form>

                    <!-- Generated code display -->
                    <div
                        v-if="generatedCode"
                        class="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 dark:border-amber-400/30 dark:bg-amber-600/10"
                    >
                        <div class="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Access Code — One-time Use</div>
                        <div class="flex items-center justify-between gap-3">
                            <code class="text-xl font-mono tracking-wider text-amber-800 select-all bg-white px-3 py-1.5 rounded border border-amber-200 dark:text-amber-300 dark:bg-[#1a1a23] dark:border-amber-400/30">{{ generatedCode }}</code>
                            <button
                                @click="copyCode"
                                class="flex-shrink-0 rounded-lg border border-amber-300 px-3 py-1.5 text-sm font-medium text-amber-700 transition-all hover:bg-amber-100 dark:border-amber-400/30 dark:text-amber-400 dark:hover:bg-amber-600/20"
                            >
                                {{ copied ? 'Copied!' : 'Copy Code' }}
                            </button>
                        </div>
                        <p class="mt-3 text-xs text-amber-600/80 dark:text-amber-400/70">Share this code privately with the practitioner. It can only be used once.</p>
                        <div class="mt-3">
                            <button
                                @click="generateAnother"
                                class="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors dark:text-amber-400 dark:hover:text-amber-300"
                            >
                                &larr; Generate another code
                            </button>
                        </div>
                    </div>

                    <!-- Empty state -->
                    <div
                        v-else
                        class="mt-6 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center dark:border-[#3a3a4e] dark:bg-[#141420]"
                    >
                        <p class="text-sm text-gray-500 dark:text-gray-400">Enter a name above and click "Generate Code" to create a unique access code.</p>
                    </div>
                </div>
            </div>
        </template>
    </AdminLayout>
</template>
