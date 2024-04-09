/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  safelist: [
    // Some dynamic class names generated by handleRatingColor
    'text-orange-500',
    'text-red-500',
    'text-amber-500',
    'text-green-500',
    'border-orange-500',
    'border-red-500',
    'border-amber-500',
    'border-green-500',
    'bg-orange-200',
    'bg-red-200',
    'bg-amber-200',
    'bg-green-200',
  ],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
