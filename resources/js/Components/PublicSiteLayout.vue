<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import FloatingContactButtons from '@/Components/FloatingContactButtons.vue';

const props = defineProps({
    active: {
        type: String,
        default: 'home',
    },
});

const mobileMenuOpen = ref(false);
const openDropdown = ref(null);
const desktopNavRef = ref(null);
const page = usePage();

watch(() => page.url, () => {
    mobileMenuOpen.value = false;
    openDropdown.value = null;
});

const menu = [
    { key: 'home', label: 'Home', href: '/' },
    {
        key: 'about',
        label: 'About',
        href: '/about',
        children: [
            { key: 'about', label: 'About GASM', href: '/about' },
            { key: 'grand-master', label: 'About Grand Master Dr Hari Krishna', href: '/about/grand-master' },
            { key: 'core-team', label: 'Core Team', href: '/about/core-team' },
        ],
    },
    {
        key: 'meditation',
        label: 'Meditation',
        href: '/meditation',
        children: [
            { key: 'golden-rules', label: 'Golden Rules', href: '/golden-rules' },
            { key: 'knowledge', label: 'Knowledge', href: '/knowledge' },
        ],
    },
    { key: 'events', label: 'Events', href: '/events' },
    { key: 'journals', label: 'Journals', href: '/community' },
    { key: 'contact', label: 'Contact', href: '/contact' },
];

const isParentActive = (item) =>
    props.active === item.key || (item.children ?? []).some((child) => child.key === props.active);

const toggleDropdown = (key) => {
    openDropdown.value = openDropdown.value === key ? null : key;
};

const handleOutsideClick = (event) => {
    if (desktopNavRef.value && !desktopNavRef.value.contains(event.target)) {
        openDropdown.value = null;
    }
};

onMounted(() => {
    window.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', handleOutsideClick);
});

