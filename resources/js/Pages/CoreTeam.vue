<script setup>
import { computed, onMounted, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
import { loadAboutContent } from '@/aboutContent';

const content = ref(null);

onMounted(() => {
    content.value = loadAboutContent();
});

const introText = computed(
    () =>
        content.value?.coreTeam.intro?.trim() ||
        'The dedicated team supporting the Golden Age Spiritual Movement.',
);

const placeholderMembers = [
    { id: 'p1', name: '[Name Placeholder]', role: 'Core Team Member', photo: null },
    { id: 'p2', name: '[Name Placeholder]', role: 'Core Team Member', photo: null },
    { id: 'p3', name: '[Name Placeholder]', role: 'Core Team Member', photo: null },
    { id: 'p4', name: '[Name Placeholder]', role: 'Core Team Member', photo: null },
];

const members = computed(() =>
    content.value?.coreTeam.members?.length ? content.value.coreTeam.members : placeholderMembers,
);
</script>

<template>
    <Head title="Core Team" />

    <PublicSiteLayout active="about">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">About</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">Core Team</h1>
            <p class="mt-5 max-w-3xl text-lg leading-8 text-[#5e6278]">{{ introText }}</p>

            <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <article v-for="member in members" :key="member.id" class="rounded-2xl border border-gold-500/20 bg-white p-6 text-center">
                    <div class="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-gold-500/30 bg-[#faf8f3] text-4xl">
                        <img v-if="member.photo" :src="member.photo" :alt="member.name" class="h-full w-full object-cover" />
                        <span v-else>🪷</span>
                    </div>
                    <h2 class="mt-4 font-heading text-xl text-[#1f2235]">{{ member.name || '[Name Placeholder]' }}</h2>
                    <p class="mt-1 text-sm text-[#8a8fa3]">{{ member.role || 'Core Team Member' }}</p>
                </article>
            </div>
        </section>
    </PublicSiteLayout>
</template>
