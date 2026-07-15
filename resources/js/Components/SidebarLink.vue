<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    href: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: '',
    },
});

const classes = computed(() => {
    return props.active
        ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-600/10 dark:text-amber-400 dark:ring-amber-400/30'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-[#262636]';
});
</script>

<template>
    <Link
        :href="href"
        :class="[classes, 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all']"
    >
        <span v-if="icon" class="flex-shrink-0 text-base" v-html="icon" aria-hidden="true"></span>
        <span class="truncate">
            <slot />
        </span>
    </Link>
</template>
