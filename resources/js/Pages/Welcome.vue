<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import FloatingContactButtons from '@/Components/FloatingContactButtons.vue';
import { getActiveQuote } from '@/quotes';

const activeQuote = ref(null);
const activeTranslationIndex = ref(0);
let quoteSlideTimer = null;
const mobileMenuOpen = ref(false);
const openDropdown = ref(null);
const desktopNavRef = ref(null);
const page = usePage();

watch(() => page.url, () => {
    mobileMenuOpen.value = false;
    openDropdown.value = null;
});

const heroWords = ['Awaken.', 'Align.', 'Ascend.'];
const displayedHeroWords = ref(['', '', '']);
const activeHeroLine = ref(0);
const heroAnimationFinished = ref(false);

const heroTimers = [];

const scheduleHeroTyping = () => {
    displayedHeroWords.value = ['', '', ''];
    activeHeroLine.value = 0;
    heroAnimationFinished.value = false;

    let totalDelay = 180;

    heroWords.forEach((word, lineIndex) => {
        const startTimeout = window.setTimeout(() => {
            activeHeroLine.value = lineIndex;
        }, totalDelay);

        heroTimers.push(startTimeout);

        word.split('').forEach((character, charIndex) => {
            const charTimeout = window.setTimeout(() => {
                displayedHeroWords.value[lineIndex] += character;

                if (lineIndex === heroWords.length - 1 && charIndex === word.length - 1) {
                    heroAnimationFinished.value = true;
                }
            }, totalDelay + (charIndex + 1) * 95);

            heroTimers.push(charTimeout);
        });

        totalDelay += word.length * 95 + 260;
    });
};

onMounted(() => {
    scheduleHeroTyping();
    activeQuote.value = getActiveQuote();

    if (activeQuote.value?.translations?.length > 1) {
        quoteSlideTimer = window.setInterval(() => {
            activeTranslationIndex.value =
                (activeTranslationIndex.value + 1) % activeQuote.value.translations.length;
        }, 3800);
    }

    window.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
    heroTimers.forEach((timer) => window.clearTimeout(timer));
    if (quoteSlideTimer) {
        window.clearInterval(quoteSlideTimer);
    }
    window.removeEventListener('click', handleOutsideClick);
});

const currentQuoteTranslation = computed(() => {
    if (!activeQuote.value?.translations?.length) {
        return null;
    }
    return activeQuote.value.translations[activeTranslationIndex.value];
});

const navLinks = [
    { key: 'home', label: 'Home', href: '/' },
    {
        key: 'about',
        label: 'About',
        href: '/about',
        children: [
            { key: 'about', label: 'About GASM', href: '/about' },
            { key: 'grand-master', label: 'About Grand Master Dr Hari Krishna', href: '/about/grand-master' },
            { key: 'core-team', label: 'Core Team', href: '/about/core-team' },
        ],
    },
    {
        key: 'meditation',
        label: 'Meditation',
        href: '/meditation',
        children: [
            { key: 'golden-rules', label: 'Golden Rules', href: '/golden-rules' },
        ],
    },
    { key: 'events', label: 'Events', href: '/events' },
    { key: 'journals', label: 'Journals', href: '/community' },
    { key: 'contact', label: 'Contact', href: '/contact' },
];

const toggleDropdown = (key) => {
    openDropdown.value = openDropdown.value === key ? null : key;
};

const handleOutsideClick = (event) => {
    if (desktopNavRef.value && !desktopNavRef.value.contains(event.target)) {
        openDropdown.value = null;
    }
};

const stats = [
    { value: '108+', label: 'Awakening Journeys' },
    { value: '5,600+', label: 'Meditation Entries' },
    { value: '24+', label: 'Countries' },
    { value: 'Countless', label: 'Lives Transformed' },
];

