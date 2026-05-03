/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal:   '#0a0a12',
        terracotta: '#C75B39',
        sage:       '#5B8C6F',
        lavender:   '#8B7EC8',
        coral:      '#E8856E',
        peach:      '#F5C5A3',
        sand:       '#D4C4A8',
      },
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        serif:   ['"Crimson Pro"', 'serif'],
        inter:   ['"Inter"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
