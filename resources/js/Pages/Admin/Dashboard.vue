<script setup>
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { computed } from 'vue';

const props = defineProps({
    stats: {
        type: Object,
        default: () => ({
            totalPractitioners: 0,
            entriesToday: 0,
            activeUsers: 0,
            totalEntries: 0,
        }),
    },
    recentEntries: {
        type: Array,
        default: () => [],
    },
    recentPractitioners: {
        type: Array,
        default: () => [],
    },
});

const chakraRows = computed(() => [
    { name: 'Root', value: 120, color: 'bg-rose-500' },
    { name: 'Sacral', value: 116, color: 'bg-orange-400' },
    { name: 'Solar Plexus', value: 96, color: 'bg-yellow-400' },
    { name: 'Heart', value: 92, color: 'bg-green-500' },
    { name: 'Throat', value: 72, color: 'bg-sky-400' },
    { name: 'Third Eye', value: 68, color: 'bg-indigo-500' },
    { name: 'Crown', value: 48, color: 'bg-violet-400' },
]);

const maxChakraValue = computed(() => Math.max(...chakraRows.value.map((row) => row.value)));

const statCards = computed(() => [
    { label: 'Total Practitioners', value: props.stats.totalPractitioners, icon: '👥', color: 'bg-amber-50 text-amber-600 ring-amber-200 dark:bg-amber-600/10 dark:text-amber-400 dark:ring-amber-400/30' },
    { label: 'Active Journeys', value: props.stats.activeUsers, icon: '📈', color: 'bg-emerald-50 text-emerald-600 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/30' },
    { label: 'Entries Today', value: props.stats.entriesToday, icon: '📝', color: 'bg-blue-50 text-blue-600 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/30' },
    { label: 'Total Entries', value: props.stats.totalEntries, icon: '📚', color: 'bg-purple-50 text-purple-600 ring-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-400/30' },
]);

function getInitials(name) {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
}
</script>

<template>
    <Head title="Dashboard" />

    <AdminLayout title="Dashboard">
        <template #default>
            <!-- Page header -->
            <div class="mb-8">
                <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">Dashboard</h1>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Overview of your application activity and metrics.</p>
            </div>

            <!-- Stats grid -->
            <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div
                    v-for="card in statCards"
                    :key="card.label"
                    class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-[#2e2e3e] dark:bg-[#1a1a23] dark:hover:shadow-lg dark:hover:shadow-black/20"
                >
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ card.label }}</p>
                            <p class="mt-1.5 text-3xl font-bold text-gray-900 dark:text-gray-100">{{ card.value }}</p>
                        </div>
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg text-lg" :class="card.color">
                            {{ card.icon }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts & Recent Activity -->
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <!-- Recent practitioners -->
                <section class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                    <div class="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-[#262636]">
                        <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">Recent Practitioners</h2>
                        <a
                            :href="$page.url.startsWith('/ui/') ? '/ui/admin/practitioners' : '/admin/practitioners'"
                            class="text-xs font-medium text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                        >
                            View all &rarr;
                        </a>
                    </div>
                    <div class="p-5">
                        <div v-if="recentPractitioners.length === 0" class="py-12 text-center">
                            <p class="text-3xl mb-2">👤</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">No practitioners yet.</p>
                        </div>
                        <div v-else class="space-y-3">
                            <div
                                v-for="(practitioner, index) in recentPractitioners"
                                :key="practitioner.id"
                                class="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-[#262636]"
                            >
                                <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-600/10 dark:text-amber-400 dark:ring-amber-400/30">
                                    {{ getInitials(practitioner.name) }}
                                </div>
                                <div class="min-w-0 flex-1">
                                    <p class="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{{ practitioner.name }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ practitioner.status === 'active' ? 'Active' : 'Inactive' }}</p>
                                </div>
                                <p class="text-xs text-gray-400 dark:text-gray-500">Day {{ (index + 1) * 21 }}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Chakra distribution -->
                <section class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                    <div class="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-[#262636]">
                        <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">Entries by Chakra</h2>
                        <span class="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:bg-[#262636] dark:text-gray-400">
                            Sample data
                        </span>
                    </div>
                    <div class="p-5">
                        <div class="space-y-4">
                            <div v-for="row in chakraRows" :key="row.name">
                                <div class="mb-1.5 flex items-center justify-between text-sm">
                                    <span class="font-medium text-gray-700 dark:text-gray-300">{{ row.name }}</span>
                                    <span class="text-gray-500 dark:text-gray-400">{{ row.value }}</span>
                                </div>
                                <div class="h-2 rounded-full bg-gray-100 dark:bg-[#262636]">
                                    <div
                                        class="h-2 rounded-full transition-all duration-500"
                                        :class="row.color"
                                        :style="{ width: `${(row.value / maxChakraValue) * 100}%` }"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </template>
    </AdminLayout>
</template>
