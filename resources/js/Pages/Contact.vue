<script setup>
import { computed } from 'vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
import InputError from '@/Components/InputError.vue';

const page = usePage();
const successMessage = computed(() => page.props.flash?.success ?? null);

const form = useForm({
    name: '',
    email: '',
    phone: '',
    query: '',
});

const submit = () => {
    form.post('/contact', {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
};

const fieldClasses =
    'w-full rounded-xl border border-gold-500/30 bg-[#faf8f3] px-4 py-3 text-sm text-[#22232c] placeholder:text-[#9a9aa5] transition-colors focus:border-gold-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/30';

const contactDetails = [
    { label: 'Email', value: 'circle@goldenage.community', href: 'mailto:circle@goldenage.community' },
    { label: 'Phone', value: '+91 73375 05390', href: 'tel:+917337505390' },
    { label: 'Community Hours', value: 'Mon - Sat, 10:00 AM - 6:00 PM IST', href: null },
    { label: 'Location', value: 'Hyderabad, India', href: null },
];
</script>

<template>
    <Head title="Contact" />

    <PublicSiteLayout active="contact">
        <section class="mx-auto max-w-[1120px] px-4 pb-20 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">Contact</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">Reach the Circle</h1>
            <p class="mt-5 max-w-3xl text-lg leading-8 text-[#5e6278]">
                For workshop requests, collaborations, or spiritual guidance inquiries — write to us and
                someone from the circle will respond with care.
            </p>

            <div class="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
                <!-- Contact form -->
                <div class="relative overflow-hidden rounded-2xl border border-gold-500/20 bg-white p-6 shadow-card md:p-8">
                    <div class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-gradient opacity-10 blur-2xl"></div>

                    <h2 class="font-heading text-2xl text-[#1f2235]">Send a Message</h2>
                    <p class="mt-1 text-sm text-[#6b6f85]">We typically respond within 1-2 days.</p>

                    <div
                        v-if="successMessage"
                        class="mt-5 rounded-xl border border-emerald-300/60 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                    >
                        {{ successMessage }}
                    </div>

                    <form class="mt-6 space-y-5" @submit.prevent="submit">
                        <div class="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label for="name" class="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[#7e6a45]">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    v-model="form.name"
                                    type="text"
                                    placeholder="Your full name"
                                    autocomplete="name"
                                    :class="fieldClasses"
                                />
                                <InputError :message="form.errors.name" class="mt-1.5" />
                            </div>

                            <div>
                                <label for="email" class="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[#7e6a45]">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autocomplete="email"
                                    :class="fieldClasses"
                                />
                                <InputError :message="form.errors.email" class="mt-1.5" />
                            </div>
                        </div>

                        <div>
                            <label for="phone" class="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[#7e6a45]">
                                Phone Number <span class="normal-case text-[#a8a8b3]">(optional)</span>
                            </label>
                            <input
                                id="phone"
                                v-model="form.phone"
                                type="tel"
                                placeholder="+91 00000 00000"
                                autocomplete="tel"
                                :class="fieldClasses"
                            />
                            <InputError :message="form.errors.phone" class="mt-1.5" />
                        </div>

                        <div>
                            <label for="query" class="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[#7e6a45]">
                                Your Query
                            </label>
                            <textarea
                                id="query"
                                v-model="form.query"
                                rows="5"
                                placeholder="Tell us how we can support your journey..."
                                :class="fieldClasses"
                            ></textarea>
                            <InputError :message="form.errors.query" class="mt-1.5" />
                        </div>

                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="inline-flex w-full items-center justify-center rounded-xl bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-[#120022] transition-all duration-300 hover:shadow-gold-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {{ form.processing ? 'Sending...' : 'Send Message' }}
                        </button>
                    </form>
                </div>

                <!-- Contact info -->
                <div class="flex flex-col gap-6">
                    <div class="rounded-2xl border border-gold-500/20 bg-white p-6 shadow-card md:p-8">
                        <h2 class="font-heading text-2xl text-[#1f2235]">Contact Details</h2>
                        <dl class="mt-5 space-y-4">
                            <div v-for="detail in contactDetails" :key="detail.label">
                                <dt class="text-xs font-bold uppercase tracking-[0.1em] text-[#7e6a45]">{{ detail.label }}</dt>
                                <dd class="mt-1 text-sm text-[#39405d]">
                                    <a v-if="detail.href" :href="detail.href" class="transition-colors hover:text-[#c28e2f]">
                                        {{ detail.value }}
                                    </a>
                                    <span v-else>{{ detail.value }}</span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div class="rounded-2xl border border-gold-500/20 bg-[#1b1f38] p-6 text-white shadow-card md:p-8">
                        <h2 class="font-heading text-2xl text-[#f3e0a4]">Prefer to Chat?</h2>
                        <p class="mt-2 text-sm leading-6 text-[#c3c8dd]">
                            Reach us instantly on WhatsApp or give us a call — use the floating button in the
                            corner of your screen anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </PublicSiteLayout>
</template>
