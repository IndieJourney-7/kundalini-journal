<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import GoldShiningText from '@/Components/GoldShiningText.vue';
import GradientButton from '@/Components/GradientButton.vue';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => form.reset(),
    });
};
</script>

<template>
    <Head title="Confirm Password" />

    <div class="min-h-screen bg-sacred-dark flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl"></div>
        </div>

        <div class="relative w-full max-w-md">
            <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-500/20 via-pink-500/20 to-gold-500/20 opacity-60 blur-sm animate-glow"></div>

            <div class="relative rounded-2xl border border-gold-500/20 bg-sacred-card/80 backdrop-blur-xl p-8 sm:p-10">
                <div class="mb-6 text-center">
                    <GoldShiningText as="h2" size="text-2xl mb-2">
                        Confirm Password
                    </GoldShiningText>
                    <p class="text-sm text-gray-400">Please confirm your password to continue</p>
                </div>

                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-300">Password</label>
                        <input
                            v-model="form.password"
                            type="password"
                            placeholder="Your sacred password"
                            class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
                        />
                        <p v-if="form.errors.password" class="mt-1 text-xs text-pink-300">{{ form.errors.password }}</p>
                    </div>

                    <GradientButton type="submit" variant="gold" size="lg" class="w-full" :disabled="form.processing">
                        {{ form.processing ? 'Confirming...' : 'Confirm' }}
                    </GradientButton>
                </form>
            </div>
        </div>
    </div>
</template>
