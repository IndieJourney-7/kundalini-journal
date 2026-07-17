<script setup>
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
</script>

<template>
    <Head title="About GASM" />

    <PublicSiteLayout active="about">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">About</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">About GASM</h1>
            <p class="mt-5 max-w-3xl text-lg leading-8 text-[#5e6278]">
                The Golden Age Spiritual Movement (GASM) supports sincere seekers in awakening Kundalini Shakti through
                grounded daily practice, conscious living, and reflective journaling — inspiring humanity to awaken to
                its true nature through meditation, wisdom, and self-discovery.
            </p>

            <div class="mt-10 grid gap-4 md:grid-cols-3">
                <article class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <h2 class="font-heading text-3xl text-[#1f2235]">Practice</h2>
                    <p class="mt-2 text-[#636881]">Simple spiritual tools you can sustain every day.</p>
                </article>
                <article class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <h2 class="font-heading text-3xl text-[#1f2235]">Witness</h2>
                    <p class="mt-2 text-[#636881]">Journal your transformation with honesty and clarity.</p>
                </article>
                <article class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <h2 class="font-heading text-3xl text-[#1f2235]">Community</h2>
                    <p class="mt-2 text-[#636881]">Walk the path together in support and compassion.</p>
                </article>
            </div>
        </section>
    </PublicSiteLayout>
</template>
