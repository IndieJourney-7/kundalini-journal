<script setup>
import { computed, onMounted, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
import { loadAboutContent } from '@/aboutContent';

const content = ref(null);

onMounted(() => {
    content.value = loadAboutContent();
});

const portrait = computed(() => content.value?.grandMaster.images[0] ?? null);
const galleryImages = computed(() => content.value?.grandMaster.images.slice(1) ?? []);
const bioText = computed(
    () =>
        content.value?.grandMaster.text?.trim() ||
        '[Placeholder] Dr Hari Krishna is the founder and Grand Master guiding the Golden Age Spiritual Movement (GASM). ' +
            'Content about his life, teachings, and lineage will be added here from the admin panel.',
);
</script>

<template>
    <Head title="Grand Master Dr Hari Krishna" />

    <PublicSiteLayout active="about">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">About</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">Grand Master Dr Hari Krishna</h1>

            <div class="mt-10 grid gap-8 md:grid-cols-[220px_1fr]">
                <div class="mx-auto h-[220px] w-[220px] flex-shrink-0 overflow-hidden rounded-full border border-gold-500/30 bg-white md:mx-0">
                    <img v-if="portrait" :src="portrait.dataUrl" :alt="portrait.name" class="h-full w-full object-cover" />
                    <div v-else class="flex h-full w-full items-center justify-center text-6xl text-gold-500/50">🪷</div>
                </div>

                <div class="space-y-4 text-[#5e6278]">
                    <p class="whitespace-pre-line text-lg leading-8">{{ bioText }}</p>
                </div>
            </div>

            <div v-if="galleryImages.length" class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div
                    v-for="img in galleryImages"
                    :key="img.id"
                    class="aspect-square overflow-hidden rounded-2xl border border-gold-500/20"
                >
                    <img :src="img.dataUrl" :alt="img.name" class="h-full w-full object-cover" />
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
