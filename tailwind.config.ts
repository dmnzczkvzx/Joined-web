import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
} satisfies Config