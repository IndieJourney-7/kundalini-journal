<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import FloatingContactButtons from '@/Components/FloatingContactButtons.vue';
import { getActiveQuote } from '@/quotes';

const activeQuote = ref(null);
const mobileMenuOpen = ref(false);
const page = usePage();

watch(() => page.url, () => {
    mobileMenuOpen.value = false;
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
});

onBeforeUnmount(() => {
    heroTimers.forEach((timer) => window.clearTimeout(timer));
});

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Meditation', href: '/meditation' },
    { label: 'Knowledge', href: '/knowledge' },
    { label: 'Events', href: '/events' },
    { label: 'Journals', href: '/community' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Golden Rules', href: '/golden-rules' },
];

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
            { label: 'About', href: '/about' },
            { label: 'Meditation', href: '/meditation' },
            { label: 'Knowledge', href: '/knowledge' },
            { label: 'Events', href: '/events' },
            { label: 'Journals', href: '/community' },
        ],
    },
    {
        title: 'Resources',
        items: [
            { label: 'Articles', href: '/blog' },
            { label: 'eBooks', href: '/knowledge' },
            { label: 'Videos', href: '/meditation' },
            { label: 'FAQ', href: '/contact' },
        ],
    },
    {
        title: 'Community',
        items: [
            { label: 'Testimonials', href: '/community' },
            { label: 'Practitioners', href: '/community' },
            { label: 'Blog', href: '/blog' },
        ],
    },
    {
        title: 'Support',
        items: [
            { label: 'Contact', href: '/contact' },
            { label: 'Privacy Policy', href: '/contact' },
            { label: 'Terms of Use', href: '/contact' },
        ],
    },
];

const socialIcons = ['f', 'ig', '▶', '◧'];
</script>

<template>
    <Head title="Golden Age" />

    <main class="site-wrap">
        <header class="top-nav">
            <div class="top-nav-inner">
                <Link href="/" class="brand">
                    <div class="brand-logo">
                        <ApplicationLogo compact class="h-full w-full" />
                    </div>
                    <span>Golden Age Community</span>
                </Link>

                <div class="top-links">
                    <Link
                        v-for="(link, index) in navLinks"
                        :key="link.label"
                        :href="link.href"
                        :class="{ active: index === 0 }"
                    >
                        {{ link.label }}
                    </Link>
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
                <Link
                    v-for="(link, index) in navLinks"
                    :key="'m-' + link.label"
                    :href="link.href"
                    :class="{ active: index === 0 }"
                    @click="mobileMenuOpen = false"
                >
                    {{ link.label }}
                </Link>
            </div>
        </header>

        <div v-if="activeQuote" class="quote-banner">
            <p class="quote-banner-text">&ldquo;{{ activeQuote.text }}&rdquo;</p>
            <p v-if="activeQuote.author" class="quote-banner-author">— {{ activeQuote.author }}</p>
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
                                <p class="footer-brand-top">GOLDEN AGE</p>
                                <p class="footer-brand">COMMUNITY</p>
                            </div>
                        </div>
                        <p class="footer-text">Awaken, Align, Ascend.</p>

                        <div class="footer-socials">
                            <span v-for="icon in socialIcons" :key="icon" class="footer-social-icon">{{ icon }}</span>
                        </div>
                    </div>

                    <div v-for="group in footerGroups" :key="group.title" class="footer-column">
                        <p class="footer-column-title">{{ group.title }}</p>
                        <div class="footer-column-links">
                            <Link v-for="item in group.items" :key="`${group.title}-${item.label}`" :href="item.href">{{ item.label }}</Link>
                        </div>
                    </div>

                    <div class="footer-subscribe">
                        <p class="footer-column-title">Stay Connected</p>
                        <p class="footer-subscribe-text">Get updated on events, new articles and meditation sessions.</p>

                        <form class="footer-subscribe-form" @submit.prevent>
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Subscribe</button>
                        </form>
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
    width: 38px;
    height: 38px;
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

.footer-brand-top,
.footer-brand {
    margin: 0;
    font-size: 0.88rem;
    letter-spacing: 0.12em;
    font-weight: 700;
}

.footer-brand-top {
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

.footer-subscribe-form {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-subscribe-form input {
    min-width: 0;
    flex: 1;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: #2a3149;
    padding: 12px 14px;
    color: white;
    font-size: 0.92rem;
    outline: none;
}

.footer-subscribe-form input::placeholder {
    color: #98a0ba;
}

.footer-subscribe-form button {
    border: 0;
    border-radius: 12px;
    background: #d59f41;
    padding: 12px 16px;
    color: #1d1d29;
    font-size: 0.92rem;
    font-weight: 700;
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

    .footer-subscribe-form {
        flex-direction: row;
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

    .footer-subscribe-form {
        flex-direction: column;
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