const footerGroups = [
    {
        title: 'Quick Links',
        items: [
            { label: 'Home', href: '/' },
            { label: 'About GASM', href: '/about' },
            { label: 'Meditation', href: '/meditation' },
            { label: 'Events', href: '/events' },
            { label: 'Journals', href: '/community' },
            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Resources',
        items: [
            { label: 'Golden Rules', href: '/golden-rules' },
            { label: 'Knowledge', href: '/knowledge' },
            { label: 'Blog', href: '/blog' },
            { label: 'FAQ', href: '/contact' },
        ],
    },
    {
        title: 'About',
        items: [
            { label: 'About GASM', href: '/about' },
            { label: 'Grand Master Dr Hari Krishna', href: '/about/grand-master' },
            { label: 'Core Team', href: '/about/core-team' },
        ],
    },
    {
        title: 'Support',
        items: [
            { label: 'Contact', href: '/contact' },
            { label: 'Donate Now', href: '/donate' },
            { label: 'Privacy Policy', href: '/contact' },
            { label: 'Terms of Use', href: '/contact' },
        ],
    },
];

const socialLinks = [
    { key: 'youtube', label: 'YT', href: 'https://www.youtube.com/@GoldenAgeGurus' },
    { key: 'facebook', label: 'f', href: 'https://www.facebook.com/goldenagecommunity' },
    { key: 'instagram', label: 'IG', href: 'https://www.instagram.com/goldenagecommunity' },
    { key: 'twitter', label: 'X', href: 'https://twitter.com/goldenagecommunity' },
];
</script>

<template>
    <Head title="Golden Age" />

    <main class="site-wrap">
        <header class="top-nav">
            <div class="top-nav-inner">
                <Link href="/" class="brand" aria-label="Golden Age Community">
                    <div class="brand-logo">
                        <ApplicationLogo compact class="h-full w-full" />
                    </div>
                </Link>

                <div ref="desktopNavRef" class="top-links">
                    <template v-for="link in navLinks" :key="link.key">
                        <div v-if="link.children" class="nav-dropdown">
                            <button
                                type="button"
                                class="nav-dropdown-toggle"
                                :class="{ active: link.key === 'home' }"
                                @click="toggleDropdown(link.key)"
                                :aria-expanded="openDropdown === link.key"
                            >
                                {{ link.label }}
                                <svg class="nav-caret" :class="{ open: openDropdown === link.key }" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div v-if="openDropdown === link.key" class="nav-dropdown-panel">
                                <Link
                                    v-for="child in link.children"
                                    :key="child.key"
                                    :href="child.href"
                                    @click="openDropdown = null"
                                >
                                    {{ child.label }}
                                </Link>
                            </div>
                        </div>
                        <Link v-else :href="link.href" :class="{ active: link.key === 'home' }">
                            {{ link.label }}
                        </Link>
                    </template>
                    <Link href="/journal" class="login-btn">Login / Join</Link>
                </div>

                <div class="nav-mobile-actions">
                    <Link href="/journal" class="login-btn login-btn-mobile">Login / Join</Link>
                    <button
                        type="button"
                        class="nav-toggle"
                        @click="mobileMenuOpen = !mobileMenuOpen"
                        :aria-expanded="mobileMenuOpen"
                        aria-label="Toggle menu"
                    >
                        <svg v-if="!mobileMenuOpen" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div v-if="mobileMenuOpen" class="mobile-menu">
                <template v-for="link in navLinks" :key="'m-' + link.key">
                    <Link
                        :href="link.href"
                        :class="{ active: link.key === 'home' }"
                        @click="mobileMenuOpen = false"
                    >
                        {{ link.label }}
                    </Link>
                    <div v-if="link.children" class="mobile-submenu">
                        <Link
                            v-for="child in link.children"
                            :key="'m-' + child.key"
                            :href="child.href"
                            @click="mobileMenuOpen = false"
                        >
                            {{ child.label }}
                        </Link>
                    </div>
                </template>
            </div>
        </header>

        <div v-if="activeQuote" class="quote-banner">
            <div v-if="currentQuoteTranslation" class="quote-banner-slider">
                <Transition name="quote-slide" mode="out-in">
                    <div :key="currentQuoteTranslation.lang">
                        <p class="quote-banner-lang">{{ currentQuoteTranslation.lang }}</p>
                        <p class="quote-banner-text">&ldquo;{{ currentQuoteTranslation.text }}&rdquo;</p>
                        <p v-if="activeQuote.author" class="quote-banner-author">— {{ activeQuote.author }}</p>
                    </div>
                </Transition>
            </div>
            <template v-else>
                <p class="quote-banner-text">&ldquo;{{ activeQuote.text }}&rdquo;</p>
                <p v-if="activeQuote.author" class="quote-banner-author">— {{ activeQuote.author }}</p>
            </template>
        </div>

        <section class="hero-wrap">
            <img
                src="/images/landingpage.png"
                alt="Kundalini Shakti landing"
                class="hero-image"
            />

            <div class="hero-overlay">
                <p class="hero-kicker">KUNDALINI SHAKTI</p>
                <h1 class="hero-title">
                    <span class="hero-line">
                        {{ displayedHeroWords[0] }}
                        <span v-if="activeHeroLine === 0 && !heroAnimationFinished" class="hero-caret" aria-hidden="true"></span>
                    </span>
                    <span class="hero-line">
                        {{ displayedHeroWords[1] }}
                        <span v-if="activeHeroLine === 1 && !heroAnimationFinished" class="hero-caret" aria-hidden="true"></span>
                    </span>
                    <span class="hero-line hero-line-accent">
                        {{ displayedHeroWords[2] }}
                        <span v-if="activeHeroLine === 2 && !heroAnimationFinished" class="hero-caret" aria-hidden="true"></span>
                    </span>
                </h1>

                <p class="hero-tagline">
                    A sacred space for Kundalini awakening,<br />
                    conscious living and inner transformation.
                </p>

                <div class="action-row">
                    <Link href="/journal" class="cta-primary">Begin Your Journey <span aria-hidden="true">→</span></Link>
                    <Link href="/community" class="cta-outline">Explore Journals <span aria-hidden="true">→</span></Link>
                </div>

                <p class="join-text">Join 108+ Seekers on the path</p>
            </div>

            <p class="scroll-note">Scroll to Awaken</p>
        </section>

        <section class="stats-wrap">
            <article v-for="item in stats" :key="item.label" class="stat-card">
                <h3>{{ item.value }}</h3>
                <p>{{ item.label }}</p>
            </article>
        </section>

        <section class="movement-wrap">
            <h2 class="movement-title">Golden Age Spiritual Movement</h2>

            <div class="movement-grid">
                <div class="movement-col">
                    <p class="movement-col-label">Our Mission</p>
                    <p class="movement-col-text">
                        Inspiring humanity to awaken to its true nature through meditation, wisdom, and self-discovery.
                        We are a free spiritual movement dedicated to relieving suffering, nurturing inner peace, and
                        fostering compassion. Together, we are creating a Golden Age of love, harmony, and conscious living.
                    </p>
                </div>
                <div class="movement-col">
                    <p class="movement-col-label">About Kundalini Shakti</p>
                    <p class="movement-col-text">
                        Kundalini Shakti is the dormant, divine energy resting within every being. Through sacred practice,
                        breathwork, and deep meditation, we guide seekers to awaken this energy and align body, mind, and
                        spirit — a sacred space for Kundalini awakening, conscious living, and inner transformation.
                    </p>
                </div>
            </div>
        </section>

        <section id="about" class="section-wrap">
            <p class="section-kicker">THE PATH WITHIN</p>
            <h2 class="section-title">Your Awakening Journey</h2>
            <p class="section-subtitle">From inner silence to infinite consciousness.</p>

            <div class="journey-grid">
                <article class="journey-card">
                    <h3>1. Awaken</h3>
                    <p>Become aware of your true self.</p>
                </article>
                <article class="journey-card">
                    <h3>2. Align</h3>
                    <p>Align body, mind, and energy.</p>
                </article>
                <article class="journey-card">
                    <h3>3. Transform</h3>
                    <p>Release, heal and transmute.</p>
                </article>
                <article class="journey-card">
                    <h3>4. Ascend</h3>
                    <p>Raise your vibration and consciousness.</p>
                </article>
                <article class="journey-card">
                    <h3>5. Live Infinity</h3>
                    <p>Experience oneness with the universe.</p>
                </article>
            </div>
        </section>

        <section id="blog" class="section-wrap section-stories">
            <p class="section-kicker">SACRED JOURNEYS</p>
            <h2 class="section-title">Real Stories. Real Transformations.</h2>
            <p class="section-subtitle">Read experiences from practitioners around the world.</p>

            <div class="stories-grid">
                <article class="story-card">
                    <img src="/images/meditation.png" alt="The Silence Within" />
                    <div>
                        <h3>The Silence Within</h3>
                        <p>A journey from overthinking to inner stillness.</p>
                    </div>
                </article>
                <article class="story-card">
                    <img src="/images/kundalini-hero.png" alt="Rising of the Energy" />
                    <div>
                        <h3>Rising of the Energy</h3>
                        <p>Experiences of Kundalini rising and energy shifts.</p>
                    </div>
                </article>
                <article class="story-card">
                    <img src="/images/meditation.png" alt="From Fear to Freedom" />
                    <div>
                        <h3>From Fear to Freedom</h3>
                        <p>A transformation through awareness and devotion.</p>
                    </div>
                </article>
                <article class="story-card">
                    <img src="/images/kundalini-hero.png" alt="Union with the Divine" />
                    <div>
                        <h3>Union with the Divine</h3>
                        <p>Moments of oneness, bliss, and infinite love.</p>
                    </div>
                </article>
            </div>
        </section>

        <section id="meditation" class="infinity-strip">
            <div class="infinity-strip-inner">
                <div>
                    <p class="section-kicker light">INFINITE POSSIBILITIES</p>
                    <h2>You are not here to find yourself. You are here to remember infinity.</h2>
                    <Link href="/meditation" class="strip-btn">Explore Meditation</Link>
                </div>
            </div>
        </section>

        <section id="events" class="section-wrap">
            <p class="section-kicker">UPCOMING EVENTS</p>
            <h2 class="section-title">Join Live Sessions & Retreats</h2>
            <div class="events-grid">
                <article class="event-card">
                    <h3>Online Meditation Session</h3>
                    <p>7:00 PM - 8:30 PM IST</p>
                    <p>Online (Live)</p>
                </article>
                <article class="event-card">
                    <h3>Kundalini Awakening Workshop</h3>
                    <p>10:00 AM - 5:00 PM IST</p>
                    <p>Bangalore, India</p>
                </article>
                <article class="event-card">
                    <h3>7 Day Silent Retreat</h3>
                    <p>Aug 15 - Aug 21, 2026</p>
                    <p>Rishikesh, India</p>
                </article>
            </div>
        </section>

        <footer id="contact" class="site-footer">
            <div class="footer-shell">
                <div class="footer-grid">
                    <div class="footer-brand-block">
                        <div class="footer-brand-row">
                            <div class="footer-logo-wrap">
                                <ApplicationLogo compact class="h-full w-full" />
                            </div>
                            <div>
                                <p class="footer-brand">GASM Social Connections</p>
                            </div>
                        </div>
                        <p class="footer-text">Awaken, Align, Ascend.</p>

                        <div class="footer-socials">
                            <a
                                v-for="social in socialLinks"
                                :key="social.key"
                                :href="social.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                :aria-label="social.key"
                                class="footer-social-icon"
                            >
                                {{ social.label }}
                            </a>
                        </div>
                    </div>

                    <div v-for="group in footerGroups" :key="group.title" class="footer-column">
                        <p class="footer-column-title">{{ group.title }}</p>
                        <div class="footer-column-links">
                            <Link v-for="item in group.items" :key="`${group.title}-${item.label}`" :href="item.href">{{ item.label }}</Link>
                        </div>
                    </div>

                    <div class="footer-subscribe">
                        <p class="footer-column-title">Support Our Mission</p>
                        <p class="footer-subscribe-text">Your generosity keeps meditation, teachings, and community programs free for every seeker.</p>

                        <Link href="/donate" class="footer-donate-btn">Donate Now</Link>
                    </div>
                </div>

                <div class="footer-bottom-row">
                    <p>© 2026 Golden Age Community. All rights reserved.</p>
                    <p>Designed with love for a conscious world.</p>
                </div>
            </div>
        </footer>

        <FloatingContactButtons />
    </main>
</template>

<style scoped>
.site-wrap {
    min-height: 100vh;
    background: #faf8f3;
    color: #22232c;
}

.top-nav {
    position: relative;
    z-index: 20;
    background: rgba(250, 248, 243, 0.96);
    border-bottom: 1px solid rgba(201, 162, 39, 0.18);
}

.top-nav-inner {
    height: 76px;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: #23242f;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.8rem;
}

.brand-logo {
    width: 46px;
    height: 46px;
    border-radius: 999px;
    overflow: hidden;
    border: 1px solid rgba(201, 162, 39, 0.45);
    background: #fff;
    padding: 2px;
}

.top-links {
    display: inline-flex;
    align-items: center;
    gap: 12px;
}

.top-links a {
    text-decoration: none;
    color: #3f4258;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 5px 8px;
    border-radius: 999px;
    position: relative;
}

.top-links a.active {
    color: #c28e2f;
}

.top-links a.active::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #c28e2f;
    transform: translateX(-50%);
}

