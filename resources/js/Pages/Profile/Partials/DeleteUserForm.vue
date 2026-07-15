<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import GradientButton from '@/Components/GradientButton.vue';
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;
    setTimeout(() => passwordInput.value?.focus(), 250);
};

const deleteUser = () => {
    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;
    form.reset();
};
</script>

<template>
    <section class="rounded-2xl border border-pink-500/20 bg-pink-500/5 backdrop-blur-sm p-6">
        <header class="mb-6">
            <h2 class="text-lg font-semibold text-pink-300 font-heading">Delete Account</h2>
            <p class="mt-1 text-sm text-gray-400">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
            </p>
        </header>

        <GradientButton @click="confirmUserDeletion" variant="pink">
            Delete Account
        </GradientButton>

        <!-- Delete Account Confirmation Modal -->
        <Modal :show="confirmingUserDeletion" @close="closeModal">
            <div class="p-6 bg-sacred-card rounded-2xl">
                <h2 class="text-lg font-semibold text-pink-300 font-heading">
                    Are you sure you want to delete your account?
                </h2>
                <p class="mt-1 text-sm text-gray-400">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                </p>

                <div class="mt-6">
                    <InputLabel for="password" value="Password" class="text-gray-300" />
                    <TextInput
                        id="password"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-full"
                        placeholder="Password"
                        @keyup.enter="deleteUser"
                    />
                    <InputError :message="form.errors.password" class="mt-2" />
                </div>

                <div class="mt-6 flex justify-end gap-3">
                    <GradientButton @click="closeModal" variant="ghost">
                        Cancel
                    </GradientButton>
                    <GradientButton @click="deleteUser" variant="pink" :disabled="form.processing">
                        {{ form.processing ? 'Deleting...' : 'Delete Account' }}
                    </GradientButton>
                </div>
            </div>
        </Modal>
    </section>
</template>
