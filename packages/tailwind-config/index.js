/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      sans: ['Work Sans', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      mono: ['Source Code Pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'accordion-down': {
          from: {height: 0},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: 0},
        },
      },
      colors: {
        // brand colors
        'cosmo-purple': {
          DEFAULT: '#685BC7', // slatePurple
          50: '#E6E4F6',
          100: '#D8D5F1',
          200: '#BCB6E6',
          300: '#A098DC',
          400: '#8479D1',
          500: '#685BC7',
          600: '#493CAE', // slatePurple-light
          700: '#382D85',
          800: '#261F5B', // slatePurple-dark
          900: '#151131',
          950: '#0C0A1C',
        },
        'cosmo-blue': {
          DEFAULT: '#002E5D', // spaceBlue
          50: '#DDEEFF',
          100: '#C3E1FF',
          200: '#90C7FF',
          300: '#5DADFF',
          400: '#2A93FF', // providerBlue
          500: '#007AF6',
          600: '#0060C3',
          700: '#004790',
          800: '#002E5D',
          900: '#00172F',
          950: '#000C18',
        },
        'cosmo-grey': {
          DEFAULT: '#768693',
          50: '#EAEFF0',
          100: '#D9E1E2', // gainsboro
          200: '#C8D2D5',
          300: '#AFBAC0',
          400: '#8D9BA5',
          500: '#768693', // lightGray
          600: '#596A78',
          700: '#344655',
          800: '#253746', // gunMetal
          900: '#18222B',
          950: '#0A0D0F',
        },

        // shadcn-ui colors
        'card': {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'border': 'hsl(var(--border))',
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'primary': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'secondary': {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        'destructive': {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        'muted': {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'accent': {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        'popover': {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      margin: {
        38: '9.5rem',
      },
      borderRadius: {
        'sm': 'calc(var(--radius) - 4px)',
        'md': 'calc(var(--radius) - 2px)',
        'lg': 'var(--radius)',
        'xl': 'calc(var(--radius) + 2px)',
        '2xl': 'calc(var(--radius) + 4px)',
        '3xl': 'calc(var(--radius) + 6px)',
        '4xl': '50px',
      },
      screens: {
        'xs': '425px',
        '2xl': '1400px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
