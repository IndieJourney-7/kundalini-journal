<script setup>
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';

const posts = [
    { title: 'The First Signs of Awakening', excerpt: 'How to recognize subtle inner shifts with balance.' },
    { title: 'Breath as Guru', excerpt: 'Returning to the breath when the mind becomes noisy.' },
    { title: 'Grounding During Intensity', excerpt: 'Practical methods to stabilize your energy body.' },
];
</script>

<template>
    <Head title="Blog" />

    <PublicSiteLayout active="blog">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">Blog</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">Stories & Insights</h1>

            <div class="mt-10 space-y-4">
                <article v-for="post in posts" :key="post.title" class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <h2 class="font-heading text-3xl text-[#1f2235]">{{ post.title }}</h2>
                    <p class="mt-2 text-[#636881]">{{ post.excerpt }}</p>
                </article>
            </div>
        </section>
    </PublicSiteLayout>
</template>
