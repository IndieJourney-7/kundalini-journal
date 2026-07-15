<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import WriterLayout from '@/Layouts/WriterLayout.vue';
import GoldShiningText from '@/Components/GoldShiningText.vue';
import { getActiveWriter, updateWriterProfile, slugify } from '@/writerSession';

const writer = ref(null);
const saved = ref(false);
const errorMsg = ref('');

const form = reactive({
    name: '',
    avatar: '🪷',
    tagline: '',
    bio: '',
    journeyStartDate: '',
    mantra: '',
    location: '',
});

const avatarOptions = ['🪷', '🕉️', '✨', '🌞', '🌙', '🔥', '🌊', '🌿', '🦚', '🙏'];

onMounted(() => {
    const active = getActiveWriter();
    if (!active) return;
    writer.value = active;
    Object.assign(form, {
        name: active.name || '',
        avatar: active.avatar || '🪷',
        tagline: active.tagline || '',
        bio: active.bio || '',
        journeyStartDate: active.journeyStartDate || '',
        mantra: active.mantra || '',
        location: active.location || '',
    });
});

const save = () => {
    errorMsg.value = '';
    if (!form.name.trim()) {
        errorMsg.value = 'Please enter your name.';
        return;
    }

    const updated = updateWriterProfile(writer.value.code, { ...form });
    writer.value = updated;
    saved.value = true;
    setTimeout(() => (saved.value = false), 2500);
};
</script>

<template>
    <Head title="My Profile" />

    <WriterLayout>
        <template #header>
            <GoldShiningText as="h2" size="text-2xl">My Profile</GoldShiningText>
        </template>

        <div v-if="writer" class="py-8">
            <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                <div class="rounded-2xl border border-gold-500/20 bg-sacred-card/50 backdrop-blur-sm p-6 sm:p-8">
                    <div v-if="saved" class="mb-5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                        Profile saved.
                    </div>

                    <a
                        :href="'/journey/' + slugify(form.name || writer.code)"
                        target="_blank"
                        class="mb-6 inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300"
                    >
                        View my public journey page &rarr;
                    </a>

                    <form @submit.prevent="save" class="space-y-5">
                        <div class="flex justify-center gap-2">
                            <button
                                v-for="option in avatarOptions"
                                :key="option"
                                type="button"
                                @click="form.avatar = option"
                                :class="form.avatar === option ? 'border-gold-500 bg-gold-500/10' : 'border-transparent hover:border-gold-500/30'"
                                class="flex h-11 w-11 items-center justify-center rounded-full border-2 text-xl transition-all"
                            >
                                {{ option }}
                            </button>
                        </div>

                        <div>
                            <label class="mb-1.5 block text-xs font-medium text-gray-400">Display Name</label>
                            <input v-model="form.name" type="text" class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
                        </div>

                        <div>
                            <label class="mb-1.5 block text-xs font-medium text-gray-400">Tagline</label>
                            <input v-model="form.tagline" type="text" placeholder="e.g., Awakening through Grace" class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
                        </div>

                        <div>
                            <label class="mb-1.5 block text-xs font-medium text-gray-400">Bio</label>
                            <textarea v-model="form.bio" rows="4" placeholder="Your spiritual background and journey..." class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20 resize-none"></textarea>
                        </div>

                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label class="mb-1.5 block text-xs font-medium text-gray-400">Journey Start Date</label>
                                <input v-model="form.journeyStartDate" type="date" class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
                            </div>
                            <div>
                                <label class="mb-1.5 block text-xs font-medium text-gray-400">Favourite Mantra</label>
                                <input v-model="form.mantra" type="text" placeholder="Om Namah Shivaya" class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
                            </div>
                        </div>

                        <div>
                            <label class="mb-1.5 block text-xs font-medium text-gray-400">
                                Location <span class="normal-case text-gray-600">(optional, shown publicly if filled)</span>
                            </label>
                            <input v-model="form.location" type="text" placeholder="City, Country" class="w-full rounded-xl border border-gold-500/20 bg-sacred-dark/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
                        </div>

                        <p v-if="errorMsg" class="text-sm text-pink-400">{{ errorMsg }}</p>

                        <button type="submit" class="w-full rounded-xl bg-gold-gradient px-6 py-3 text-sm font-semibold text-[#2f2418] shadow-gold transition-all hover:brightness-105">
                            Save Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </WriterLayout>
</template>
