import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#111111',
        panel: '#161616',
        border: 'rgba(255,255,255,0.08)',
        sky: '#00BFFF',
        skyDeep: '#0077FF',
        gold: '#D4AF37',
        silver: '#E8E8E8',
        muted: '#A1A1AA'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 80px rgba(0,191,255,0.18)'
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top right, rgba(0,191,255,0.18), transparent 30%), radial-gradient(circle at bottom left, rgba(212,175,55,0.08), transparent 24%)'
      }
    }
  },
  plugins: []
};

export default config;