.nav-dropdown {
    position: relative;
}

.nav-dropdown-toggle {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: none;
    color: #3f4258;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    padding: 5px 8px;
    border-radius: 999px;
}

.nav-dropdown-toggle.active,
.nav-dropdown-toggle:hover {
    color: #c28e2f;
}

.nav-caret {
    transition: transform 160ms ease;
}

.nav-caret.open {
    transform: rotate(180deg);
}

.nav-dropdown-panel {
    position: absolute;
    left: 0;
    top: calc(100% + 8px);
    z-index: 30;
    width: 260px;
    background: #fff;
    border: 1px solid rgba(201, 162, 39, 0.2);
    border-radius: 12px;
    box-shadow: 0 12px 30px rgba(30, 25, 10, 0.14);
    padding: 8px;
    display: flex;
    flex-direction: column;
}

.nav-dropdown-panel a {
    text-decoration: none;
    color: #3f4258;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 9px 12px;
    border-radius: 8px;
}

.nav-dropdown-panel a:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #c28e2f;
}

.mobile-submenu {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 0 0 4px 12px;
    padding-left: 10px;
    border-left: 1px solid rgba(201, 162, 39, 0.25);
}

.mobile-submenu a {
    text-decoration: none;
    color: #575c74;
    font-size: 0.84rem;
    font-weight: 500;
    padding: 8px;
    border-radius: 8px;
}

