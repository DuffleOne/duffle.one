import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	root: 'src',
	appType: 'mpa',
	plugins: [
		tailwindcss(),
	],
	server: {
		port: 3000,
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
				"404": 'src/404.html',
				time: 'src/time.html',
				cv: 'src/cv.html',
				jellycats: 'src/jellycats.html',
				gaming: 'src/gaming.html',
				"user-guide": 'src/user-guide.html',
			},
		},
	},
	optimizeDeps: {
		entries: ['src/index.html', 'src/404.html', 'src/time.html', 'src/cv.html', 'src/jellycats.html', 'src/gaming.html', 'src/user-guide.html'],
	},
})
