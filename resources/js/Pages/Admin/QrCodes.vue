<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import QRCode from 'qrcode';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { loadHistory, saveHistory } from '@/qrHistory';

const FIXED_CAPTION = 'Golden Age Spirituality Movement';

const typeOptions = [
    { value: 'link', label: 'Link / URL', placeholder: 'https://goldenage.community/...', icon: '🔗' },
    { value: 'text', label: 'Text', placeholder: 'Any message or statement...', icon: '📝' },
    { value: 'image', label: 'Image (URL)', placeholder: 'https://.../image.png', icon: '🖼️' },
];

const form = reactive({
    type: 'link',
    title: '',
    value: '',
});
const errors = reactive({ title: '', value: '' });

const imagePreviewError = ref(false);

const qrCanvas = ref(null);
const currentQr = ref(null);
const generating = ref(false);
const copied = ref(false);

const history = reactive([]);
const thumbnails = reactive({});

const qrRenderOptions = {
    width: 260,
    margin: 2,
    color: { dark: '#1b1f38', light: '#ffffff' },
};

onMounted(() => {
    history.splice(0, history.length, ...loadHistory());
    buildThumbnails();
});

async function buildThumbnails() {
    await Promise.all(
        history.map(async (item) => {
            if (thumbnails[item.id]) return;
            try {
                thumbnails[item.id] = await QRCode.toDataURL(item.value, { ...qrRenderOptions, width: 96 });
            } catch {
                thumbnails[item.id] = null;
            }
        }),
    );
}

const currentTypeMeta = () => typeOptions.find((t) => t.value === form.type) ?? typeOptions[0];

const renderCurrentQr = async () => {
    await nextTick();
    if (!qrCanvas.value || !currentQr.value) return;
    await QRCode.toCanvas(qrCanvas.value, currentQr.value.value, qrRenderOptions);
};

const generate = async () => {
    errors.title = '';
    errors.value = '';

    if (!form.title.trim()) {
        errors.title = 'Please enter a title for this QR code.';
        return;
    }
    if (!form.value.trim()) {
        errors.value = `Please enter a ${currentTypeMeta().label.toLowerCase()} to encode.`;
        return;
    }

    generating.value = true;

    const entry = {
        id: Date.now(),
        type: form.type,
        title: form.title.trim(),
        value: form.value.trim(),
        createdAt: new Date().toISOString(),
    };

    currentQr.value = entry;
    await renderCurrentQr();

    history.unshift(entry);
    saveHistory([...history]);
    thumbnails[entry.id] = await QRCode.toDataURL(entry.value, { ...qrRenderOptions, width: 96 });

    generating.value = false;
};

const loadFromHistory = async (item) => {
    form.type = item.type;
    form.title = item.title;
    form.value = item.value;
    currentQr.value = item;
    imagePreviewError.value = false;
    await renderCurrentQr();
};

const removeFromHistory = (item) => {
    const index = history.findIndex((h) => h.id === item.id);
    if (index !== -1) history.splice(index, 1);
    delete thumbnails[item.id];
    saveHistory([...history]);
};

const copyValue = () => {
    if (!currentQr.value) return;
    navigator.clipboard.writeText(currentQr.value.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
};

const downloadPng = () => {
    if (!qrCanvas.value || !currentQr.value) return;

    const qrSize = qrCanvas.value.width;
    const padding = 28;
    const titleHeight = 30;
    const captionHeight = 20;
    const gap = 10;

    const outCanvas = document.createElement('canvas');
    outCanvas.width = qrSize + padding * 2;
    outCanvas.height = qrSize + padding * 2 + titleHeight + captionHeight + gap;

    const ctx = outCanvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, outCanvas.width, outCanvas.height);

    ctx.drawImage(qrCanvas.value, padding, padding, qrSize, qrSize);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#1b1f38';
    ctx.font = '600 18px Georgia, serif';
    ctx.fillText(currentQr.value.title, outCanvas.width / 2, padding + qrSize + gap + 18, outCanvas.width - padding);

    ctx.fillStyle = '#b98a31';
    ctx.font = '600 11px Georgia, serif';
    ctx.fillText(
        FIXED_CAPTION.toUpperCase(),
        outCanvas.width / 2,
        padding + qrSize + gap + titleHeight + 14,
        outCanvas.width - padding,
    );

    const link = document.createElement('a');
    link.download = `${currentQr.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'qr-code'}.png`;
    link.href = outCanvas.toDataURL('image/png');
    link.click();
};

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
</script>

