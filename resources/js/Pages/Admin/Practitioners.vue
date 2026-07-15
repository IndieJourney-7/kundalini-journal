<script setup>
import { ref, reactive, computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import Modal from '@/Components/Modal.vue';

const props = defineProps({
    practitioners: {
        type: Array,
        default: () => [],
    },
});

// Frontend-only preview: mutates a local copy so status/code actions feel real.
// Wire these up to real endpoints once the practitioner data model exists.
const localPractitioners = reactive(props.practitioners.map((p) => ({ ...p })));

const search = ref('');
const statusFilter = ref('all');

const confirmRegenerateFor = ref(null);
const revealedCode = ref(null);
const revealedFor = ref(null);
const copied = ref(false);

const generateAccessCode = () => {
    const year = new Date().getFullYear();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    for (let i = 0; i < 6; i += 1) {
        suffix += chars[Math.floor(Math.random() * chars.length)];
    }
    return `GA-${year}-${suffix}`;
};

const toggleStatus = (practitioner) => {
    practitioner.status = practitioner.status === 'active' ? 'inactive' : 'active';
};

const askRegenerate = (practitioner) => {
    confirmRegenerateFor.value = practitioner;
};

const cancelRegenerate = () => {
    confirmRegenerateFor.value = null;
};

const confirmRegenerate = () => {
    const practitioner = confirmRegenerateFor.value;
    if (!practitioner) return;

    const code = generateAccessCode();
    practitioner.code = code;
    revealedCode.value = code;
    revealedFor.value = practitioner.name;
    confirmRegenerateFor.value = null;
};

const copyRevealedCode = () => {
    if (!revealedCode.value) return;
    navigator.clipboard.writeText(revealedCode.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
};

const closeRevealModal = () => {
    revealedCode.value = null;
    revealedFor.value = null;
    copied.value = false;
};

const filteredPractitioners = computed(() => {
    return localPractitioners.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.value.toLowerCase()) ||
            (p.code && p.code.toLowerCase().includes(search.value.toLowerCase()));
        const matchesStatus = statusFilter.value === 'all' || p.status === statusFilter.value;
        return matchesSearch && matchesStatus;
    });
});

function getInitials(name) {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
}

