<script setup>
defineProps({
    compact: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <img
        src="/images/kundalini-logo.jpeg"
        alt="Golden Age logo"
        class="h-full w-full object-cover"
        :class="compact ? 'rounded-full' : 'rounded-2xl'"
    />
</template>