.mobile-submenu a:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #c28e2f;
}

.login-btn {
    background: #1b1f38;
    color: #fff !important;
    border-radius: 10px;
    padding: 9px 13px;
}

.nav-mobile-actions {
    display: none;
    align-items: center;
    gap: 10px;
}

.login-btn-mobile {
    padding: 8px 12px;
    font-size: 0.78rem;
}

.nav-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #23242f;
    cursor: pointer;
}

.nav-toggle:hover {
    background: rgba(0, 0, 0, 0.05);
}

.mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 20px 16px;
    border-top: 1px solid rgba(201, 162, 39, 0.18);
    background: #faf8f3;
}

.mobile-menu a {
    text-decoration: none;
    color: #3f4258;
    font-size: 0.88rem;
    font-weight: 600;
    padding: 10px 8px;
    border-radius: 8px;
}

.mobile-menu a.active {
    color: #c28e2f;
    background: rgba(201, 162, 39, 0.1);
}

.quote-banner {
    position: relative;
    z-index: 15;
    background: #1b1f38;
    border-bottom: 1px solid rgba(201, 162, 39, 0.35);
    padding: 14px 20px;
    text-align: center;
}

.quote-banner-text {
    margin: 0;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: clamp(1.05rem, 2.4vw, 1.35rem);
    color: #f3e0a4;
    letter-spacing: 0.01em;
}

