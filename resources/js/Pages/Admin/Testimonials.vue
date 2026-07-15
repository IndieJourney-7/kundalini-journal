<script setup>
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

const props = defineProps({
    testimonials: {
        type: Array,
        default: () => [],
    },
    availableEntries: {
        type: Array,
        default: () => [],
    },
});

const showSelector = ref(false);
const selectedEntryId = ref([]);

const toggleFeatured = (id) => {
    console.log('Toggle featured:', id);
};

const removeTestimonial = (id) => {
    console.log('Remove testimonial:', id);
};

function getInitials(name) {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
}
</script>

<template>
    <Head title="Testimonials" />

    <AdminLayout title="Testimonials">
        <template #default>
            <!-- Header -->
            <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">Featured Testimonials</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Select journal entries to feature on the public homepage.</p>
                </div>
                <button
                    @click="showSelector = !showSelector"
                    class="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-600 dark:hover:bg-amber-500 dark:focus:ring-offset-[#1a1a23]"
                >
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    {{ showSelector ? 'Close Selector' : 'Add Testimonials' }}
                </button>
            </div>

            <!-- Entry Selector Panel -->
            <transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-4 max-h-0"
                enter-to-class="opacity-100 translate-y-0 max-h-96"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0 max-h-96"
                leave-to-class="opacity-0 -translate-y-4 max-h-0"
            >
                <div v-if="showSelector" class="mb-6 overflow-hidden">
                    <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                        <h3 class="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Select entries to feature</h3>
                        <div v-if="availableEntries.length === 0" class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                            <p>No available entries to feature.</p>
                        </div>
                        <div v-else class="space-y-2">
                            <div
                                v-for="entry in availableEntries"
                                :key="entry.id"
                                class="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-amber-200 hover:bg-amber-50/50 dark:border-[#2e2e3e] dark:bg-[#14141e] dark:hover:border-amber-400/30 dark:hover:bg-amber-600/10"
                                @click="selectedEntryId.includes(entry.id) ? selectedEntryId = selectedEntryId.filter((id) => id !== entry.id) : selectedEntryId.push(entry.id)"
                            >
                                <input
                                    type="checkbox"
                                    :value="entry.id"
                                    v-model="selectedEntryId"
                                    class="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 dark:border-gray-500 dark:bg-[#14141e] dark:text-amber-400 dark:focus:ring-amber-400"
                                />
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-100">{{ entry.title }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">by {{ entry.author }} &middot; Day {{ entry.day }}</p>
                                </div>
                                <p class="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">{{ entry.date }}</p>
                            </div>
                        </div>
                        <div v-if="selectedEntryId.length" class="mt-4 flex justify-end border-t border-gray-100 pt-4 dark:border-[#262636]">
                            <button class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500">
                                Save Featured Set
                            </button>
                        </div>
                    </div>
                </div>
            </transition>

            <!-- Empty state -->
            <div v-if="testimonials.length === 0 && availableEntries.length === 0" class="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-20 dark:border-[#3a3a4e] dark:bg-[#1a1a23]">
                <p class="text-3xl mb-3">⭐</p>
                <p class="text-base font-medium text-gray-900 mb-1 dark:text-gray-100">No featured testimonials yet</p>
                <p class="text-sm text-gray-500 mb-6 dark:text-gray-400">Select powerful journal entries to showcase on the homepage.</p>
                <button
                    @click="showSelector = true"
                    class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-[#3a3a4e] dark:text-gray-300 dark:hover:bg-[#262636]"
                >
                    Add your first testimonial
                </button>
            </div>

            <!-- Testimonial cards -->
            <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="testimonial in (testimonials.length ? testimonials : availableEntries.slice(0, 8))"
                    :key="testimonial.id"
                    class="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-[#2e2e3e] dark:bg-[#1a1a23] dark:hover:shadow-lg dark:hover:shadow-black/20"
                >
                    <div class="flex items-start gap-3">
                        <input
                            type="checkbox"
                            :checked="selectedEntryId.includes(testimonial.id)"
                            @change="selectedEntryId.includes(testimonial.id) ? selectedEntryId = selectedEntryId.filter((id) => id !== testimonial.id) : selectedEntryId.push(testimonial.id)"
                            class="mt-1 h-4 w-4 flex-shrink-0 rounded border-gray-300 text-amber-600 focus:ring-amber-500 dark:border-gray-500 dark:bg-[#14141e] dark:text-amber-400 dark:focus:ring-amber-400"
                        />
                        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-600/10 dark:text-amber-400 dark:ring-amber-400/30">
                            {{ getInitials(testimonial.author || testimonial.name) }}
                        </div>
                        <div class="min-w-0 flex-1">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-100">{{ testimonial.author || testimonial.name }}</p>
                            <p class="mt-0.5 text-xs text-gray-500 truncate dark:text-gray-400">{{ testimonial.tagline || testimonial.title || 'Journal entry' }}</p>
                        </div>
                    </div>
                    <div class="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-[#262636]">
                        <button
                            @click="toggleFeatured(testimonial.id)"
                            class="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors dark:text-amber-400 dark:hover:text-amber-300"
                        >
                            {{ selectedEntryId.includes(testimonial.id) ? 'Selected' : 'Select' }}
                        </button>
                        <button
                            @click="removeTestimonial(testimonial.id)"
                            class="text-xs text-gray-500 hover:text-red-600 transition-colors dark:text-gray-400 dark:hover:text-red-400"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bottom bar -->
            <div v-if="testimonials.length || availableEntries.length" class="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-[#262636]">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ selectedEntryId.length }} testimonial{{ selectedEntryId.length === 1 ? '' : 's' }} selected
                </p>
                <button
                    v-if="selectedEntryId.length"
                    class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
                >
                    Save Featured Set
                </button>
            </div>
        </template>
    </AdminLayout>
</template>
