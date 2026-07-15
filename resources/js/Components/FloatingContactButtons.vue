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
    youtubeUrl: {
        type: String,
        default: 'https://www.youtube.com/@GoldenAgeGurus',
    },
    instagramUrl: {
        // NOTE: placeholder — replace with the community's real Instagram handle.
        type: String,
        default: 'https://www.instagram.com/goldenagecommunity',
    },
    facebookUrl: {
        // NOTE: placeholder — replace with the community's real Facebook page.
        type: String,
        default: 'https://www.facebook.com/goldenagecommunity',
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
        key: 'instagram',
        label: 'Instagram',
        href: () => props.instagramUrl,
        bg: 'bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)]',
        ring: 'focus:ring-[#ee2a7b]/50',
    },
    {
        key: 'facebook',
        label: 'Facebook',
        href: () => props.facebookUrl,
        bg: 'bg-[#1877F2]',
        ring: 'focus:ring-[#1877F2]/50',
    },
    {
        key: 'youtube',
        label: 'YouTube',
        href: () => props.youtubeUrl,
        bg: 'bg-[#FF0000]',
        ring: 'focus:ring-[#FF0000]/50',
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
                        <svg v-else-if="action.key === 'instagram'" viewBox="0 0 16 16" class="h-5 w-5" fill="currentColor">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.719-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                        </svg>
                        <svg v-else-if="action.key === 'facebook'" viewBox="0 0 16 16" class="h-5 w-5" fill="currentColor">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg>
                        <svg v-else-if="action.key === 'youtube'" viewBox="0 0 16 16" class="h-5 w-5" fill="currentColor">
                            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408z"/>
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
