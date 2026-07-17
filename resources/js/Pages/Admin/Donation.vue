<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { DEFAULT_DONATION_SETTINGS, loadDonationSettings, saveDonationSettings } from '@/donation';

const form = reactive({ ...DEFAULT_DONATION_SETTINGS });
const savedNotice = ref(false);

onMounted(() => {
    Object.assign(form, loadDonationSettings());
});

const save = () => {
    saveDonationSettings({ ...form });
    savedNotice.value = true;
    window.setTimeout(() => (savedNotice.value = false), 2500);
};

const resetToDefault = () => {
    Object.assign(form, DEFAULT_DONATION_SETTINGS);
    saveDonationSettings({ ...form });
};
</script>

<template>
    <Head title="Donation Settings" />

    <AdminLayout title="Donation Settings">
        <template #default>
            <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">Donation Settings</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        These details appear on the public "Donate Now" page. Leave a field blank to hide that section.
                    </p>
                </div>
                <span class="inline-flex w-fit items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-[#262636] dark:text-gray-400">
                    Stored in this browser only — no backend yet
                </span>
            </div>

            <form class="max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]" @submit.prevent="save">
                <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Intro Message</label>
                    <textarea
                        v-model="form.intro"
                        rows="2"
                        class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100"
                    ></textarea>
                </div>

                <fieldset class="space-y-4">
                    <legend class="text-sm font-semibold text-gray-800 dark:text-gray-100">Bank Account Details</legend>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <input v-model="form.bankAccountName" type="text" placeholder="Account Name" class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                        <input v-model="form.bankAccountNumber" type="text" placeholder="Account Number" class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                        <input v-model="form.bankIFSC" type="text" placeholder="IFSC Code" class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                        <input v-model="form.bankName" type="text" placeholder="Bank Name" class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                        <input v-model="form.bankBranch" type="text" placeholder="Branch (optional)" class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm sm:col-span-2 dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                    </div>
                </fieldset>

                <fieldset class="space-y-4">
                    <legend class="text-sm font-semibold text-gray-800 dark:text-gray-100">UPI / PhonePe</legend>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <input v-model="form.upiId" type="text" placeholder="UPI ID (e.g. name@upi)" class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                        <input v-model="form.phonePeLink" type="url" placeholder="PhonePe payment link" class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                    </div>
                </fieldset>

                <fieldset class="space-y-4">
                    <legend class="text-sm font-semibold text-gray-800 dark:text-gray-100">Global Payments</legend>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <input v-model="form.paypalLink" type="url" placeholder="PayPal link" class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                        <input v-model="form.globalPaymentLink" type="url" placeholder="Other international payment link" class="rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                    </div>
                </fieldset>

                <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Footnote <span class="normal-case text-gray-400 dark:text-gray-500">(optional)</span></label>
                    <input v-model="form.note" type="text" placeholder="e.g. tax receipts available on request" class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                </div>

                <div class="flex items-center gap-3">
                    <button type="submit" class="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500">
                        Save Changes
                    </button>
                    <button type="button" @click="resetToDefault" class="text-xs font-medium text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        Reset to blank
                    </button>
                    <span v-if="savedNotice" class="text-xs font-medium text-emerald-600 dark:text-emerald-400">Saved!</span>
                </div>
            </form>
        </template>
    </AdminLayout>
</template>
