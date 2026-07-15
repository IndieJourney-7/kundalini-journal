<script setup>
import { onMounted, reactive } from 'vue';
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
import { loadContent } from '@/content';

const steps = [
    { title: 'Posture', text: 'Sit comfortably with spine aligned and shoulders relaxed.' },
    { title: 'Breath', text: 'Observe the natural breath without controlling it.' },
    { title: 'Witness', text: 'Let thoughts pass while returning to silent awareness.' },
    { title: 'Integration', text: 'Close gently and carry calm presence into your day.' },
];

const meditations = reactive([]);

onMounted(() => {
    meditations.splice(0, meditations.length, ...loadContent('meditations'));
});

const mediaIcon = (type) => ({ audio: '🎧', video: '🎬', text: '📄' }[type] ?? '🧘');
</script>

<template>
    <Head title="Meditation" />

    <PublicSiteLayout active="meditation">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">Meditation</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">Know Yourself Through Breath</h1>
            <p class="mt-5 max-w-3xl text-lg leading-8 text-[#5e6278]">
                Meditation is the foundation of this path. Start with consistency over intensity.
            </p>

            <div class="mt-10 grid gap-4 md:grid-cols-2">
                <article v-for="step in steps" :key="step.title" class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <h2 class="font-heading text-3xl text-[#1f2235]">{{ step.title }}</h2>
                    <p class="mt-2 text-[#636881]">{{ step.text }}</p>
                </article>
            </div>

            <div class="mt-16">
                <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">Guided Practice</p>
                <h2 class="mt-2 font-heading text-2xl text-[#1f2235] sm:text-4xl">Meditation Library</h2>

                <div v-if="meditations.length === 0" class="mt-8 rounded-2xl border border-dashed border-gold-500/30 bg-white p-10 text-center text-[#8a8fa3]">
                    New guided meditations are on their way — check back soon.
                </div>

                <div v-else class="mt-8 grid gap-4 md:grid-cols-2">
                    <article v-for="item in meditations" :key="item.id" class="rounded-2xl border border-gold-500/20 bg-white p-6">
                        <p class="text-sm font-semibold uppercase tracking-[0.08em] text-[#b98a31]">
                            {{ mediaIcon(item.mediaType) }} {{ item.mediaType }}<span v-if="item.duration"> &middot; {{ item.duration }}</span>
                        </p>
                        <h3 class="mt-2 font-heading text-2xl text-[#1f2235]">{{ item.title }}</h3>
                        <p v-if="item.description" class="mt-2 text-[#636881]">{{ item.description }}</p>
                        <a
                            v-if="item.mediaUrl"
                            :href="item.mediaUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="mt-3 inline-flex text-sm font-semibold text-[#c28e2f] hover:text-[#a8791f]"
                        >
                            Listen / Watch &rarr;
                        </a>
                    </article>
                </div>
            </div>
        </section>
    </PublicSiteLayout>
</template>
