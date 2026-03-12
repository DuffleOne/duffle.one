import { spawn } from "child_process";
import worker from "./src/index.js";

const PORT = 3001;
const WRANGLER_PORT = 8787;

// Load env from wrangler.toml vars + .dev.vars for secrets
const env = {
	AMP_URL: process.env.AMP_URL || "https://amp.dfl.mx",
	AMP_USERNAME: process.env.AMP_USERNAME || "read-only",
	AMP_PASSWORD: process.env.AMP_PASSWORD,
};

if (!env.AMP_PASSWORD) {
	const file = Bun.file(new URL(".dev.vars", import.meta.url));
	if (await file.exists()) {
		const text = await file.text();
		for (const line of text.split("\n")) {
			const match = line.match(/^(\w+)\s*=\s*(.+)$/);
			if (match) env[match[1]] = match[2].trim();
		}
	}
}

if (!env.AMP_PASSWORD) {
	console.error("Missing AMP_PASSWORD. Set it in .dev.vars or as an env var.");
	process.exit(1);
}

const gamingHtmlPath = new URL("../src/gaming.html", import.meta.url).pathname;

// Start local Bun server — serves gaming.html at / and the API at /api
const server = Bun.serve({
	port: PORT,
	async fetch(request) {
		const url = new URL(request.url);

		if (url.pathname === "/api") {
			return worker.fetch(request, env);
		}

		// Serve gaming.html for everything else
		const html = await Bun.file(gamingHtmlPath).text();
		return new Response(html, {
			headers: { "Content-Type": "text/html" },
		});
	},
});

console.log(`[bun]     http://localhost:${PORT}`);

// Start wrangler alongside
const wrangler = spawn("npx", ["wrangler", "dev", "--port", String(WRANGLER_PORT)], {
	stdio: "inherit",
	cwd: import.meta.dirname,
});

wrangler.on("error", (err) => {
	console.error("[wrangler] failed to start:", err.message);
});

process.on("SIGINT", () => {
	wrangler.kill();
	server.stop();
	process.exit(0);
});
