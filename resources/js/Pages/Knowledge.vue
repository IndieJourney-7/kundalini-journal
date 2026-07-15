<script setup>
import { onMounted, reactive } from 'vue';
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
import { loadContent } from '@/content';

const articles = reactive([]);

onMounted(() => {
    articles.splice(0, articles.length, ...loadContent('knowledge'));
});
</script>

<template>
    <Head title="Knowledge" />

    <PublicSiteLayout active="knowledge">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">Knowledge</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">Wisdom Library</h1>
            <p class="mt-5 max-w-3xl text-lg leading-8 text-[#5e6278]">
                Curated teachings to support balanced awakening with practical spiritual understanding.
            </p>

            <div v-if="articles.length === 0" class="mt-10 rounded-2xl border border-dashed border-gold-500/30 bg-white p-10 text-center text-[#8a8fa3]">
                New teachings are being added — check back soon.
            </div>

            <div v-else class="mt-10 grid gap-4 md:grid-cols-2">
                <article v-for="item in articles" :key="item.id" class="rounded-xl border border-gold-500/20 bg-white px-5 py-4">
                    <p v-if="item.category" class="text-xs font-semibold uppercase tracking-[0.08em] text-[#b98a31]">{{ item.category }}</p>
                    <h2 class="mt-1 font-heading text-2xl text-[#1f2235]">{{ item.title }}</h2>
                    <p v-if="item.summary" class="mt-1 text-sm leading-6 text-[#636881]">{{ item.summary }}</p>
                    <a
                        v-if="item.link"
                        :href="item.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="mt-2 inline-flex text-sm font-semibold text-[#c28e2f] hover:text-[#a8791f]"
                    >
                        Read more &rarr;
                    </a>
                </article>
            </div>
        </section>
    </PublicSiteLayout>
</template>
