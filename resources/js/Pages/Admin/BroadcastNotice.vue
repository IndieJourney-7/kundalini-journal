<script setup>
import { ref } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

const form = useForm({
    title: '',
    message: '',
    priority: 'normal',
    target: 'all',
});

const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:ring-gray-600' },
    { value: 'normal', label: 'Normal', color: 'bg-blue-50 text-blue-600 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/30' },
    { value: 'high', label: 'High', color: 'bg-amber-50 text-amber-600 ring-amber-200 dark:bg-amber-600/10 dark:text-amber-400 dark:ring-amber-400/30' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-50 text-red-600 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/30' },
];

const targetOptions = [
    { value: 'all', label: 'All Practitioners' },
    { value: 'active', label: 'Active Only' },
    { value: 'inactive', label: 'Inactive Only' },
];

const submit = () => {
    form.post('/admin/broadcast', {
        onSuccess: () => {
            form.reset();
            showSuccess.value = true;
            setTimeout(() => (showSuccess.value = false), 5000);
        },
    });
};

const showSuccess = ref(false);
</script>

<template>
    <Head title="Broadcast Notice" />

    <AdminLayout title="Broadcast Notice">
        <template #default>
            <div class="max-w-2xl mx-auto">
                <!-- Header -->
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">Broadcast a Notice</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Send a notification that will appear for all selected practitioners.</p>
                </div>

                <!-- Success alert -->
                <transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 -translate-y-4"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-4"
                >
                    <div
                        v-if="showSuccess"
                        class="mb-5 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                    >
                        <svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Notice broadcast successfully to all selected practitioners.</span>
                    </div>
                </transition>

                <!-- Form card -->
                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                    <form @submit.prevent="submit" class="space-y-5">
                        <!-- Title -->
                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Notice Title</label>
                            <input
                                v-model="form.title"
                                type="text"
                                placeholder="e.g., Maintenance Downtime"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            />
                            <p v-if="form.errors.title" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ form.errors.title }}</p>
                        </div>

                        <!-- Message -->
                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea
                                v-model="form.message"
                                rows="5"
                                placeholder="Write your notice message here..."
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors resize-none dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            ></textarea>
                            <p v-if="form.errors.message" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ form.errors.message }}</p>
                        </div>

                        <!-- Options grid -->
                        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <!-- Priority -->
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                                <div class="flex flex-wrap gap-2">
                                    <button
                                        v-for="option in priorityOptions"
                                        :key="option.value"
                                        type="button"
                                        @click="form.priority = option.value"
                                        :class="[
                                            form.priority === option.value
                                                ? option.color + ' ring-1'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-[#262636]',
                                            'rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium transition-all dark:border-[#2e2e3e]'
                                        ]"
                                    >
                                        {{ option.label }}
                                    </button>
                                </div>
                            </div>

                            <!-- Target -->
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Target Audience</label>
                                <div class="flex flex-wrap gap-2">
                                    <button
                                        v-for="option in targetOptions"
                                        :key="option.value"
                                        type="button"
                                        @click="form.target = option.value"
                                        :class="[
                                            form.target === option.value
                                                ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-600/10 dark:text-amber-400 dark:ring-amber-400/30'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-[#262636]',
                                            'rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium transition-all dark:border-[#2e2e3e]'
                                        ]"
                                    >
                                        {{ option.label }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Preview -->
                        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-[#2e2e3e] dark:bg-[#141420]">
                            <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Preview</p>
                            <div v-if="form.title || form.message" class="space-y-1">
                                <p class="text-sm font-semibold text-gray-900 dark:text-gray-100" v-if="form.title">{{ form.title }}</p>
                                <p class="text-sm text-gray-600 dark:text-gray-300" v-if="form.message" v-text="form.message"></p>
                            </div>
                            <p v-else class="text-sm text-gray-400 dark:text-gray-500 italic">Your notice preview will appear here...</p>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-[#262636]">
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                Will be sent to <strong class="text-gray-700 dark:text-gray-200">{{ form.target === 'all' ? 'all' : form.target }}</strong> practitioners
                            </p>
                            <div class="flex gap-3">
                                <button
                                    type="submit"
                                    :disabled="form.processing"
                                    class="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-amber-600 dark:hover:bg-amber-500 dark:focus:ring-offset-[#1a1a23]"
                                >
                                    {{ form.processing ? 'Sending...' : 'Send Notice' }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </template>
    </AdminLayout>
</template>