const footerGroups = [
    {
        title: 'Quick Links',
        items: [
            { label: 'Home', href: '/' },
            { label: 'About GASM', href: '/about' },
            { label: 'Meditation', href: '/meditation' },
            { label: 'Events', href: '/events' },
            { label: 'Journals', href: '/community' },
            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Resources',
        items: [
            { label: 'Golden Rules', href: '/golden-rules' },
            { label: 'Knowledge', href: '/knowledge' },
            { label: 'Blog', href: '/blog' },
            { label: 'FAQ', href: '/contact' },
        ],
    },
    {
        title: 'About',
        items: [
            { label: 'About GASM', href: '/about' },
            { label: 'Grand Master Dr Hari Krishna', href: '/about/grand-master' },
            { label: 'Core Team', href: '/about/core-team' },
        ],
    },
    {
        title: 'Support',
        items: [
            { label: 'Contact', href: '/contact' },
            { label: 'Donate Now', href: '/donate' },
            { label: 'Privacy Policy', href: '/contact' },
            { label: 'Terms of Use', href: '/contact' },
        ],
    },
];

const socialLinks = [
    { key: 'youtube', label: 'YT', href: 'https://www.youtube.com/@GoldenAgeGurus' },
    { key: 'facebook', label: 'f', href: 'https://www.facebook.com/goldenagecommunity' },
    { key: 'instagram', label: 'IG', href: 'https://www.instagram.com/goldenagecommunity' },
    { key: 'twitter', label: 'X', href: 'https://twitter.com/goldenagecommunity' },
];
</script>

<template>
    <div class="min-h-screen bg-[#faf8f3] text-[#22232c]">
        <header class="relative z-20 border-b border-gold-500/20 bg-[#faf8f3]/95 backdrop-blur-sm">
            <div class="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-5">
                <Link href="/" class="inline-flex min-w-0 flex-shrink-0 items-center" aria-label="Golden Age Community">
                    <div class="h-[46px] w-[46px] flex-shrink-0 overflow-hidden rounded-full border border-gold-500/45 bg-white p-[2px]">
                        <ApplicationLogo compact class="h-full w-full" />
                    </div>
                </Link>

                <nav ref="desktopNavRef" class="hidden items-center gap-1.5 lg:flex">
                    <template v-for="item in menu" :key="item.key">
                        <div v-if="item.children" class="relative flex items-center">
                            <Link
                                :href="item.href"
                                :class="[
                                    'rounded-full py-1.5 pl-2.5 pr-1 text-[0.8rem] font-semibold transition-colors',
                                    isParentActive(item) ? 'text-[#c28e2f]' : 'text-[#3f4258] hover:text-[#c28e2f]',
                                ]"
                            >
                                {{ item.label }}
                            </Link>
                            <button
                                type="button"
                                @click="toggleDropdown(item.key)"
                                :aria-expanded="openDropdown === item.key"
                                :aria-label="`Toggle ${item.label} submenu`"
                                :class="[
                                    'flex items-center rounded-full p-1.5 transition-colors',
                                    isParentActive(item) ? 'text-[#c28e2f]' : 'text-[#3f4258] hover:text-[#c28e2f]',
                                ]"
                            >
                                <svg
                                    class="h-3 w-3 transition-transform"
                                    :class="openDropdown === item.key ? 'rotate-180' : ''"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div
                                v-if="openDropdown === item.key"
                                class="absolute left-0 top-full z-30 mt-2 w-64 rounded-xl border border-gold-500/20 bg-white py-2 shadow-lg"
                            >
                                <Link
                                    v-for="child in item.children"
                                    :key="child.key"
                                    :href="child.href"
                                    @click="openDropdown = null"
                                    :class="[
                                        'block px-4 py-2.5 text-sm font-medium transition-colors',
                                        active === child.key ? 'text-[#c28e2f]' : 'text-[#3f4258] hover:bg-black/5 hover:text-[#c28e2f]',
                                    ]"
                                >
                                    {{ child.label }}
                                </Link>
                            </div>
                        </div>

                        <Link
                            v-else
                            :href="item.href"
                            :class="[
                                'rounded-full px-2.5 py-1.5 text-[0.8rem] font-semibold transition-colors',
                                active === item.key ? 'text-[#c28e2f]' : 'text-[#3f4258] hover:text-[#c28e2f]',
                            ]"
                        >
                            {{ item.label }}
                        </Link>
                    </template>
                </nav>

                <div class="flex flex-shrink-0 items-center gap-2">
                    <Link href="/journal" class="rounded-[10px] bg-[#1b1f38] px-3 py-2 text-sm font-semibold text-white sm:px-3.5">Login / Join</Link>

                    <button
                        type="button"
                        @click="mobileMenuOpen = !mobileMenuOpen"
                        class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-[#23242f] hover:bg-black/5 lg:hidden"
                        :aria-expanded="mobileMenuOpen"
                        aria-label="Toggle menu"
                    >
                        <svg v-if="!mobileMenuOpen" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile menu -->
            <div v-if="mobileMenuOpen" class="border-t border-gold-500/20 bg-[#faf8f3] lg:hidden">
                <nav class="mx-auto flex max-w-[1240px] flex-col gap-1 px-4 py-3">
                    <template v-for="item in menu" :key="item.key">
                        <Link
                            :href="item.href"
                            :class="[
                                'rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                                isParentActive(item) ? 'bg-gold-500/10 text-[#c28e2f]' : 'text-[#3f4258] hover:bg-black/5 hover:text-[#c28e2f]',
                            ]"
                        >
                            {{ item.label }}
                        </Link>
                        <div v-if="item.children" class="ml-3 flex flex-col gap-1 border-l border-gold-500/25 pl-3">
                            <Link
                                v-for="child in item.children"
                                :key="child.key"
                                :href="child.href"
                                :class="[
                                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                    active === child.key ? 'bg-gold-500/10 text-[#c28e2f]' : 'text-[#575c74] hover:bg-black/5 hover:text-[#c28e2f]',
                                ]"
                            >
                                {{ child.label }}
                            </Link>
                        </div>
                    </template>
                </nav>
            </div>
        </header>

        <main>
            <slot />
        </main>

        <footer class="mt-16 border-t border-white/5 bg-[#11182f] text-white">
            <div class="mx-auto max-w-[1180px] px-4 py-10">
                <div class="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.25fr_repeat(4,0.9fr)_1.45fr]">
                    <div class="pr-4 lg:border-r lg:border-white/8 lg:pr-8">
                        <div class="flex items-center gap-3">
                            <div class="h-14 w-14 overflow-hidden rounded-full border border-gold-500/45 bg-[#161d39] p-1">
                                <ApplicationLogo compact class="h-full w-full" />
                            </div>
                            <div>
                                <p class="text-sm font-bold tracking-[0.1em] text-white">GASM Social Connections</p>
                            </div>
                        </div>
                        <p class="mt-4 text-sm text-[#c3c8dd]">Awaken, Align, Ascend.</p>

                        <div class="mt-5 flex items-center gap-3">
                            <a
                                v-for="social in socialLinks"
                                :key="social.key"
                                :href="social.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                :aria-label="social.key"
                                class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm text-[#e4e8f8] transition-colors hover:border-gold-500/50 hover:text-[#f6d792]"
                            >
                                {{ social.label }}
                            </a>
                        </div>
                    </div>

                    <div v-for="group in footerGroups" :key="group.title">
                        <p class="text-sm font-semibold text-white">{{ group.title }}</p>
                        <div class="mt-3 space-y-2.5">
                            <Link
                                v-for="item in group.items"
                                :key="`${group.title}-${item.label}`"
                                :href="item.href"
                                class="block text-sm text-[#c3c8dd] transition-colors hover:text-[#f6d792]"
                            >
                                {{ item.label }}
                            </Link>
                        </div>
                    </div>

                    <div class="lg:border-l lg:border-white/8 lg:pl-8">
                        <p class="text-sm font-semibold text-white">Support Our Mission</p>
                        <p class="mt-3 max-w-xs text-sm leading-6 text-[#c3c8dd]">Your generosity keeps meditation, teachings, and community programs free for every seeker.</p>

                        <Link
                            href="/donate"
                            class="mt-5 inline-flex rounded-xl bg-[#d59f41] px-5 py-3 text-sm font-semibold text-[#1d1d29] transition-colors hover:bg-[#e0b058]"
                        >
                            Donate Now
                        </Link>
                    </div>
                </div>

                <div class="flex flex-col gap-3 pt-5 text-xs text-[#a9afc7] md:flex-row md:items-center md:justify-between">
                    <p>© 2026 Golden Age Community. All rights reserved.</p>
                    <p>Designed with love for a conscious world.</p>
                </div>
            </div>
        </footer>

        <FloatingContactButtons />
    </div>
</template>
