<script setup>
import { ref, computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
import GradientButton from '@/Components/GradientButton.vue';

const searchQuery = ref('');
const activeFilter = ref('all');

const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'featured', label: 'Featured' },
    { value: 'new', label: 'New' },
];

const practitioners = [
    { name: 'Maya Devi', tagline: 'Awakening since 2023', days: 108, bio: 'Grounded practice and clear witnessing.', status: 'featured' },
    { name: 'Arjun Patel', tagline: 'Seeker of Truth', days: 72, bio: 'Meditative inquiry and steady discipline.', status: 'active' },
    { name: 'Priya Sharma', tagline: 'Light Worker', days: 215, bio: 'Heart-centered reflection and service.', status: 'featured' },
    { name: 'Ananda Krishnan', tagline: 'Heart Awakening', days: 108, bio: 'Compassion-based journal practice.', status: 'active' },
    { name: 'Devi Lakshmi', tagline: 'Sacral Flow', days: 45, bio: 'Creative energy and emotional release.', status: 'new' },
    { name: 'Shiva Nataraj', tagline: 'Crown Walker', days: 160, bio: 'Silence, focus, and inward alignment.', status: 'active' },
];

const filteredPractitioners = computed(() => {
    let list = practitioners;

    if (activeFilter.value !== 'all') {
        list = list.filter((p) => p.status === activeFilter.value);
    }

    if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    return list;
});
</script>

<template>
    <Head title="Community" />

    <PublicSiteLayout active="journals">
        <section class="mx-auto max-w-[1120px] px-4 pb-14 pt-14">
            <header class="mb-8 text-center">
                <p class="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-gold-700/90">Community</p>
                <h1 class="font-heading text-3xl text-[#1f2235] sm:text-5xl">Awakening Journeys</h1>
                <p class="mx-auto mt-3 max-w-2xl text-base leading-8 text-[#636881]">
                    Explore practitioners documenting real inner work from root to crown.
                </p>
            </header>

            <section class="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div class="relative w-full max-w-md">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search practitioners..."
                        class="w-full rounded-xl border border-gold-500/30 bg-white px-4 py-2.5 text-sm text-[#5b4f60] placeholder:text-[#a4939a] focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                    />
                </div>

                <div class="flex flex-wrap gap-2">
                    <button
                        v-for="filter in filters"
                        :key="filter.value"
                        @click="activeFilter = filter.value"
                        :class="activeFilter === filter.value ? 'border-gold-500/55 bg-gold-500/15 text-gold-700' : 'border-gold-500/25 text-[#7b6d72] hover:text-gold-700'"
                        class="rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.15em] transition-all"
                    >
                        {{ filter.label }}
                    </button>
                </div>
            </section>

            <section v-if="filteredPractitioners.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <article
                    v-for="person in filteredPractitioners"
                    :key="person.name"
                    class="rounded-2xl border border-gold-500/20 bg-white p-5"
                >
                    <div class="mb-3 flex items-center gap-3">
                        <div class="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/35 bg-[#fffdf9] text-sm font-semibold text-gold-700">
                            {{ person.name.split(' ').map((n) => n[0]).join('') }}
                        </div>
                        <div>
                            <h2 class="font-heading text-2xl text-[#4f4243]">{{ person.name }}</h2>
                            <p class="text-xs text-[#8f7f86]">{{ person.tagline }}</p>
                        </div>
                    </div>

                    <p class="text-sm leading-7 text-[#7b6d72]">{{ person.bio }}</p>

                    <div class="mt-4 flex items-center justify-between">
                        <span class="rounded-full border border-gold-500/35 px-2.5 py-1 text-xs text-gold-700">{{ person.days }} days</span>
                        <GradientButton :href="'/journey/' + person.name.toLowerCase().replace(/\s+/g, '-')" variant="ghost" size="sm">View Journey</GradientButton>
                    </div>
                </article>
            </section>

            <section v-else class="rounded-2xl border border-dashed border-gold-500/25 bg-white p-12 text-center text-[#8d7c84]">
                No practitioner matched your filter.
            </section>
        </section>
    </PublicSiteLayout>
</template>
