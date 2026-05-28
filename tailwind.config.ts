import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        v4: {
          50: '#f6f7f4',
          100: '#e7eadf',
          500: '#79a841',
          600: '#5f8731',
          700: '#4b6d27',
          900: '#1c2a12'
        },
        ink: '#0f172a'
      },
      boxShadow: {
        soft: '0 12px 30px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
export default config;
