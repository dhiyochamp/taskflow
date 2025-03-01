// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#3b82f6',
            dark: '#2563eb',
            light: '#60a5fa',
          },
          secondary: {
            DEFAULT: '#10b981',
            dark: '#059669',
            light: '#34d399',
          },
          priority: {
            high: '#ef4444',
            medium: '#f59e0b',
            low: '#3b82f6',
          },
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          },
        },
        boxShadow: {
          card: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
          hover: '0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.03)',
        },
        animation: {
          'bounce-slow': 'bounce 3s infinite',
          'fade-in': 'fadeIn 0.5s ease-out',
          'slide-up': 'slideUp 0.4s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  }
