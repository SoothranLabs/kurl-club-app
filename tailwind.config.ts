import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { min: '767px' },
      md: { min: '991px' },
      lg: { min: '1050px' },
      xl: { min: '1248px' },
    },
    extend: {
      fontSize: {
        sm: ['13px', '1.5rem'],
      },
      lineHeight: {
        normal: '1.09', // 109%
      },
      transitionDuration: {
        400: '400ms',
      },
      colors: {
        primary: {
          green: {
            50: '#fbfee6',
            100: '#f1fdb1',
            200: '#ebfb8b',
            300: '#e2fa55',
            400: '#dcf935',
            500: '#d3f702',
            600: '#c0e102',
            700: '#96af01',
            800: '#96af01',
            900: '#596801',
          },
          blue: {
            50: '#e7e8e8',
            100: '#b5b6b9',
            200: '#929397',
            300: '#606267',
            400: '#414349',
            500: '#11141c',
            600: '#0f1219',
            700: '#0c0e14',
            800: '#090b0f',
            900: '#07080c',
          },
        },
        secondary: {
          blue: {
            50: '#eaeaeb',
            100: '#bcbdbf',
            200: '#9c9da1',
            300: '#6f7176',
            400: '#53555b',
            500: '#282b32',
            600: '#24272e',
            700: '#1c1f24',
            800: '#16181c',
            900: '#111215',
          },
          pink: {
            50: '#fff4fd',
            100: '#ffddf8',
            200: '#ffccf4',
            300: '#ffb5f0',
            400: '#ffa6ed',
            500: '#ff90e8',
            600: '#e883d3',
            700: '#b566a5',
            800: '#8c4f80',
            900: '#6b3c61',
          },
          green: {
            50: '#e9f6f4',
            100: '#bbe2de',
            200: '#9ad3ce',
            300: '#6cbfb7',
            400: '#4fb3a9',
            500: '#23a094',
            600: '#209287',
            700: '#197269',
            800: '#135851',
            900: '#0f433e',
          },
          yellow: {
            50: '#fffae6',
            100: '#ffeeb0',
            200: '#ffe68a',
            300: '#ffdb54',
            400: '#ffd433',
            500: '#ffc900',
            600: '#e8b700',
            700: '#b58f00',
            800: '#8c6f00',
            900: '#6b5400',
          },
        },
        semantic: {
          blue: {
            50: '#f4f6fd',
            100: '#dde4f9',
            200: '#ccd7f7',
            300: '#b5c5f3',
            400: '#a6b9f1',
            500: '#90a8ed',
            600: '#8399d8',
            700: '#6677a8',
            800: '#4f5c82',
            900: '#3c4764',
          },
        },
        neutral: {
          ochre: {
            50: '#fbf3ea',
            100: '#f1d9be',
            200: '#eac79e',
            300: '#e1ae72',
            400: '#db9e56',
            500: '#d2862c',
            600: '#bf7a28',
            700: '#955f1f',
            800: '#744a18',
            900: '#583812',
          },
          green: {
            50: '#e9f6e7',
            100: '#bae2b5',
            200: '#99d592',
            300: '#6bc160',
            400: '#4eb541',
            500: '#22a311',
            600: '#1f940f',
            700: '#18740c',
            800: '#135a09',
            900: '#0e4407',
          },
        },
        alert: {
          red: {
            50: '#fbeaed',
            100: '#f3bfc8',
            200: '#ed9fad',
            300: '#e47488',
            400: '#df5971',
            500: '#d72f4d',
            600: '#c42b46',
            700: '#992137',
            800: '#761a2a',
            900: '#5a1420',
          },
        },
        background: {
          light: '#FFFFFF',
          dark: '#11141c',
        },
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
};

export default config;
