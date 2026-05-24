export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#020617',
        panel: '#0f172a',
        line: '#1e293b',
        neon: '#22d3ee',
        danger: '#f43f5e',
        success: '#22c55e',
        warning: '#f59e0b'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,211,238,0.15), 0 0 30px rgba(34,211,238,0.12)'
      }
    }
  },
  plugins: []
};