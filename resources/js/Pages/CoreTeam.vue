<script setup>
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';

const teamMembers = [
    { name: '[Name Placeholder]', role: 'Core Team Member', avatar: '🪷' },
    { name: '[Name Placeholder]', role: 'Core Team Member', avatar: '🪷' },
    { name: '[Name Placeholder]', role: 'Core Team Member', avatar: '🪷' },
    { name: '[Name Placeholder]', role: 'Core Team Member', avatar: '🪷' },
];
</script>

<template>
    <Head title="Core Team" />

    <PublicSiteLayout active="core-team">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">About</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">Core Team</h1>
            <p class="mt-5 max-w-3xl text-lg leading-8 text-[#5e6278]">
                [Placeholder] The dedicated team supporting the Golden Age Spiritual Movement. Names, roles, and
                photos will be added here from the admin panel.
            </p>

            <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <article v-for="member in teamMembers" :key="member.name" class="rounded-2xl border border-gold-500/20 bg-white p-6 text-center">
                    <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/30 bg-[#faf8f3] text-4xl">
                        {{ member.avatar }}
                    </div>
                    <h2 class="mt-4 font-heading text-xl text-[#1f2235]">{{ member.name }}</h2>
                    <p class="mt-1 text-sm text-[#8a8fa3]">{{ member.role }}</p>
                </article>
            </div>
        </section>
    </PublicSiteLayout>
</template>