.quote-banner-author {
    margin: 4px 0 0;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #c3c8dd;
}

.quote-banner-slider {
    overflow: hidden;
}

.quote-banner-lang {
    margin: 0 0 2px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c28e2f;
}

.quote-slide-enter-active,
.quote-slide-leave-active {
    transition: opacity 380ms ease, transform 380ms ease;
}

.quote-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.quote-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.hero-wrap {
    position: relative;
    width: 100%;
    height: min(72vh, 700px);
    overflow: hidden;
    border-bottom: 1px solid rgba(201, 162, 39, 0.16);
}

.hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
}

.hero-overlay {
    position: absolute;
    left: clamp(20px, 8vw, 130px);
    top: clamp(24px, 8vh, 88px);
    max-width: 520px;
    z-index: 2;
    padding-right: 14px;
}

.hero-kicker {
    margin: 0;
    font-size: 0.85rem;
    letter-spacing: 0.18em;
    color: #c28e2f;
    font-weight: 700;
}

.hero-title {
    margin: 12px 0 0;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.7rem, 6vw, 5rem);
    line-height: 0.93;
    color: #1f2235;
}

.hero-line {
    display: block;
    min-height: 0.98em;
}

.hero-line-accent {
    color: #c28e2f;
}

.hero-caret {
    display: inline-block;
    width: 0.06em;
    height: 0.88em;
    margin-left: 0.05em;
    background: currentColor;
    vertical-align: -0.08em;
    animation: heroCaretBlink 0.9s steps(1) infinite;
}

