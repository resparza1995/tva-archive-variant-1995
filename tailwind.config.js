/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                loki: {
                    bg: '#050510',
                    purple: '#8b5cf6',
                    blue: '#3b82f6',
                    cyan: '#06b6d4',
                    timeline: '#4c1d95',
                    gold: '#c4b5fd' /* a golden-purple tint */
                }
            },
            animation: {
                'glow-pulse': 'glow 3s infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #8b5cf6, 0 0 10px #8b5cf6' },
                    '100%': { boxShadow: '0 0 15px #3b82f6, 0 0 30px #3b82f6' },
                }
            }
        },
    },
    plugins: [],
}
