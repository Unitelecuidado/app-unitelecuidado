import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        gotham: 'Gotham, sans-serif',
      },
      screens: {
        sm: '640px',
        md: '1200px',
        lg: '1400px',
        xl: '1600px',
        '2xl': '2000px',
      },
      height: {
        '94vh': '94vh',
        '96vh': '96vh',
      },
      colors: {
        'padrao-blue': '#184066',
        'padrao-green-light': '#DEE7CB',
        'padrao-green': '#ABBF8A',
        'padrao-gray': '#EAEEF0',
      },
    },
  },
  plugins: [],
}
export default config
