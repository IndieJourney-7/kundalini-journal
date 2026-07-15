<script setup>
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';

const rules = [
    {
        number: 1,
        title: 'Meditation',
        subtitle: 'Daily stillness to quiet mind and awaken spirit.',
    },
    {
        number: 2,
        title: 'Unprocessed Food',
        subtitle: 'Nourish the body with whole, living nutrition.',
    },
    {
        number: 3,
        title: 'Sun Gazing',
        subtitle: 'Absorb solar vitality at safe sunrise/sunset windows.',
    },
    {
        number: 4,
        title: 'Grounding',
        subtitle: 'Reconnect through bare-foot contact with the earth.',
    },
    {
        number: 5,
        title: 'Alkaline Water',
        subtitle: 'Hydrate deeply and support cellular balance.',
    },
];
</script>

<template>
    <Head title="5 Golden Rules" />

    <PublicSiteLayout active="golden-rules">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <header class="mb-12 text-center">
                <p class="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-gold-700/90">Sacred Wisdom</p>
                <h1 class="font-heading text-4xl text-[#1f2235] sm:text-6xl">5 Golden Rules</h1>
                <p class="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#636881]">
                    Timeless principles for balanced Kundalini awakening and conscious living.
                </p>
            </header>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <article
                    v-for="rule in rules"
                    :key="rule.number"
                    class="rounded-2xl border border-gold-500/20 bg-white p-6"
                >
                    <p class="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Rule {{ rule.number }}</p>
                    <h2 class="mt-2 font-heading text-2xl text-[#1f2235] sm:text-4xl">{{ rule.title }}</h2>
                    <p class="mt-2 text-[#636881]">{{ rule.subtitle }}</p>
                </article>
            </div>
        </section>
    </PublicSiteLayout>
</template>
