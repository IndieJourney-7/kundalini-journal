<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Number],
        required: true,
    },
    icon: {
        type: String,
        default: '',
    },
    trend: {
        type: String,
        default: '', // up, down
    },
    trendValue: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        default: 'gold', // gold, pink, purple
    },
});

const colorAccents = {
    gold: {
        bg: 'from-gold-500/20 to-gold-500/5',
        border: 'border-gold-500/30',
        text: 'text-gold-400',
        iconBg: 'bg-gold-500/20',
    },
    pink: {
        bg: 'from-pink-500/20 to-pink-500/5',
        border: 'border-pink-500/30',
        text: 'text-pink-300',
        iconBg: 'bg-pink-500/20',
    },
    purple: {
        bg: 'from-purple-500/20 to-purple-500/5',
        border: 'border-purple-500/30',
        text: 'text-purple-300',
        iconBg: 'bg-purple-500/20',
    },
};
</script>

<template>
    <div
        :class="`relative overflow-hidden rounded-2xl border ${colorAccents[color].border} bg-gradient-to-br ${colorAccents[color].bg} bg-sacred-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-gold hover:scale-[1.02] group`"
    >
        <div class="flex items-start justify-between">
            <div class="space-y-2">
                <p class="text-sm font-medium text-gray-400">{{ title }}</p>
                <p class="text-3xl font-bold text-white font-heading">{{ value }}</p>
                <div v-if="trend" class="flex items-center gap-1 text-xs">
                    <span :class="trend === 'up' ? 'text-green-400' : 'text-red-400'">
                        {{ trend === 'up' ? '↑' : '↓' }}
                    </span>
                    <span class="text-gray-500">{{ trendValue }}</span>
                </div>
            </div>
            <div
                v-if="icon"
                :class="`flex h-12 w-12 items-center justify-center rounded-xl ${colorAccents[color].iconBg} ${colorAccents[color].text} text-xl group-hover:scale-110 transition-transform duration-300`"
                v-html="icon"
            >
            </div>
        </div>
        <!-- Animated glow line -->
        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
</template>
