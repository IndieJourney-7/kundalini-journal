<script setup>
import { ref, watch } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import FloatingContactButtons from '@/Components/FloatingContactButtons.vue';

defineProps({
    active: {
        type: String,
        default: 'home',
    },
});

const mobileMenuOpen = ref(false);
const page = usePage();

watch(() => page.url, () => {
    mobileMenuOpen.value = false;
});

const menu = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'about', label: 'About', href: '/about' },
    { key: 'meditation', label: 'Meditation', href: '/meditation' },
    { key: 'knowledge', label: 'Knowledge', href: '/knowledge' },
    { key: 'events', label: 'Events', href: '/events' },
    { key: 'journals', label: 'Journals', href: '/community' },
    { key: 'blog', label: 'Blog', href: '/blog' },
    { key: 'contact', label: 'Contact', href: '/contact' },
    { key: 'golden-rules', label: 'Golden Rules', href: '/golden-rules' },
];

const footerGroups = [
    {
        title: 'Quick Links',
        items: [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Meditation', href: '/meditation' },
            { label: 'Knowledge', href: '/knowledge' },
            { label: 'Events', href: '/events' },
            { label: 'Journals', href: '/community' },
        ],
    },
    {
        title: 'Resources',
        items: [
            { label: 'Articles', href: '/blog' },
            { label: 'eBooks', href: '/knowledge' },
            { label: 'Videos', href: '/meditation' },
            { label: 'FAQ', href: '/contact' },
        ],
    },
    {
        title: 'Community',
        items: [
            { label: 'Testimonials', href: '/community' },
            { label: 'Practitioners', href: '/community' },
            { label: 'Blog', href: '/blog' },
        ],
    },
    {
        title: 'Support',
        items: [
            { label: 'Contact', href: '/contact' },
            { label: 'Privacy Policy', href: '/contact' },
            { label: 'Terms of Use', href: '/contact' },
        ],
    },
];

const socialIcons = ['f', 'ig', '▶', '◧'];
</script>

<template>
    <div class="min-h-screen bg-[#faf8f3] text-[#22232c]">
        <header class="relative z-20 border-b border-gold-500/20 bg-[#faf8f3]/95 backdrop-blur-sm">
            <div class="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-5">
                <Link href="/" class="inline-flex min-w-0 items-center gap-2.5 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[#23242f]">
                    <div class="h-[38px] w-[38px] flex-shrink-0 overflow-hidden rounded-full border border-gold-500/45 bg-white p-[2px]">
                        <ApplicationLogo compact class="h-full w-full" />
                    </div>
                    <span class="truncate">Golden Age Community</span>
                </Link>

                <nav class="hidden items-center gap-1.5 lg:flex">
                    <Link
                        v-for="item in menu"
                        :key="item.key"
                        :href="item.href"
                        :class="[
                            'rounded-full px-2.5 py-1.5 text-[0.8rem] font-semibold transition-colors',
                            active === item.key ? 'text-[#c28e2f]' : 'text-[#3f4258] hover:text-[#c28e2f]',
                        ]"
                    >
                        {{ item.label }}
                    </Link>
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
                    <Link
                        v-for="item in menu"
                        :key="item.key"
                        :href="item.href"
                        :class="[
                            'rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                            active === item.key ? 'bg-gold-500/10 text-[#c28e2f]' : 'text-[#3f4258] hover:bg-black/5 hover:text-[#c28e2f]',
                        ]"
                    >
                        {{ item.label }}
                    </Link>
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
                                <p class="text-sm font-bold tracking-[0.14em] text-[#f3e0a4]">GOLDEN AGE</p>
                                <p class="text-sm font-bold tracking-[0.1em] text-white">COMMUNITY</p>
                            </div>
                        </div>
                        <p class="mt-4 text-sm text-[#c3c8dd]">Awaken, Align, Ascend.</p>

                        <div class="mt-5 flex items-center gap-3">
                            <span v-for="icon in socialIcons" :key="icon" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm text-[#e4e8f8]">
                                {{ icon }}
                            </span>
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
                        <p class="text-sm font-semibold text-white">Stay Connected</p>
                        <p class="mt-3 max-w-xs text-sm leading-6 text-[#c3c8dd]">Get updated on events, new articles and meditation sessions.</p>

                        <form class="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" @submit.prevent>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                class="min-w-0 flex-1 rounded-xl border border-white/8 bg-[#2a3149] px-4 py-3 text-sm text-white placeholder:text-[#98a0ba] focus:border-gold-500/50 focus:outline-none"
                            />
                            <button
                                type="submit"
                                class="rounded-xl bg-[#d59f41] px-5 py-3 text-sm font-semibold text-[#1d1d29] transition-colors hover:bg-[#e0b058]"
                            >
                                Subscribe
                            </button>
                        </form>
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