function formatDate(dateStr) {
    if (!dateStr) return 'Never';
    const d = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
</script>

<template>
    <Head title="Practitioners" />

    <AdminLayout title="Practitioners">
        <template #default>
            <!-- Header -->
            <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">Practitioners</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage all registered practitioners and their access codes.</p>
                </div>
                <a
                    :href="$page.url.startsWith('/ui/') ? '/ui/admin/practitioners/create' : '/admin/practitioners/create'"
                    class="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-600 dark:hover:bg-amber-500 dark:focus:ring-offset-[#1a1a23]"
                >
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Create Code
                </a>
            </div>

            <!-- Search & Filters -->
            <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div class="relative flex-1">
                    <svg
                        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        v-model="search"
                        type="text"
                        placeholder="Search by name or code..."
                        class="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                    />
                </div>
                <div class="flex gap-1.5">
                    <button
                        @click="statusFilter = 'all'"
                        :class="statusFilter === 'all' ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#262636]'"
                        class="rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium transition-all dark:border-[#2e2e3e]"
                    >
                        All
                    </button>
                    <button
                        @click="statusFilter = 'active'"
                        :class="statusFilter === 'active' ? 'bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500 dark:border-emerald-500' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#262636]'"
                        class="rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium transition-all dark:border-[#2e2e3e]"
                    >
                        Active
                    </button>
                    <button
                        @click="statusFilter = 'inactive'"
                        :class="statusFilter === 'inactive' ? 'bg-gray-400 text-white border-gray-400 dark:bg-gray-500 dark:border-gray-500' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#262636]'"
                        class="rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium transition-all dark:border-[#2e2e3e]"
                    >
                        Inactive
                    </button>
                </div>
            </div>

            <!-- Table -->
            <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                <!-- Header row -->
                <div class="hidden border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:grid sm:grid-cols-12 dark:border-[#262636] dark:bg-[#141420] dark:text-gray-400">
                    <div class="col-span-3">Name</div>
                    <div class="col-span-2">Code</div>
                    <div class="col-span-1">Entries</div>
                    <div class="col-span-2">Last Active</div>
                    <div class="col-span-1">Status</div>
                    <div class="col-span-3 text-right">Actions</div>
                </div>

                <!-- Empty state -->
                <div v-if="filteredPractitioners.length === 0" class="py-16 text-center">
                    <p class="text-2xl mb-2">🔍</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">No practitioners found.</p>
                    <p v-if="search || statusFilter !== 'all'" class="mt-1 text-xs text-gray-400 dark:text-gray-500">Try adjusting your search or filter.</p>
                </div>

                <!-- Rows -->
                <div v-else class="divide-y divide-gray-100 dark:divide-[#262636]">
                    <div
                        v-for="practitioner in filteredPractitioners"
                        :key="practitioner.id"
                        class="grid grid-cols-1 gap-2 px-5 py-4 transition-colors hover:bg-gray-50 sm:grid-cols-12 sm:items-center dark:hover:bg-[#262636]"
                    >
                        <!-- Name -->
                        <div class="col-span-3 flex items-center gap-3">
                            <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-sm font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-600/10 dark:text-amber-400 dark:ring-amber-400/30">
                                {{ getInitials(practitioner.name) }}
                            </div>
                            <div class="min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-100">{{ practitioner.name }}</p>
                                <p v-if="practitioner.email" class="text-xs text-gray-500 truncate dark:text-gray-400">{{ practitioner.email }}</p>
                            </div>
                        </div>

                        <!-- Code -->
                        <div class="col-span-2">
                            <span class="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600 dark:bg-[#262636] dark:text-gray-400">{{ practitioner.code }}</span>
                        </div>

                        <!-- Entries -->
                        <div class="col-span-1">
                            <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ practitioner.entries_count || 0 }}</span>
                        </div>

                        <!-- Last Active -->
                        <div class="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                            {{ formatDate(practitioner.last_active) }}
                        </div>

                        <!-- Status -->
                        <div class="col-span-1">
                            <span
                                class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                                :class="practitioner.status === 'active'
                                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/30'
                                    : 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/20 dark:bg-gray-700 dark:text-gray-400 dark:ring-gray-500'"
                            >
                                <span
                                    class="inline-flex h-1.5 w-1.5 rounded-full"
                                    :class="practitioner.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400 dark:bg-gray-500'"
                                ></span>
                                {{ practitioner.status === 'active' ? 'Active' : 'Inactive' }}
                            </span>
                        </div>

                        <!-- Actions -->
                        <div class="col-span-3 flex items-center justify-start gap-2 sm:justify-end">
                            <button
                                @click="toggleStatus(practitioner)"
                                class="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-[#2e2e3e] dark:text-gray-300 dark:hover:bg-[#262636]"
                            >
                                {{ practitioner.status === 'active' ? 'Deactivate' : 'Activate' }}
                            </button>
                            <button
                                @click="askRegenerate(practitioner)"
                                class="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-50 dark:border-[#2e2e3e] dark:text-amber-400 dark:hover:bg-amber-600/10"
                            >
                                Regenerate Code
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Summary -->
            <div class="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <p>Showing {{ filteredPractitioners.length }} of {{ localPractitioners.length }} practitioners</p>
            </div>

            <!-- Confirm regenerate modal -->
            <Modal :show="confirmRegenerateFor !== null" @close="cancelRegenerate" max-width="sm">
                <div class="p-6" v-if="confirmRegenerateFor">
                    <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">Regenerate access code?</h3>
                    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        This will invalidate <strong class="text-gray-900 dark:text-gray-200">{{ confirmRegenerateFor.code }}</strong>
                        for <strong class="text-gray-900 dark:text-gray-200">{{ confirmRegenerateFor.name }}</strong>. The old code will stop working immediately.
                    </p>
                    <div class="mt-6 flex justify-end gap-3">
                        <button
                            @click="cancelRegenerate"
                            class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-[#3a3a4e] dark:text-gray-300 dark:hover:bg-[#262636]"
                        >
                            Cancel
                        </button>
                        <button
                            @click="confirmRegenerate"
                            class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
                        >
                            Yes, Regenerate
                        </button>
                    </div>
                </div>
            </Modal>

            <!-- Revealed new code modal -->
            <Modal :show="revealedCode !== null" @close="closeRevealModal" max-width="sm">
                <div class="p-6" v-if="revealedCode">
                    <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">New code for {{ revealedFor }}</h3>
                    <div class="mt-4 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-400/30 dark:bg-amber-600/10">
                        <code class="text-lg font-mono tracking-wider text-amber-800 select-all dark:text-amber-300">{{ revealedCode }}</code>
                        <button
                            @click="copyRevealedCode"
                            class="flex-shrink-0 rounded-lg border border-amber-300 px-3 py-1.5 text-sm font-medium text-amber-700 transition-all hover:bg-amber-100 dark:border-amber-400/30 dark:text-amber-400 dark:hover:bg-amber-600/20"
                        >
                            {{ copied ? 'Copied!' : 'Copy' }}
                        </button>
                    </div>
                    <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">Share this privately with the practitioner.</p>
                    <div class="mt-6 flex justify-end">
                        <button
                            @click="closeRevealModal"
                            class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </Modal>
        </template>
    </AdminLayout>
</template>
