<script setup>
defineProps({
    as: {
        type: String,
        default: 'h2',
    },
    size: {
        type: String,
        default: 'text-2xl',
    },
});
</script>

<template>
    <component
        :is="as"
        :class="`${size} font-heading font-bold bg-gold-shine bg-[length:200%_auto] animate-gold-shine bg-clip-text text-transparent`"
    >
        <slot />
    </component>
</template>
