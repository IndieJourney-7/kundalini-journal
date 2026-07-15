import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                heading: ['Cormorant Garamond', 'Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            },
            colors: {
                gold: {
                    50: '#F8F2E4',
                    100: '#EEE2C8',
                    200: '#E2CEA4',
                    300: '#D5B77C',
                    400: '#C6A86A',
                    500: '#B89758',
                    600: '#9E814B',
                    700: '#7E663C',
                    800: '#604D2F',
                    900: '#433623',
                },
                pink: {
                    50: '#F6F0F4',
                    100: '#E8D9E1',
                    200: '#D8C2CE',
                    300: '#C7A8B8',
                    400: '#B88FA0',
                    500: '#A37B8C',
                    600: '#8B6676',
                    700: '#725364',
                    800: '#5A4350',
                    900: '#423039',
                },
                sacred: {
                    dark: '#F7F4EF',
                    deeper: '#EFEAE2',
                    card: '#FFFFFF',
                    border: '#D8C9B260',
                    purple: '#F2EDF6',
                    lavender: '#7E708A',
                },
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #B89758, #D5B77C)',
                'pink-gradient': 'linear-gradient(135deg, #B88FA0, #C7A8B8)',
                'dark-gradient': 'linear-gradient(180deg, #F9F6F1 0%, #F2ECE3 100%)',
                'card-gradient': 'linear-gradient(135deg, #FFFFFF, #F8F4EE)',
                'gold-shine': 'linear-gradient(90deg, #B89758, #D5B77C, #B89758)',
            },
            boxShadow: {
                'gold': '0 0 16px rgba(198, 168, 106, 0.26)',
                'gold-lg': '0 0 30px rgba(198, 168, 106, 0.32)',
                'pink': '0 0 16px rgba(184, 143, 160, 0.26)',
                'purple': '0 0 16px rgba(73, 56, 91, 0.26)',
                'card': '0 10px 30px rgba(88, 72, 47, 0.12)',
            },
            animation: {
                'gold-shine': 'goldShine 3s ease-in-out infinite',
                'fade-up': 'fadeUp 0.6s ease-out',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'sparkle': 'sparkle 2s ease-in-out infinite',
            },
            keyframes: {
                goldShine: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 8px rgba(198, 168, 106, 0.18)' },
                    '100%': { boxShadow: '0 0 24px rgba(198, 168, 106, 0.44)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                sparkle: {
                    '0%, 100%': { opacity: '0.5', transform: 'scale(0.8)' },
                    '50%': { opacity: '1', transform: 'scale(1.2)' },
                },
            },
        },
    },

    plugins: [forms],
};
