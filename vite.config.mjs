import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

// Every static route in src/site/routes.ts also gets a page of its own in the
// build: a copy of index.html with that route's title, at /cv.html and so on.
// The bucket only has index.html otherwise, so /cv came back as S3's error
// document with a 403. Cloudflare's "Ditch .html endings" rewrite serves /cv
// from /cv.html, and the app routes client-side as before.
//
// The routes are read out of routes.ts with a regex rather than imported,
// since it pulls in Vue components. A route with a :param has no page of its
// own; Cloudflare serves those from their parent's.
function routePages() {
	const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
	return {
		name: 'route-pages',
		apply: 'build',
		async writeBundle({ dir }) {
			const routes = await readFile(path.resolve('src/site/routes.ts'), 'utf8')
			const pages = [...routes.matchAll(/path:\s*"(\/[^":]+)",\s*title:\s*"([^"]+)"/g)]
			if (pages.length === 0) this.error('route-pages: found no routes in src/site/routes.ts')
			const index = await readFile(path.join(dir, 'index.html'), 'utf8')
			for (const [, route, title] of pages) {
				const page = index
					.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
					.replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(title)}`)
					.replace(/(<meta property="og:url" content=")[^"]*/, `$1https://duffle.one${route}`)
				await writeFile(path.join(dir, `${route.slice(1)}.html`), page)
			}
		},
	}
}

export default defineConfig({
	root: 'src',
	// .env files live at the project root, one level up from `root`.
	envDir: '..',
	plugins: [
		vue(),
		tailwindcss(),
		routePages(),
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