.hero-tagline {
    margin: 18px 0 0;
    color: #4e5265;
    line-height: 1.65;
    font-size: 1.05rem;
}

@keyframes heroCaretBlink {
    0%,
    45% {
        opacity: 1;
    }

    46%,
    100% {
        opacity: 0;
    }
}

.action-row {
    margin-top: 22px;
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
}

.cta-primary,
.cta-outline {
    text-decoration: none;
    border-radius: 12px;
    padding: 12px 18px;
    font-weight: 600;
    font-size: 0.95rem;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.cta-primary {
    background: #1b1f38;
    color: #fff;
    border: 1px solid #1b1f38;
}

.cta-outline {
    border: 1px solid rgba(201, 162, 39, 0.62);
    color: #463b26;
}

.join-text {
    margin: 20px 0 0;
    color: #575b70;
    font-size: 0.95rem;
    font-weight: 500;
}

.scroll-note {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.72);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.stats-wrap {
    max-width: 1120px;
    margin: -54px auto 0;
    padding: 0 16px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
    position: relative;
    z-index: 2;
    background: #fff;
    border: 1px solid rgba(201, 162, 39, 0.16);
    border-radius: 16px;
    box-shadow: 0 12px 22px rgba(67, 57, 36, 0.08);
}

.stat-card {
    border-right: 1px solid rgba(201, 162, 39, 0.14);
    padding: 22px 14px;
    text-align: center;
}

.stat-card:last-child {
    border-right: none;
}

.stat-card h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #242945;
}

.stat-card p {
    margin: 5px 0 0;
    font-size: 0.88rem;
    color: #6f7080;
}

.movement-wrap {
    max-width: 1120px;
    margin: 60px auto 0;
    padding: 0 16px;
}

.movement-title {
    margin: 0;
    text-align: center;
    font-family: 'Playfair Display', 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 800;
    font-size: clamp(2.2rem, 5.4vw, 4rem);
    color: #1d2240;
    letter-spacing: 0.01em;
}

.movement-grid {
    margin-top: 34px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
}

