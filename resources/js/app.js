import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const initOmAudioController = () => {
    if (typeof window === 'undefined' || window.__omAudioInitialized) {
        return;
    }

    window.__omAudioInitialized = true;

    const STORAGE_KEY = 'omSoundMuted';
    const omAudio = new Audio('/audio/om-scroll.mp3');
    omAudio.preload = 'auto';
    omAudio.loop = true;
    omAudio.volume = 0.42;

    let isMuted = localStorage.getItem(STORAGE_KEY) === '1';
    let userInteracted = false;

    const ensureStyle = () => {
        if (document.getElementById('om-audio-toggle-style')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'om-audio-toggle-style';
        style.textContent = `
            .om-audio-toggle {
                position: fixed;
                right: 20px;
                bottom: 20px;
                z-index: 1200;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                border: 1px solid rgba(201, 162, 39, 0.55);
                border-radius: 999px;
                background: rgba(250, 248, 243, 0.95);
                color: #6c5a2f;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                padding: 10px 14px;
                box-shadow: 0 10px 24px rgba(77, 65, 40, 0.18), 0 0 14px rgba(201, 162, 39, 0.14);
                cursor: pointer;
                transition: transform 160ms ease, box-shadow 220ms ease, border-color 220ms ease;
            }

            .om-audio-toggle:hover {
                transform: translateY(-2px);
                border-color: rgba(201, 162, 39, 0.82);
                box-shadow: 0 14px 28px rgba(77, 65, 40, 0.24), 0 0 18px rgba(201, 162, 39, 0.2);
            }

            .om-audio-toggle .om-symbol {
                font-size: 18px;
                line-height: 1;
            }
        `;

        document.head.appendChild(style);
    };

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'om-audio-toggle';

    const renderButton = () => {
        button.innerHTML = `<span class="om-symbol">ॐ</span><span>${isMuted ? 'Muted' : 'Sound On'}</span>`;
        button.setAttribute('aria-label', isMuted ? 'Unmute OM sound' : 'Mute OM sound');
        button.setAttribute('aria-pressed', isMuted ? 'false' : 'true');
    };

    const playLoop = async () => {
        if (isMuted) {
            return;
        }

        try {
            await omAudio.play();
        } catch {
            // Browser may block until user interaction.
        }
    };

    const pauseLoop = () => {
        omAudio.pause();
    };

    const setMuted = (nextMuted) => {
        isMuted = nextMuted;
        localStorage.setItem(STORAGE_KEY, isMuted ? '1' : '0');
        renderButton();

        if (isMuted) {
            pauseLoop();
        } else {
            playLoop();
        }
    };

    const unlockAudio = () => {
        if (userInteracted) {
            return;
        }

        userInteracted = true;
        if (!isMuted) {
            playLoop();
        }
    };

    ensureStyle();
    renderButton();
    document.body.appendChild(button);

    button.addEventListener('click', () => setMuted(!isMuted));

    // Try immediate playback for browsers that allow autoplay.
    playLoop();

    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        initOmAudioController();

        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
