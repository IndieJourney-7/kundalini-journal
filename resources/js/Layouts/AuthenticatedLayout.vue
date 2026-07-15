<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import GradientButton from '@/Components/GradientButton.vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div class="min-h-screen bg-sacred-dark pt-16 text-[#5b4f60]">
        <!-- Top nav -->
        <nav class="fixed left-0 right-0 top-0 z-40 border-b border-gold-500/20 bg-white/80 backdrop-blur-xl">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <!-- Left -->
                    <div class="flex items-center gap-6">
                        <Link :href="route('dashboard')" class="flex items-center gap-3">
                            <div class="h-9 w-9 overflow-hidden rounded-full border border-gold-500/40 bg-white p-0.5">
                                <ApplicationLogo compact class="h-full w-full" />
                            </div>
                            <span class="hidden sm:block text-sm font-bold text-gold-700 font-heading tracking-wider">GOLDEN AGE</span>
                        </Link>
                        <div class="hidden sm:flex items-center gap-1">
                            <Link :href="route('dashboard')" class="px-4 py-2 text-sm text-gold-700 font-medium rounded-lg transition-colors">
                                Dashboard
                            </Link>
                            <Link :href="route('journal.create')" class="px-4 py-2 text-sm text-[#7b6d72] hover:text-gold-700 rounded-lg transition-colors">
                                New Entry
                            </Link>
                            <Link :href="route('golden-rules')" class="px-4 py-2 text-sm text-[#7b6d72] hover:text-gold-700 rounded-lg transition-colors">
                                5 Golden Rules
                            </Link>
                        </div>
                    </div>

                    <!-- Right -->
                    <div class="flex items-center gap-3">
                        <Link
                            :href="route('profile.edit')"
                            class="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-[#7b6d72] hover:text-gold-700 rounded-xl transition-colors"
                        >
                            <div class="h-7 w-7 rounded-full border border-gold-500/30 bg-white flex items-center justify-center text-xs text-gold-700">
                                {{ $page.props.auth.user.name?.charAt(0) || 'S' }}
                            </div>
                            <span>{{ $page.props.auth.user.name }}</span>
                        </Link>
                        <GradientButton
                            :href="route('journal.create')"
                            variant="gold" size="sm"
                            class="hidden sm:inline-flex"
                        >
                            ✨ New Entry
                        </GradientButton>
                        <Link
                            :href="route('logout')"
                            method="post"
                            as="button"
                            class="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm text-[#8f7f86] hover:text-pink-700 transition-colors"
                        >
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </Link>

                        <!-- Hamburger -->
                        <button
                            @click="showingNavigationDropdown = !showingNavigationDropdown"
                            class="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-[#8f7f86] hover:text-gold-700 hover:bg-gold-500/10 transition-all"
                        >
                            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path :class="{ hidden: showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path :class="{ hidden: !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile nav -->
            <div :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }" class="sm:hidden border-t border-gold-500/20 bg-white/95 backdrop-blur-xl">
                <div class="space-y-1 px-4 py-3">
                    <Link :href="route('dashboard')" class="block px-3 py-2 text-sm text-gold-700 rounded-lg">
                        Dashboard
                    </Link>
                    <Link :href="route('journal.create')" class="block px-3 py-2 text-sm text-[#7b6d72] hover:text-gold-700 rounded-lg">
                        New Entry
                    </Link>
                    <Link :href="route('golden-rules')" class="block px-3 py-2 text-sm text-[#7b6d72] hover:text-gold-700 rounded-lg">
                        5 Golden Rules
                    </Link>
                    <Link :href="route('profile.edit')" class="block px-3 py-2 text-sm text-[#7b6d72] hover:text-gold-700 rounded-lg">
                        Profile
                    </Link>
                    <Link :href="route('logout')" method="post" as="button" class="block px-3 py-2 text-sm text-[#7b6d72] hover:text-pink-700 rounded-lg">
                        Logout
                    </Link>
                </div>
            </div>
        </nav>

        <!-- Page Heading -->
        <header v-if="$slots.header" class="border-b border-gold-500/20 bg-white/70">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <slot name="header" />
            </div>
        </header>

        <!-- Page Content -->
        <main>
            <slot />
        </main>
    </div>
</template>
