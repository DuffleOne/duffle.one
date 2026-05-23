import worker from "./src/index.js";

const PORT = 3001;
const WRANGLER_PORT = 8787;

// Load env from wrangler.toml vars + .dev.vars for secrets
const env = {
	AMP_URL: Deno.env.get("AMP_URL") || "https://amp.dfl.mx",
	AMP_USERNAME: Deno.env.get("AMP_USERNAME") || "read-only",
	AMP_PASSWORD: Deno.env.get("AMP_PASSWORD"),
};

if (!env.AMP_PASSWORD) {
	try {
		const text = await Deno.readTextFile(new URL(".dev.vars", import.meta.url));
		for (const line of text.split("\n")) {
			const match = line.match(/^(\w+)\s*=\s*(.+)$/);
			if (match) env[match[1]] = match[2].trim();
		}
	} catch {
		// No .dev.vars present; the check below handles a missing password.
	}
}

if (!env.AMP_PASSWORD) {
	console.error("Missing AMP_PASSWORD. Set it in .dev.vars or as an env var.");
	Deno.exit(1);
}

const gamingHtmlPath = new URL("../src/gaming.html", import.meta.url);

// Local server — serves gaming.html at / and the API at /api
const server = Deno.serve({ port: PORT, onListen() {} }, async (request) => {
	const url = new URL(request.url);

	if (url.pathname === "/api") {
		return worker.fetch(request, env);
	}

	// Serve gaming.html for everything else
	const html = await Deno.readTextFile(gamingHtmlPath);
	return new Response(html, {
		headers: { "Content-Type": "text/html" },
	});
});

console.log(`[deno]    http://localhost:${PORT}`);

// Start wrangler alongside
let wrangler;
try {
	wrangler = new Deno.Command("npx", {
		args: ["wrangler", "dev", "--port", String(WRANGLER_PORT)],
		cwd: import.meta.dirname,
		stdin: "inherit",
		stdout: "inherit",
		stderr: "inherit",
	}).spawn();
} catch (err) {
	console.error("[wrangler] failed to start:", err.message);
}

Deno.addSignalListener("SIGINT", () => {
	try {
		wrangler?.kill();
	} catch {
		// Already gone.
	}
	server.shutdown();
	Deno.exit(0);
});
