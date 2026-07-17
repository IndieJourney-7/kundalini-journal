<script setup>
import { onMounted, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
import { loadAboutContent } from '@/aboutContent';

const content = ref(null);

onMounted(() => {
    content.value = loadAboutContent();
});
</script>

<template>
    <Head title="About GASM" />

    <PublicSiteLayout active="about">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">About</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">About GASM</h1>
            <p v-if="content" class="mt-5 max-w-3xl whitespace-pre-line text-lg leading-8 text-[#5e6278]">
                {{ content.gasm.text }}
            </p>

            <div v-if="content?.gasm.images.length" class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div
                    v-for="img in content.gasm.images"
                    :key="img.id"
                    class="aspect-square overflow-hidden rounded-2xl border border-gold-500/20"
                >
                    <img :src="img.dataUrl" :alt="img.name" class="h-full w-full object-cover" />
                </div>
            </div>

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
