import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e9edff',
          500: '#4f46e5',
          600: '#4338ca',
          900: '#1e1b4b'
        }
      }
    }
  },
  plugins: []
};
export default config;
