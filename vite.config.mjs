import { defineConfig } from 'vite'

export default defineConfig({
	root: 'src',
	appType: 'mpa',
	esbuild: {
		target: 'es2022',
	},
	build: {
		target: 'es2022',
		outDir: process.env.BUILD_DIR || (process.env.CI ? '/build' : './build'),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				index: 'src/index.html',
				"404": 'src/404.html',
			},
		},
	},
	optimizeDeps: {
		entries: ['src/index.html', 'src/404.html'],
	},
})
