<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { enterWithCode, updateWriterProfile } from '@/writerSession';

const step = ref('code'); // 'code' | 'profile'
const code = ref('');
const error = ref('');
const submitting = ref(false);

const profile = ref({ name: '', avatar: '🪷', tagline: '', bio: '', mantra: '', location: '' });
const activeCode = ref('');

const avatarOptions = ['🪷', '🕉️', '✨', '🌞', '🌙', '🔥', '🌊', '🌿', '🦚', '🙏'];

const submitCode = () => {
    error.value = '';

    if (!code.value.trim()) {
        error.value = 'Please enter your sacred code.';
        return;
    }

    submitting.value = true;

    setTimeout(() => {
        const result = enterWithCode(code.value);
        submitting.value = false;

        if (!result) {
            error.value = 'Something went wrong — please try again.';
            return;
        }

        if (result.isNew) {
            activeCode.value = result.writer.code;
            step.value = 'profile';
        } else {
            router.visit('/dashboard');
        }
    }, 300);
};

const submitProfile = () => {
    error.value = '';

    if (!profile.value.name.trim()) {
        error.value = 'Please enter your name — it appears on your journal and profile.';
        return;
    }

    updateWriterProfile(activeCode.value, { ...profile.value });
    router.visit('/dashboard');
};
</script>

<template>
    <Head title="Enter Your Journal" />

    <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbfaf7] px-4 py-12">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,151,88,0.13),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(184,143,160,0.08),transparent_40%),linear-gradient(180deg,#fffdf9_0%,#f8f4ed_60%,#f4efe7_100%)]"></div>

        <div class="relative w-full max-w-2xl rounded-[2rem] border-[2px] border-gold-500/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,242,235,0.96))] p-7 shadow-[0_20px_45px_rgba(109,92,67,0.16)] sm:p-10">
            <!-- Step 1: Code entry -->
            <div v-if="step === 'code'" class="mx-auto max-w-md text-center">
                <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-400/60 bg-white shadow-[0_0_20px_rgba(184,151,88,0.2)]">
                    <ApplicationLogo compact class="h-[4.2rem] w-[4.2rem]" />
                </div>

                <h1 class="font-heading text-3xl text-[#4f4243] sm:text-4xl">Enter Your Journal</h1>
                <p class="mt-2 text-lg text-[#7b6d72]">Your sacred access code</p>
                <Link href="/" class="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#a0898f] transition-colors hover:text-gold-700">
                    &larr; Return to sanctuary
                </Link>

                <form @submit.prevent="submitCode" class="mt-8 space-y-6">
                    <div>
                        <input
                            v-model="code"
                            type="text"
                            placeholder="✦   ✦   ✦   ✦   ✦   ✦"
                            class="w-full rounded-2xl border border-gold-500/30 bg-white px-6 py-4 text-center font-mono text-base tracking-[0.14em] text-[#5a4e55] placeholder:text-[#b19aa3] focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                            autocomplete="off"
                            autofocus
                        />
                        <p class="mt-4 text-sm text-[#8f7f86]">Any code works. Use the same one next time to return to your journal.</p>
                        <p v-if="error" class="mt-2 text-xs text-pink-600">{{ error }}</p>
                    </div>

                    <button
                        type="submit"
                        :disabled="submitting"
                        class="w-full rounded-full bg-gold-gradient px-6 py-3.5 text-xl font-semibold text-[#2f2418] shadow-[0_8px_24px_rgba(184,151,88,0.3)] transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {{ submitting ? 'Entering...' : 'Enter' }}
                    </button>
                </form>

                <div class="my-8 flex items-center gap-4 text-gold-600/75">
                    <div class="h-px flex-1 bg-gold-500/35"></div>
                    <span class="text-xl">✶</span>
                    <div class="h-px flex-1 bg-gold-500/35"></div>
                </div>

                <p class="text-sm text-[#8d7d84]">No email · No password · Only the sacred code</p>
            </div>

            <!-- Step 2: First-time profile setup -->
            <div v-else class="mx-auto max-w-lg">
                <div class="text-center">
                    <h1 class="font-heading text-3xl text-[#4f4243] sm:text-4xl">Welcome, Seeker</h1>
                    <p class="mt-2 text-[#7b6d72]">Set up your profile before you begin your first entry.</p>
                </div>

                <form @submit.prevent="submitProfile" class="mt-8 space-y-5">
                    <div class="flex justify-center gap-2">
                        <button
                            v-for="option in avatarOptions"
                            :key="option"
                            type="button"
                            @click="profile.avatar = option"
                            :class="profile.avatar === option ? 'border-gold-500 bg-gold-500/10' : 'border-transparent hover:border-gold-500/30'"
                            class="flex h-11 w-11 items-center justify-center rounded-full border-2 text-xl transition-all"
                        >
                            {{ option }}
                        </button>
                    </div>

                    <div>
                        <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8f7f86]">Your Name</label>
                        <input
                            v-model="profile.name"
                            type="text"
                            placeholder="e.g., Maya Devi"
                            class="w-full rounded-xl border border-gold-500/30 bg-white px-4 py-3 text-sm text-[#4f4243] placeholder:text-[#b19aa3] focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                        />
                    </div>

                    <div>
                        <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8f7f86]">Tagline</label>
                        <input
                            v-model="profile.tagline"
                            type="text"
                            placeholder="e.g., Awakening through Grace"
                            class="w-full rounded-xl border border-gold-500/30 bg-white px-4 py-3 text-sm text-[#4f4243] placeholder:text-[#b19aa3] focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                        />
                    </div>

                    <div>
                        <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8f7f86]">Bio</label>
                        <textarea
                            v-model="profile.bio"
                            rows="3"
                            placeholder="A little about your spiritual background and journey..."
                            class="w-full rounded-xl border border-gold-500/30 bg-white px-4 py-3 text-sm text-[#4f4243] placeholder:text-[#b19aa3] focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-500/20 resize-none"
                        ></textarea>
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8f7f86]">Favourite Mantra</label>
                            <input
                                v-model="profile.mantra"
                                type="text"
                                placeholder="Om Namah Shivaya"
                                class="w-full rounded-xl border border-gold-500/30 bg-white px-4 py-3 text-sm text-[#4f4243] placeholder:text-[#b19aa3] focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                            />
                        </div>
                        <div>
                            <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8f7f86]">
                                Location <span class="normal-case text-[#b19aa3]">(optional)</span>
                            </label>
                            <input
                                v-model="profile.location"
                                type="text"
                                placeholder="City, Country"
                                class="w-full rounded-xl border border-gold-500/30 bg-white px-4 py-3 text-sm text-[#4f4243] placeholder:text-[#b19aa3] focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                            />
                        </div>
                    </div>

                    <p v-if="error" class="text-xs text-pink-600">{{ error }}</p>

                    <button
                        type="submit"
                        class="w-full rounded-full bg-gold-gradient px-6 py-3.5 text-lg font-semibold text-[#2f2418] shadow-[0_8px_24px_rgba(184,151,88,0.3)] transition-all hover:brightness-105"
                    >
                        Begin My Journey
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
