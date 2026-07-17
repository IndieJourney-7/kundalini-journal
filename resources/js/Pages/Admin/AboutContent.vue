<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { loadAboutContent, saveAboutContent } from '@/aboutContent';
import { formatBytes, MAX_PERSISTABLE_BYTES, readFileAsDataUrl } from '@/media';

const activeTab = ref('gasm');
const tabs = [
    { key: 'gasm', label: 'About GASM' },
    { key: 'grandMaster', label: 'Grand Master' },
    { key: 'coreTeam', label: 'Core Team' },
];

const content = reactive(loadAboutContent());
const imageWarning = ref('');
const savedNotice = ref(false);

onMounted(() => {
    Object.assign(content, loadAboutContent());
});

const save = () => {
    saveAboutContent(JSON.parse(JSON.stringify(content)));
    savedNotice.value = true;
    window.setTimeout(() => (savedNotice.value = false), 2500);
};

const addImages = async (event, section) => {
    const files = Array.from(event.target.files || []);
    imageWarning.value = '';

    for (const file of files) {
        if (file.size > MAX_PERSISTABLE_BYTES) {
            imageWarning.value = `"${file.name}" (${formatBytes(file.size)}) is too large — max ${formatBytes(MAX_PERSISTABLE_BYTES)} per image.`;
            continue;
        }
        const dataUrl = await readFileAsDataUrl(file);
        content[section].images.push({ id: Date.now() + Math.random(), name: file.name, dataUrl });
    }

    event.target.value = '';
};

const removeImage = (section, id) => {
    const idx = content[section].images.findIndex((img) => img.id === id);
    if (idx !== -1) content[section].images.splice(idx, 1);
};

const addMember = () => {
    content.coreTeam.members.push({
        id: Date.now() + Math.random(),
        name: '',
        role: '',
        photo: null,
    });
};

const removeMember = (id) => {
    const idx = content.coreTeam.members.findIndex((m) => m.id === id);
    if (idx !== -1) content.coreTeam.members.splice(idx, 1);
};

const setMemberPhoto = async (event, member) => {
    const file = event.target.files?.[0];
    if (!file) return;

    imageWarning.value = '';
    if (file.size > MAX_PERSISTABLE_BYTES) {
        imageWarning.value = `"${file.name}" (${formatBytes(file.size)}) is too large — max ${formatBytes(MAX_PERSISTABLE_BYTES)} per image.`;
        event.target.value = '';
        return;
    }

    member.photo = await readFileAsDataUrl(file);
    event.target.value = '';
};
</script>

<template>
    <Head title="About Page Content" />

    <AdminLayout title="About Page Content">
        <template #default>
            <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">About Page Content</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Edit the text and images shown on About GASM, Grand Master, and Core Team pages.
                    </p>
                </div>
                <span class="inline-flex w-fit items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-[#262636] dark:text-gray-400">
                    Stored in this browser only — no backend yet
                </span>
            </div>

            <div class="mb-6 flex gap-2 border-b border-gray-200 dark:border-[#2e2e3e]">
                <button
                    v-for="tab in tabs"
                    :key="tab.key"
                    type="button"
                    @click="activeTab = tab.key"
                    :class="[
                        'border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                        activeTab === tab.key
                            ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                    ]"
                >
                    {{ tab.label }}
                </button>
            </div>

            <p v-if="imageWarning" class="mb-4 text-xs text-amber-600 dark:text-amber-400">{{ imageWarning }}</p>

            <!-- About GASM -->
            <div v-if="activeTab === 'gasm'" class="max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Mission / About Text</label>
                    <textarea
                        v-model="content.gasm.text"
                        rows="5"
                        class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100"
                    ></textarea>
                </div>

                <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Gallery Images</label>
                    <div class="flex flex-wrap gap-3">
                        <div v-for="img in content.gasm.images" :key="img.id" class="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 dark:border-[#2e2e3e]">
                            <img :src="img.dataUrl" :alt="img.name" class="h-full w-full object-cover" />
                            <button
                                type="button"
                                @click="removeImage('gasm', img.id)"
                                class="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                        <label class="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-amber-400 hover:text-amber-500 dark:border-[#3a3a4e]">
                            <span class="text-xl">+</span>
                            <span class="text-[10px]">Add</span>
                            <input type="file" accept="image/*" multiple class="hidden" @change="addImages($event, 'gasm')" />
                        </label>
                    </div>
                </div>
            </div>

            <!-- Grand Master -->
            <div v-if="activeTab === 'grandMaster'" class="max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Bio Text</label>
                    <textarea
                        v-model="content.grandMaster.text"
                        rows="6"
                        placeholder="Life story, teachings, and vision of Dr Hari Krishna..."
                        class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100"
                    ></textarea>
                </div>

                <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Photos <span class="normal-case text-gray-400 dark:text-gray-500">(first photo is used as the main portrait)</span>
                    </label>
                    <div class="flex flex-wrap gap-3">
                        <div v-for="img in content.grandMaster.images" :key="img.id" class="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 dark:border-[#2e2e3e]">
                            <img :src="img.dataUrl" :alt="img.name" class="h-full w-full object-cover" />
                            <button
                                type="button"
                                @click="removeImage('grandMaster', img.id)"
                                class="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                        <label class="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-amber-400 hover:text-amber-500 dark:border-[#3a3a4e]">
                            <span class="text-xl">+</span>
                            <span class="text-[10px]">Add</span>
                            <input type="file" accept="image/*" multiple class="hidden" @change="addImages($event, 'grandMaster')" />
                        </label>
                    </div>
                </div>
            </div>

            <!-- Core Team -->
            <div v-if="activeTab === 'coreTeam'" class="max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2e2e3e] dark:bg-[#1a1a23]">
                <div>
                    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Intro Text</label>
                    <textarea
                        v-model="content.coreTeam.intro"
                        rows="2"
                        class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100"
                    ></textarea>
                </div>

                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Team Members</label>
                        <button
                            type="button"
                            @click="addMember"
                            class="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-[#2e2e3e] dark:text-gray-300 dark:hover:bg-[#262636]"
                        >
                            + Add Member
                        </button>
                    </div>

                    <p v-if="content.coreTeam.members.length === 0" class="text-sm text-gray-400 dark:text-gray-500">
                        No team members yet. Add one above.
                    </p>

                    <div
                        v-for="member in content.coreTeam.members"
                        :key="member.id"
                        class="flex items-start gap-3 rounded-lg border border-gray-200 p-3 dark:border-[#2e2e3e]"
                    >
                        <label class="relative h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-full border border-gray-200 bg-gray-50 dark:border-[#2e2e3e] dark:bg-[#14141e]">
                            <img v-if="member.photo" :src="member.photo" class="h-full w-full object-cover" />
                            <span v-else class="flex h-full w-full items-center justify-center text-xl">🪷</span>
                            <input type="file" accept="image/*" class="hidden" @change="setMemberPhoto($event, member)" />
                        </label>
                        <div class="flex-1 space-y-2">
                            <input v-model="member.name" type="text" placeholder="Name" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                            <input v-model="member.role" type="text" placeholder="Role" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-[#3a3a4e] dark:bg-[#14141e] dark:text-gray-100" />
                        </div>
                        <button
                            type="button"
                            @click="removeMember(member.id)"
                            class="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 dark:border-[#2e2e3e] dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center gap-3">
                <button
                    type="button"
                    @click="save"
                    class="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
                >
                    Save Changes
                </button>
                <span v-if="savedNotice" class="text-xs font-medium text-emerald-600 dark:text-emerald-400">Saved!</span>
            </div>
        </template>
    </AdminLayout>
</template>
