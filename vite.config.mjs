import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
	root: 'src',
	// .env files live at the project root, one level up from `root`.
	envDir: '..',
	plugins: [
		vue(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@': path.resolve(process.cwd(), 'src'),
		},
	},
	server: {
		// PORT lets tooling (e.g. the Claude Code preview) assign a free
		// port; plain `npm run dev` still lands on 3000.
		port: Number(process.env.PORT) || 3000,
	},
	esbuild: {
		target: 'es2022',
	},
	build: {
		target: 'es2022',
		outDir: process.env.BUILD_DIR || '../build',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				index: 'src/index.html',
				// Standalone vanity page kept verbatim from the prior site.
				// It's outside the SPA — full page load, its own assets.
				jellycats: 'src/jellycats.html',
			},
		},
	},
})
