<script setup>
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    href: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: 'button',
    },
    variant: {
        type: String,
        default: 'gold', // gold, pink, outline-gold, outline-pink, ghost
    },
    size: {
        type: String,
        default: 'md', // sm, md, lg
    },
    method: {
        type: String,
        default: 'get',
    },
    as: {
        type: String,
        default: 'button',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const variantClasses = {
    gold: 'bg-gold-gradient text-[#120022] font-semibold hover:shadow-gold transition-all duration-300',
    pink: 'bg-pink-gradient text-[#2c0424] font-semibold hover:shadow-pink transition-all duration-300',
    'outline-gold': 'border border-gold-500/70 text-gold-700 hover:bg-gold-500/10 transition-all duration-300',
    'outline-pink': 'border border-pink-300/70 text-pink-700 hover:bg-pink-500/10 transition-all duration-300',
    ghost: 'text-[#6b5c69] hover:bg-gold-500/10 transition-all duration-300',
};

const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-8 py-3.5 text-base rounded-xl',
};
</script>

<template>
    <Link
        v-if="href"
        :href="href"
        :method="method"
        :as="as"
        :class="[variantClasses[variant], sizeClasses[size], disabled ? 'pointer-events-none opacity-50' : '', 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:ring-offset-white']"
    >
        <slot />
    </Link>
    <button
        v-else
        :type="type"
        :disabled="disabled"
        :class="[variantClasses[variant], sizeClasses[size], 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 focus:ring-offset-white']"
    >
        <slot />
    </button>
</template>
