<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import GoldShiningText from '@/Components/GoldShiningText.vue';
import GradientButton from '@/Components/GradientButton.vue';

defineProps({
    status: String,
});

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};
</script>

<template>
    <Head title="Email Verification" />

    <div class="min-h-screen bg-sacred-dark flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl"></div>
        </div>

        <div class="relative w-full max-w-md">
            <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-500/20 via-pink-500/20 to-gold-500/20 opacity-60 blur-sm animate-glow"></div>

            <div class="relative rounded-2xl border border-gold-500/20 bg-sacred-card/80 backdrop-blur-xl p-8 sm:p-10">
                <div class="mb-6 text-center">
                    <GoldShiningText as="h2" size="text-2xl mb-2">
                        Verify Email
                    </GoldShiningText>
                    <p class="text-sm text-gray-400 mb-4">
                        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                    </p>

                    <div v-if="status === 'verification-link-sent'" class="mb-4 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
                        A new verification link has been sent to the email address you provided during registration.
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <GradientButton @click="submit" variant="gold" :disabled="form.processing">
                        {{ form.processing ? 'Sending...' : 'Resend Verification Email' }}
                    </GradientButton>
                    <Link
                        :href="route('logout')"
                        method="post"
                        as="button"
                        class="text-sm text-gray-500 hover:text-gold-400 transition-colors"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
