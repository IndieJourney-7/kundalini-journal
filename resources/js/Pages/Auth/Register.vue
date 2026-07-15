<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import GoldShiningText from '@/Components/GoldShiningText.vue';
import GradientButton from '@/Components/GradientButton.vue';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Register" />

    <div class="min-h-screen bg-sacred-dark flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl"></div>
            <div class="absolute top-1/4 right-1/4 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl"></div>
        </div>

        <div class="relative w-full max-w-md">
            <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-500/20 via-pink-500/20 to-gold-500/20 opacity-60 blur-sm animate-glow"></div>

            <div class="relative rounded-2xl border border-gold-500/20 bg-sacred-card/80 backdrop-blur-xl p-8 sm:p-10">
                <div class="mb-6 text-center">
                    <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-500/40 bg-sacred-dark shadow-gold">
                        <span class="text-2xl">🪷</span>
                    </div>
                    <GoldShiningText as="h2" size="text-2xl mb-2">
                        Join the Community
                    </GoldShiningText>
                    <p class="text-sm text-gray-400">Create your sacred account</p>
                </div>

                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-300">Name</label>
                        <input
                            v-model="form.name"
                            type="text"
                            placeholder="Your sacred name"
                            class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
                        />
                        <p v-if="form.errors.name" class="mt-1 text-xs text-pink-300">{{ form.errors.name }}</p>
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-300">Email</label>
                        <input
                            v-model="form.email"
                            type="email"
                            placeholder="you@example.com"
                            class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
                        />
                        <p v-if="form.errors.email" class="mt-1 text-xs text-pink-300">{{ form.errors.email }}</p>
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-300">Password</label>
                        <input
                            v-model="form.password"
                            type="password"
                            placeholder="••••••••"
                            class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
                        />
                        <p v-if="form.errors.password" class="mt-1 text-xs text-pink-300">{{ form.errors.password }}</p>
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-medium text-gray-300">Confirm Password</label>
                        <input
                            v-model="form.password_confirmation"
                            type="password"
                            placeholder="••••••••"
                            class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
                        />
                    </div>

                    <GradientButton type="submit" variant="gold" size="lg" class="w-full" :disabled="form.processing">
                        <span class="mr-2">✨</span>
                        {{ form.processing ? 'Creating...' : 'Create Account' }}
                    </GradientButton>

                    <p class="text-center text-sm text-gray-400">
                        Already have an account?
                        <Link :href="route('login')" class="text-gold-400 hover:text-gold-300 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>
