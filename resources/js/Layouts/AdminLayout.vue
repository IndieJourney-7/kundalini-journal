<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import SidebarLink from '@/Components/SidebarLink.vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Admin',
    },
});

const sidebarOpen = ref(false);
const page = usePage();

const isPreview = computed(() => page.url.startsWith('/ui/'));
const adminPath = (path) => isPreview.value ? `/ui/admin/${path}` : `/admin/${path}`;

const navigationGroups = [
    {
        label: 'Overview',
        items: [
            { name: 'Dashboard', href: adminPath('dashboard'), icon: '◈' },
        ],
    },
    {
        label: 'Practitioners',
        items: [
            { name: 'All Practitioners', href: adminPath('practitioners'), icon: '◉' },
            { name: 'Create Access Code', href: adminPath('practitioners/create'), icon: '⊕' },
        ],
    },
    {
        label: 'Community',
        items: [
            { name: 'Broadcast Notice', href: adminPath('broadcast'), icon: '◎' },
            { name: 'Testimonials', href: adminPath('testimonials'), icon: '☆' },
        ],
    },
    {
        label: 'Site Content',
        items: [
            { name: 'Events', href: adminPath('events'), icon: '🗓' },
            { name: 'Meditations', href: adminPath('meditations'), icon: '🧘' },
            { name: 'Knowledge', href: adminPath('knowledge'), icon: '📚' },
            { name: 'Quotes', href: adminPath('quotes'), icon: '❝' },
            { name: 'Donation Settings', href: adminPath('donation'), icon: '💛' },
        ],
    },
    {
        label: 'Tools',
        items: [
            { name: 'QR Codes', href: adminPath('qr-codes'), icon: '▦' },
        ],
    },
];

const openGroups = reactive(
    Object.fromEntries(navigationGroups.map((group) => [group.label, true])),
);

const toggleGroup = (label) => {
    openGroups[label] = !openGroups[label];
};

watch(() => page.url, () => {
    sidebarOpen.value = false;
});

// Dark mode
const darkMode = ref(false);

const initDarkMode = () => {
    const stored = localStorage.getItem('adminDarkMode');
    if (stored === 'true') {
        darkMode.value = true;
        document.documentElement.classList.add('dark');
    } else if (stored === 'false') {
        darkMode.value = false;
        document.documentElement.classList.remove('dark');
    } else {
        // Default to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        darkMode.value = prefersDark;
        if (prefersDark) {
            document.documentElement.classList.add('dark');
        }
    }
};

const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    if (darkMode.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('adminDarkMode', 'true');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('adminDarkMode', 'false');
    }
};

onMounted(() => {
    initDarkMode();
});
</script>

<template>
    <Head :title="title" />

    <div class="min-h-screen bg-gray-50 text-gray-700 dark:bg-[#0f0f13] dark:text-gray-200">
        <!-- Mobile overlay -->
        <transition
            enter-active-class="transition-opacity duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-show="sidebarOpen"
                class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden dark:bg-black/40"
                @click="sidebarOpen = false"
            ></div>
        </transition>

        <!-- Sidebar -->
        <aside
            class="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out lg:translate-x-0 dark:border-[#2e2e3e] dark:bg-[#1a1a23]"
            :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        >
                <!-- Logo -->
                <div class="flex items-center justify-between border-b border-gray-100 px-5 py-5 dark:border-[#262636]">
                    <Link :href="adminPath('dashboard')" class="flex items-center gap-3">
                        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50 text-lg font-bold text-amber-600 ring-1 ring-amber-200 dark:bg-amber-600/10 dark:text-amber-400 dark:ring-amber-400/30">
                            <ApplicationLogo compact class="h-full w-full" />
                        </div>
                        <div class="flex flex-col">
                            <span class="text-base font-semibold text-gray-800 dark:text-gray-100">Admin Panel</span>
                        </div>
                    </Link>
                    <button
                        @click="sidebarOpen = false"
                        class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors lg:hidden dark:text-gray-500 dark:hover:bg-[#262636] dark:hover:text-gray-300"
                        aria-label="Close sidebar"
                    >
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-6">
                    <div v-for="group in navigationGroups" :key="group.label">
                        <button
                            type="button"
                            @click="toggleGroup(group.label)"
                            :aria-expanded="openGroups[group.label]"
                            class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-[#262636] dark:hover:text-gray-300"
                        >
                            <span>{{ group.label }}</span>
                            <svg
                                class="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200"
                                :class="openGroups[group.label] ? 'rotate-180' : ''"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div
                            class="grid transition-[grid-template-rows] duration-200 ease-out"
                            :class="openGroups[group.label] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
                        >
                            <div class="overflow-hidden">
                                <div class="ml-4 space-y-1 border-l border-gray-100 py-1 pl-2 dark:border-[#262636]">
                                    <SidebarLink
                                        v-for="item in group.items"
                                        :key="item.name"
                                        :href="item.href"
                                        :active="page.url === item.href"
                                        :icon="item.icon"
                                    >
                                        {{ item.name }}
                                    </SidebarLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <!-- Bottom -->
                <div class="border-t border-gray-100 px-4 py-4 dark:border-[#262636]">
                    <div class="flex items-center justify-between">
                        <Link
                            :href="isPreview ? '/ui/dashboard' : '/dashboard'"
                            class="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 transition-colors dark:text-gray-400 dark:hover:text-amber-400"
                        >
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Site
                        </Link>
                        <Link
                            :href="route('logout')"
                            method="post"
                            as="button"
                            class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors dark:text-gray-400 dark:hover:text-red-400"
                        >
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>

        <!-- Main area -->
        <div class="lg:pl-64">
            <!-- Top header -->
            <header class="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-[#2e2e3e] dark:bg-[#1a1a23]/90">
                <div class="flex h-16 items-center justify-between px-4 sm:px-6">
                    <button
                        @click="sidebarOpen = true"
                        class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors lg:hidden dark:text-gray-400 dark:hover:bg-[#262636] dark:hover:text-gray-200"
                        aria-label="Open sidebar"
                    >
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <p class="text-lg font-semibold text-gray-800 lg:hidden dark:text-gray-100">{{ title }}</p>
                    <div class="flex-1 lg:flex-none"></div>
                    <div class="flex items-center gap-3">
                        <!-- Dark mode toggle -->
                        <button
                            @click="toggleDarkMode"
                            class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-amber-600 transition-all dark:text-gray-400 dark:hover:bg-[#262636] dark:hover:text-amber-400"
                            :aria-label="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
                            :title="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
                        >
                            <!-- Sun icon (light mode) -->
                            <svg v-if="!darkMode" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <!-- Moon icon (dark mode) -->
                            <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </button>
                        <div class="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                            System Online
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page content -->
            <main class="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
                <div class="mx-auto max-w-6xl">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>
