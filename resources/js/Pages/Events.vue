<script setup>
import { onMounted, reactive } from 'vue';
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
import { loadContent } from '@/content';

const events = reactive([]);

onMounted(() => {
    events.splice(0, events.length, ...loadContent('events'));
});

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
</script>

<template>
    <Head title="Events" />

    <PublicSiteLayout active="events">
        <section class="mx-auto max-w-[1120px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">Events</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">Live Sessions & Retreats</h1>

            <div v-if="events.length === 0" class="mt-10 rounded-2xl border border-dashed border-gold-500/30 bg-white p-10 text-center text-[#8a8fa3]">
                No upcoming events right now — check back soon.
            </div>

            <div v-else class="mt-10 grid gap-4 md:grid-cols-3">
                <article v-for="event in events" :key="event.id" class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <p class="text-sm font-semibold uppercase tracking-[0.08em] text-[#b98a31]">{{ formatDate(event.date) }}</p>
                    <h2 class="mt-2 font-heading text-3xl text-[#1f2235]">{{ event.title }}</h2>
                    <p class="mt-2 text-[#636881]">{{ event.time }}<span v-if="event.location"> &middot; {{ event.location }}</span></p>
                    <p v-if="event.description" class="mt-3 text-sm leading-6 text-[#7a7f95]">{{ event.description }}</p>
                </article>
            </div>
        </section>
    </PublicSiteLayout>
</template>
