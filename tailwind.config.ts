import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				// Catppuccin's sky and crust
				accent: '#89dceb',
				background: '#11111b',
				white: '#ffffff',
				red: '#f38ba8'
			}
		}
	},

	plugins: []
} satisfies Config;