<template>
    <Head title="QR Codes" />

    <AdminLayout title="QR Codes">
        <template #default>
            <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">QR Codes</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Generate a QR code for a link, image, or text — with a title and the Golden Age branding caption.
                    </p>
                </div>
                <span class="inline-flex w-fit items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-[#262636] dark:text-gray-400">
                    Stored in this browser only — no backend yet
                </span>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
                <!-- Form -->
                <div class="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                    <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">Create a QR Code</h2>

                    <div class="mt-4 flex flex-wrap gap-2">
                        <button
                            v-for="option in typeOptions"
                            :key="option.value"
                            type="button"
                            @click="form.type = option.value; imagePreviewError = false"
                            :class="form.type === option.value
                                ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-600/10 dark:text-amber-400 dark:ring-amber-400/30'
                                : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-[#262636]'"
                            class="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium transition-all dark:border-[#2e2e3e]"
                        >
                            <span class="mr-1">{{ option.icon }}</span>{{ option.label }}
                        </button>
                    </div>

                    <form class="mt-5 space-y-4" @submit.prevent="generate">
                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input
                                v-model="form.title"
                                type="text"
                                placeholder="e.g., Meditation Playlist"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            />
                            <p v-if="errors.title" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ errors.title }}</p>
                        </div>

                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{{ currentTypeMeta().label }}</label>
                            <textarea
                                v-if="form.type === 'text'"
                                v-model="form.value"
                                rows="3"
                                :placeholder="currentTypeMeta().placeholder"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors resize-none dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            ></textarea>
                            <input
                                v-else
                                v-model="form.value"
                                type="text"
                                :placeholder="currentTypeMeta().placeholder"
                                @input="imagePreviewError = false"
                                class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/30"
                            />
                            <p v-if="errors.value" class="mt-1 text-xs text-red-500 dark:text-red-400">{{ errors.value }}</p>

                            <!-- Image preview -->
                            <div v-if="form.type === 'image' && form.value.trim()" class="mt-3 flex items-center gap-3 rounded-lg border border-dashed border-gray-200 p-3 dark:border-[#3a3a4e]">
                                <img
                                    v-if="!imagePreviewError"
                                    :src="form.value"
                                    @error="imagePreviewError = true"
                                    class="h-14 w-14 flex-shrink-0 rounded-md object-cover"
                                    alt="Preview"
                                />
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ imagePreviewError ? "Couldn't load a preview — the QR will still encode this URL." : 'The QR code will link to this image.' }}
                                </p>
                            </div>
                        </div>

                        <p class="text-xs text-gray-400 dark:text-gray-500">
                            Every generated code shows "<strong>{{ FIXED_CAPTION }}</strong>" underneath.
                        </p>

                        <button
                            type="submit"
                            :disabled="generating"
                            class="w-full rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-amber-600 dark:hover:bg-amber-500 dark:focus:ring-offset-[#1a1a23]"
                        >
                            {{ generating ? 'Generating...' : 'Generate QR Code' }}
                        </button>
                    </form>
                </div>

                <!-- Preview -->
                <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                    <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">Preview</h2>

                    <div v-if="!currentQr" class="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 py-16 text-center dark:border-[#3a3a4e]">
                        <p class="text-3xl mb-2">▦</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Fill in the form and generate a code to preview it here.</p>
                    </div>

                    <div v-else class="mt-4 flex flex-col items-center">
                        <div class="rounded-xl border border-gray-100 bg-white p-4 dark:border-[#262636]">
                            <canvas ref="qrCanvas"></canvas>
                        </div>
                        <p class="mt-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">{{ currentQr.title }}</p>
                        <p class="mt-1 text-center text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">{{ FIXED_CAPTION }}</p>
                        <p class="mt-2 max-w-xs truncate text-center text-xs text-gray-400 dark:text-gray-500" :title="currentQr.value">{{ currentQr.value }}</p>

                        <div class="mt-5 flex gap-2">
                            <button
                                @click="downloadPng"
                                class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
                            >
                                Download PNG
                            </button>
                            <button
                                @click="copyValue"
                                class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-[#3a3a4e] dark:text-gray-300 dark:hover:bg-[#262636]"
                            >
                                {{ copied ? 'Copied!' : 'Copy Value' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- History -->
            <div class="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                <div class="border-b border-gray-100 px-5 py-4 dark:border-[#262636]">
                    <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100">Recent QR Codes</h2>
                </div>

                <div v-if="history.length === 0" class="py-16 text-center">
                    <p class="text-2xl mb-2">▦</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">No QR codes generated yet.</p>
                </div>

                <div v-else class="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="item in history"
                        :key="item.id"
                        class="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-[#2e2e3e]"
                    >
                        <img
                            v-if="thumbnails[item.id]"
                            :src="thumbnails[item.id]"
                            class="h-12 w-12 flex-shrink-0 rounded border border-gray-100 dark:border-[#262636]"
                            alt=""
                        />
                        <div class="min-w-0 flex-1">
                            <p class="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.title }}</p>
                            <p class="text-xs text-gray-400 dark:text-gray-500">{{ item.type }} &middot; {{ formatDate(item.createdAt) }}</p>
                        </div>
                        <div class="flex flex-shrink-0 flex-col gap-1">
                            <button @click="loadFromHistory(item)" class="text-xs font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                                Load
                            </button>
                            <button @click="removeFromHistory(item)" class="text-xs text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </AdminLayout>
</template>
