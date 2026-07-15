<script setup>
import { ref } from 'vue';
import { Link, router, useForm } from '@inertiajs/vue3';
import GradientButton from '@/Components/GradientButton.vue';

const props = defineProps({
    mustVerifyEmail: Boolean,
    status: String,
    user: Object,
});

const form = useForm({
    name: props.user.name,
    email: props.user.email,
});

const submit = () => {
    form.patch(route('profile.update'), {
        preserveScroll: true,
        onSuccess: () => {},
    });
};
</script>

<template>
    <section class="rounded-2xl border border-gold-500/20 bg-sacred-card/50 backdrop-blur-sm p-6">
        <header class="mb-6">
            <h2 class="text-lg font-semibold text-gold-400 font-heading">Profile Information</h2>
            <p class="mt-1 text-sm text-gray-400">
                Update your account's profile information and email address.
            </p>
        </header>

        <form @submit.prevent="submit" class="space-y-5">
            <!-- Name -->
            <div>
                <label class="mb-2 block text-sm font-medium text-gray-300">Name</label>
                <input
                    v-model="form.name"
                    type="text"
                    class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
                    required
                />
                <p v-if="form.errors.name" class="mt-1 text-xs text-pink-300">{{ form.errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
                <label class="mb-2 block text-sm font-medium text-gray-300">Email</label>
                <input
                    v-model="form.email"
                    type="email"
                    class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
                    required
                />
                <p v-if="form.errors.email" class="mt-1 text-xs text-pink-300">{{ form.errors.email }}</p>
            </div>

            <div v-if="mustVerifyEmail && !user.email_verified_at">
                <p class="text-sm text-gray-400">
                    Your email address is unverified.
                    <Link
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="rounded-md text-sm text-gold-400 underline hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    >
                        Click here to re-send the verification email.
                    </Link>
                </p>

                <div v-if="status === 'verification-link-sent'" class="mt-2 text-sm font-medium text-green-400">
                    A new verification link has been sent to your email address.
                </div>
            </div>

            <div class="flex items-center gap-4">
                <GradientButton type="submit" variant="gold" :disabled="form.processing">
                    {{ form.processing ? 'Saving...' : 'Save Changes' }}
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
