<script setup>
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
</script>

<template>
    <Head title="Grand Master Dr Hari Krishna" />

    <PublicSiteLayout active="grand-master">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">About</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">Grand Master Dr Hari Krishna</h1>

            <div class="mt-10 grid gap-8 md:grid-cols-[220px_1fr]">
                <div class="mx-auto h-[220px] w-[220px] flex-shrink-0 overflow-hidden rounded-full border border-gold-500/30 bg-white md:mx-0">
                    <div class="flex h-full w-full items-center justify-center text-6xl text-gold-500/50">🪷</div>
                </div>

                <div class="space-y-4 text-[#5e6278]">
                    <p class="text-lg leading-8">
                        [Placeholder] Dr Hari Krishna is the founder and Grand Master guiding the Golden Age Spiritual
                        Movement (GASM). Content about his life, teachings, and lineage will be added here from the
                        admin panel.
                    </p>
                    <p class="leading-7">
                        [Placeholder] Decades of dedicated practice, teaching, and service form the foundation of this
                        movement — awakening humanity to its true nature through meditation, wisdom, and compassion.
                    </p>
                </div>
            </div>

            <div class="mt-12 grid gap-4 md:grid-cols-3">
                <article class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <h2 class="font-heading text-2xl text-[#1f2235]">Teachings</h2>
                    <p class="mt-2 text-[#636881]">[Placeholder] Core teachings and philosophy.</p>
                </article>
                <article class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <h2 class="font-heading text-2xl text-[#1f2235]">Journey</h2>
                    <p class="mt-2 text-[#636881]">[Placeholder] Life story and spiritual journey.</p>
                </article>
                <article class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <h2 class="font-heading text-2xl text-[#1f2235]">Vision</h2>
                    <p class="mt-2 text-[#636881]">[Placeholder] Vision for the Golden Age.</p>
                </article>
            </div>
        </section>
    </PublicSiteLayout>
</template>