.movement-col {
    background: #fff;
    border: 1px solid rgba(201, 162, 39, 0.18);
    border-radius: 16px;
    padding: 26px 24px;
}

.movement-col-label {
    margin: 0 0 10px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c28e2f;
}

.movement-col-text {
    margin: 0;
    color: #4e5265;
    line-height: 1.75;
    font-size: 1.02rem;
}

@media (max-width: 900px) {
    .movement-grid {
        grid-template-columns: 1fr;
    }
}

.section-wrap {
    max-width: 1120px;
    margin: 54px auto 0;
    padding: 0 16px;
}

.section-kicker {
    margin: 0;
    text-align: center;
    font-size: 0.72rem;
    letter-spacing: 0.24em;
    color: #c28e2f;
    font-weight: 700;
}

.section-title {
    margin: 10px 0 0;
    text-align: center;
    color: #1d2240;
    font-size: clamp(2rem, 4vw, 3rem);
    font-family: 'Cormorant Garamond', serif;
}

.section-subtitle {
    margin: 8px 0 0;
    text-align: center;
    color: #626781;
}

.journey-grid {
    margin-top: 28px;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
}

.journey-card {
    background: #fff;
    border: 1px solid rgba(201, 162, 39, 0.16);
    border-radius: 14px;
    padding: 14px;
    text-align: center;
}

.journey-card h3 {
    margin: 0;
    color: #1f2442;
    font-size: 1.05rem;
}

.journey-card p {
    margin: 6px 0 0;
    color: #646a82;
    font-size: 0.9rem;
}

.section-stories {
    margin-top: 64px;
}

.stories-grid {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
}

.story-card {
    background: #fff;
    border: 1px solid rgba(201, 162, 39, 0.16);
    border-radius: 14px;
    overflow: hidden;
}

.story-card img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    display: block;
}

.story-card div {
    padding: 12px;
}

.story-card h3 {
    margin: 0;
    color: #1f2442;
    font-size: 1.06rem;
}

.story-card p {
    margin: 6px 0 0;
    color: #646a82;
    font-size: 0.88rem;
    line-height: 1.5;
}

