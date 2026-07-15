<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import GradientButton from '@/Components/GradientButton.vue';

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
            }
        },
    });
};
</script>

<template>
    <section class="rounded-2xl border border-gold-500/20 bg-sacred-card/50 backdrop-blur-sm p-6">
        <header class="mb-6">
            <h2 class="text-lg font-semibold text-gold-400 font-heading">Update Password</h2>
            <p class="mt-1 text-sm text-gray-400">
                Ensure your account is using a long, random password to stay secure.
            </p>
        </header>

        <form @submit.prevent="submit" class="space-y-5">
            <div>
                <label class="mb-2 block text-sm font-medium text-gray-300">Current Password</label>
                <input
                    v-model="form.current_password"
                    type="password"
                    placeholder="••••••••"
                    class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
                />
                <p v-if="form.errors.current_password" class="mt-1 text-xs text-pink-300">{{ form.errors.current_password }}</p>
            </div>

            <div>
                <label class="mb-2 block text-sm font-medium text-gray-300">New Password</label>
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

            <div class="flex items-center gap-4">
                <GradientButton type="submit" variant="gold" :disabled="form.processing">
                    {{ form.processing ? 'Saving...' : 'Save' }}
                </GradientButton>
                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p v-if="form.recentlySuccessful" class="text-sm text-green-400">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>
