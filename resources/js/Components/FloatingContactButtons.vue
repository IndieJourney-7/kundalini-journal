<script setup>
import { ref } from 'vue';

const props = defineProps({
    whatsappNumber: {
        type: String,
        default: '917337505390', // digits only, country code first, no + or spaces
    },
    whatsappMessage: {
        type: String,
        default: 'Namaste 🙏 I would like to know more about the Golden Age Community.',
    },
    phoneNumber: {
        type: String,
        default: '+917337505390',
    },
    telegramUrl: {
        // NOTE: placeholder — replace with the community's real Telegram channel/handle.
        type: String,
        default: 'https://t.me/GoldenAgeCommunity',
    },
});

const isOpen = ref(false);

const whatsappHref = () =>
    `https://wa.me/${props.whatsappNumber}?text=${encodeURIComponent(props.whatsappMessage)}`;

const actions = [
    {
        key: 'whatsapp',
        label: 'WhatsApp',
        href: () => whatsappHref(),
        bg: 'bg-[#25D366]',
        ring: 'focus:ring-[#25D366]/50',
    },
    {
        key: 'telegram',
        label: 'Telegram',
        href: () => props.telegramUrl,
        bg: 'bg-[#26A5E4]',
        ring: 'focus:ring-[#26A5E4]/50',
    },
    {
        key: 'phone',
        label: 'Call Us',
        href: () => `tel:${props.phoneNumber}`,
        bg: 'bg-gold-gradient',
        ring: 'focus:ring-gold-500/50',
    },
];
</script>

<template>
    <!-- bottom offset clears the fixed "om-audio-toggle" pill (app.js) that sits at right:20px / bottom:20px -->
    <div class="fixed bottom-24 right-5 z-[1100] flex flex-col items-end gap-3 sm:bottom-28 sm:right-8">
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-2 scale-90"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-2 scale-90"
        >
            <div v-if="isOpen" class="flex flex-col items-end gap-3">
                <a
                    v-for="(action, index) in actions"
                    :key="action.key"
                    :href="action.href()"
                    target="_blank"
                    rel="noopener noreferrer"
                    :style="{ transitionDelay: `${index * 40}ms` }"
                    :class="[action.bg, action.ring]"
                    class="group flex items-center gap-3"
                >
                    <span
                        class="rounded-full bg-[#1b1f38] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100"
                    >
                        {{ action.label }}
                    </span>

                    <span
                        :class="[action.bg, action.ring]"
                        class="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-card transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-4"
                    >
                        <svg v-if="action.key === 'whatsapp'" viewBox="0 0 16 16" class="h-5 w-5" fill="currentColor">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 8.001 0C3.665 0 .162 3.5.16 7.837a7.8 7.8 0 0 0 1.048 3.925L0 16l4.323-1.135a7.86 7.86 0 0 0 3.677.936h.003c4.335 0 7.855-3.5 7.857-7.836a7.79 7.79 0 0 0-2.26-5.639zM8.003 14.375h-.003a6.53 6.53 0 0 1-3.328-.911l-.239-.142-2.474.649.661-2.414-.156-.248a6.53 6.53 0 0 1-1.001-3.483c.001-3.606 2.935-6.54 6.542-6.54a6.5 6.5 0 0 1 4.63 1.92 6.5 6.5 0 0 1 1.916 4.622c-.001 3.606-2.935 6.54-6.548 6.54zm3.588-4.896c-.196-.099-1.161-.573-1.341-.639-.18-.066-.312-.099-.443.099-.132.198-.508.639-.623.769-.115.132-.229.148-.425.05-.196-.098-.827-.305-1.575-.972-.582-.52-.975-1.162-1.089-1.36-.115-.198-.012-.305.086-.403.089-.088.196-.229.294-.344.098-.115.131-.198.196-.33.065-.132.033-.247-.016-.345-.05-.099-.443-1.067-.607-1.462-.16-.384-.323-.332-.443-.338l-.377-.007a.72.72 0 0 0-.523.246c-.18.198-.687.671-.687 1.638s.703 1.9.8 2.031c.099.132 1.394 2.13 3.379 2.988.472.204.84.326 1.127.417.474.15.905.13 1.246.078.38-.056 1.161-.475 1.325-.933.163-.457.163-.85.114-.932s-.18-.132-.376-.231z"/>
                        </svg>
                        <svg v-else-if="action.key === 'telegram'" viewBox="0 0 16 16" class="h-5 w-5" fill="currentColor">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 1.994-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.83-.193.183-.33.314-.358.344a3.24 3.24 0 0 1-.238.24c-.194.187-.339.326.008.554.339.226.583.404.827.575.245.174.489.348.774.548.24.166.435.3.61.412.27.176.508.31.796.297.244-.011.396-.24.526-.463l.204-.36c.187-.33.354-.65.483-.918l.001-.002.007-.014c.222-.462.408-.983.472-1.37.077-.463-.056-.788-.198-.96-.171-.208-.377-.267-.556-.267a1.5 1.5 0 0 0-.393.062z"/>
                        </svg>
                        <svg v-else viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor">
                            <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-.464 1.435l-1.11 1.01a11.042 11.042 0 0 0 5.516 5.516l1.01-1.11a1.5 1.5 0 0 1 1.435-.464l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </a>
            </div>
        </Transition>

        <button
            type="button"
            :aria-expanded="isOpen"
            aria-label="Toggle contact options"
            class="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-[#120022] shadow-gold-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gold-500/40"
            :class="!isOpen && 'animate-glow'"
            @click="isOpen = !isOpen"
        >
            <svg v-if="!isOpen" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <svg v-else viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
            </svg>
        </button>
    </div>
</template>