.infinity-strip {
    margin-top: 64px;
    background: linear-gradient(100deg, #131936 0%, #25295a 54%, #2f2458 100%);
    color: #fff;
}

.infinity-strip-inner {
    max-width: 1120px;
    margin: 0 auto;
    padding: 46px 16px;
}

.section-kicker.light {
    text-align: left;
    color: #e7c779;
}

.infinity-strip h2 {
    margin: 10px 0 0;
    max-width: 660px;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.05;
}

.strip-btn {
    margin-top: 16px;
    display: inline-block;
    text-decoration: none;
    border: 1px solid rgba(201, 162, 39, 0.7);
    color: #f3d898;
    border-radius: 10px;
    padding: 10px 14px;
    font-weight: 600;
}

.events-grid {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
}

.event-card {
    background: #fff;
    border: 1px solid rgba(201, 162, 39, 0.16);
    border-radius: 14px;
    padding: 14px;
}

.event-card h3 {
    margin: 0;
    font-size: 1.04rem;
    color: #1f2442;
}

.event-card p {
    margin: 6px 0 0;
    color: #646a82;
    font-size: 0.9rem;
}

.site-footer {
    margin-top: 64px;
    background: #11182f;
    color: #fff;
}

.footer-shell {
    max-width: 1180px;
    margin: 0 auto;
    padding: 40px 16px 24px;
}

.footer-grid {
    display: grid;
    gap: 32px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 32px;
}

.footer-brand-block {
    padding-right: 8px;
}

.footer-brand-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.footer-logo-wrap {
    height: 56px;
    width: 56px;
    overflow: hidden;
    border-radius: 999px;
    border: 1px solid rgba(201, 162, 39, 0.45);
    background: #161d39;
    padding: 4px;
}

.footer-brand {
    margin: 0;
    font-size: 0.88rem;
    letter-spacing: 0.12em;
    font-weight: 700;
    color: #f3e0a4;
}

.footer-text {
    margin: 14px 0 0;
    color: #ced1e1;
}

.footer-socials {
    margin-top: 18px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.footer-social-icon {
    display: flex;
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #e4e8f8;
    font-size: 0.9rem;
    text-decoration: none;
    transition: color 180ms ease, border-color 180ms ease;
}

.footer-social-icon:hover {
    color: #f6d792;
    border-color: rgba(201, 162, 39, 0.5);
}

.footer-column-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #ffffff;
}

.footer-column-links {
    margin-top: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.footer-column-links a {
    color: #c3c8dd;
    text-decoration: none;
    font-size: 0.92rem;
    transition: color 180ms ease;
}

.footer-column-links a:hover {
    color: #f6d792;
}

.footer-subscribe-text {
    margin: 14px 0 0;
    max-width: 290px;
    color: #c3c8dd;
    font-size: 0.92rem;
    line-height: 1.6;
}

.footer-donate-btn {
    margin-top: 18px;
    display: inline-flex;
    text-decoration: none;
    border: 0;
    border-radius: 12px;
    background: #d59f41;
    padding: 12px 20px;
    color: #1d1d29;
    font-size: 0.92rem;
    font-weight: 700;
    transition: background-color 180ms ease;
}

.footer-donate-btn:hover {
    background: #e0b058;
}

.footer-bottom-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 18px;
    color: #a9afc7;
    font-size: 0.8rem;
}

@media (max-width: 900px) {
    .top-links {
        display: none;
    }

    .nav-mobile-actions {
        display: flex;
    }

    .nav-toggle {
        display: flex;
    }

    .stats-wrap {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin-top: -12px;
        border-radius: 14px;
    }

    .stat-card {
        border-right: 1px solid rgba(201, 162, 39, 0.14);
        border-bottom: 1px solid rgba(201, 162, 39, 0.14);
    }

    .stat-card:nth-child(2n) {
        border-right: none;
    }

    .stat-card:nth-last-child(-n + 2) {
        border-bottom: none;
    }

    .hero-wrap,
    .hero-image {
        max-height: none;
        height: 62vh;
    }

    .hero-overlay {
        top: 34px;
        left: 22px;
        max-width: 420px;
    }

    .hero-tagline {
        font-size: 0.98rem;
    }

    .journey-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .stories-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .events-grid {
        grid-template-columns: 1fr;
    }

    .footer-grid {
        grid-template-columns: 1.2fr 0.9fr 0.9fr;
    }

    .footer-subscribe {
        grid-column: 1 / -1;
    }
}

@media (max-width: 480px) {
    .brand span {
        display: none;
    }

    .login-btn-mobile {
        padding: 8px 10px;
        font-size: 0.72rem;
    }
}

@media (max-width: 640px) {
    .stats-wrap {
        grid-template-columns: 1fr;
        margin-top: 18px;
        box-shadow: none;
    }

    .stat-card {
        border-right: none;
        border-bottom: 1px solid rgba(201, 162, 39, 0.14);
    }

    .stat-card:last-child {
        border-bottom: none;
    }

    .hero-wrap,
    .hero-image {
        height: 70vh;
        object-position: 68% top;
    }

    .hero-overlay {
        left: 16px;
        right: 16px;
        top: 22px;
        max-width: none;
    }

    .hero-title {
        font-size: clamp(2.35rem, 13vw, 3.1rem);
    }

    .hero-tagline {
        font-size: 0.94rem;
    }

    .join-text,
    .scroll-note {
        font-size: 0.82rem;
    }

    .journey-grid,
    .stories-grid {
        grid-template-columns: 1fr;
    }

    .footer-grid {
        grid-template-columns: 1fr;
    }

    .footer-bottom-row {
        font-size: 0.76rem;
    }
}

@media (min-width: 1100px) {
    .footer-grid {
        grid-template-columns: 1.25fr 0.9fr 0.9fr 0.9fr 0.9fr 1.45fr;
    }
}
</style>
