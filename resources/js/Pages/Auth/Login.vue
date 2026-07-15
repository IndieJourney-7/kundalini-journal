<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    access_code: '',
    password: '',
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Sacred Login" />

    <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbfaf7] px-4 py-12">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,151,88,0.13),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(184,143,160,0.08),transparent_40%),linear-gradient(180deg,#fffdf9_0%,#f8f4ed_60%,#f4efe7_100%)]"></div>

        <div class="pointer-events-none absolute right-7 top-4 h-1.5 w-1.5 rounded-full bg-gold-600/60"></div>

        <div class="relative w-full max-w-2xl rounded-[2rem] border-[2px] border-gold-500/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,242,235,0.96))] p-7 shadow-[0_20px_45px_rgba(109,92,67,0.16)] sm:p-10">
            <div class="mx-auto max-w-md text-center">
                <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-400/60 bg-white shadow-[0_0_20px_rgba(184,151,88,0.2)]">
                    <ApplicationLogo compact class="h-[4.2rem] w-[4.2rem]" />
                </div>

                <h1 class="font-heading text-3xl text-[#4f4243] sm:text-4xl">Enter the temple</h1>
                <p class="mt-2 text-lg text-[#7b6d72]">Your sacred access code</p>
                <Link
                    :href="route('home')"
                    class="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#a0898f] transition-colors hover:text-gold-700"
                >
                    &larr; Return to sanctuary
                </Link>

                <div v-if="status" class="mt-5 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                    {{ status }}
                </div>

                <form @submit.prevent="submit" class="mt-8 space-y-6">
                    <div>
                        <input
                            v-model="form.access_code"
                            type="text"
                            placeholder="✦   ✦   ✦   ✦   ✦   ✦"
                            class="w-full rounded-2xl border border-gold-500/30 bg-white px-6 py-4 text-center font-mono text-base tracking-[0.14em] text-[#5a4e55] placeholder:text-[#b19aa3] focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                            autocomplete="off"
                        />
                        <p class="mt-4 text-sm text-[#8f7f86]">Your code was shared with you by the community keeper.</p>
                        <p v-if="form.errors.access_code" class="mt-2 text-xs text-pink-200">{{ form.errors.access_code }}</p>
                    </div>

                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="w-full rounded-full bg-gold-gradient px-6 py-3.5 text-xl font-semibold text-[#2f2418] shadow-[0_8px_24px_rgba(184,151,88,0.3)] transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {{ form.processing ? 'Entering...' : 'Enter' }}
                    </button>
                </form>

                <div class="my-8 flex items-center gap-4 text-gold-600/75">
                    <div class="h-px flex-1 bg-gold-500/35"></div>
                    <span class="text-xl">✶</span>
                    <div class="h-px flex-1 bg-gold-500/35"></div>
                </div>

                <p class="text-sm text-[#8d7d84]">No email · No password · Only the sacred code</p>
            </div>
        </div>
    </div>
</template>
