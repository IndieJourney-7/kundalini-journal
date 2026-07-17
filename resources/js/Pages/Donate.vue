<script setup>
import { onMounted, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import PublicSiteLayout from '@/Components/PublicSiteLayout.vue';
import { loadDonationSettings } from '@/donation';

const settings = ref(null);

onMounted(() => {
    settings.value = loadDonationSettings();
});
</script>

<template>
    <Head title="Donate" />

    <PublicSiteLayout active="donate">
        <section class="mx-auto max-w-[900px] px-4 pb-16 pt-14">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-[#c28e2f]">Support Our Mission</p>
            <h1 class="mt-2 font-heading text-3xl text-[#1f2235] sm:text-5xl">Donate Now</h1>
            <p v-if="settings" class="mt-5 max-w-2xl text-lg leading-8 text-[#5e6278]">{{ settings.intro }}</p>

            <div v-if="settings" class="mt-10 grid gap-5 md:grid-cols-2">
                <article class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <h2 class="font-heading text-2xl text-[#1f2235]">Bank Account Details</h2>
                    <dl v-if="settings.bankAccountNumber" class="mt-4 space-y-2 text-sm text-[#4e5265]">
                        <div class="flex justify-between gap-4"><dt class="font-semibold">Account Name</dt><dd>{{ settings.bankAccountName }}</dd></div>
                        <div class="flex justify-between gap-4"><dt class="font-semibold">Account Number</dt><dd>{{ settings.bankAccountNumber }}</dd></div>
                        <div class="flex justify-between gap-4"><dt class="font-semibold">IFSC Code</dt><dd>{{ settings.bankIFSC }}</dd></div>
                        <div class="flex justify-between gap-4"><dt class="font-semibold">Bank</dt><dd>{{ settings.bankName }}</dd></div>
                        <div v-if="settings.bankBranch" class="flex justify-between gap-4"><dt class="font-semibold">Branch</dt><dd>{{ settings.bankBranch }}</dd></div>
                    </dl>
                    <p v-else class="mt-4 text-sm text-[#9a9fb3]">Bank details have not been added yet. Please check back soon.</p>
                </article>

                <article class="rounded-2xl border border-gold-500/20 bg-white p-6">
                    <h2 class="font-heading text-2xl text-[#1f2235]">UPI / PhonePe</h2>
                    <p v-if="settings.upiId" class="mt-4 text-sm text-[#4e5265]"><span class="font-semibold">UPI ID:</span> {{ settings.upiId }}</p>
                    <a
                        v-if="settings.phonePeLink"
                        :href="settings.phonePeLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="mt-4 inline-flex rounded-xl bg-[#1b1f38] px-5 py-3 text-sm font-semibold text-white hover:bg-[#262b4a]"
                    >
                        Pay via PhonePe
                    </a>
                    <p v-if="!settings.upiId && !settings.phonePeLink" class="mt-4 text-sm text-[#9a9fb3]">UPI / PhonePe details have not been added yet.</p>
                </article>

                <article class="rounded-2xl border border-gold-500/20 bg-white p-6 md:col-span-2">
                    <h2 class="font-heading text-2xl text-[#1f2235]">Global Payments</h2>
                    <div class="mt-4 flex flex-wrap gap-3">
                        <a
                            v-if="settings.paypalLink"
                            :href="settings.paypalLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="rounded-xl border border-gold-500/40 px-5 py-3 text-sm font-semibold text-[#463b26] hover:bg-gold-500/10"
                        >
                            Donate via PayPal
                        </a>
                        <a
                            v-if="settings.globalPaymentLink"
                            :href="settings.globalPaymentLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="rounded-xl border border-gold-500/40 px-5 py-3 text-sm font-semibold text-[#463b26] hover:bg-gold-500/10"
                        >
                            International Payment Link
                        </a>
                    </div>
                    <p v-if="!settings.paypalLink && !settings.globalPaymentLink" class="mt-4 text-sm text-[#9a9fb3]">International payment links have not been added yet.</p>
                </article>
            </div>

            <p v-if="settings?.note" class="mt-8 text-sm text-[#7b8095]">{{ settings.note }}</p>
        </section>
    </PublicSiteLayout>
</template>
