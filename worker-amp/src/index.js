const ALLOWED_ORIGINS = ["https://duffle.one", "http://localhost:3000", "http://localhost:3001"];

function corsHeaders(request) {
	const origin = request.headers.get("Origin") || "";
	return {
		"Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Access-Control-Max-Age": "86400",
	};
}

export default {
	async fetch(request, env) {
		const cors = corsHeaders(request);

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers: cors });
		}

		if (request.method !== "GET") {
			return Response.json({ error: "Method not allowed" }, { status: 405, headers: cors });
		}

		try {
			const { sessionId } = await login(env);
			const allInstances = await getInstances(env, sessionId);

			const servers = allInstances
				.filter((inst) => inst.Module !== "ADS")
				.map((inst) => ({
					name: inst.FriendlyName,
					game: inst.ModuleDisplayName,
					running: inst.Running && inst.AppState === 20,
					players: inst.Metrics?.["Active Users"]?.RawValue ?? null,
					maxPlayers: inst.Metrics?.["Active Users"]?.MaxValue ?? null,
					port: getGamePort(inst),
					imageSource: inst.DisplayImageSource ?? null,
				}));

			return Response.json(servers, {
				headers: {
					...cors,
					"Cache-Control": "public, max-age=30",
				},
			});
		} catch (err) {
			console.error("[amp] FATAL:", err.message);
			console.error("[amp] stack:", err.stack);
			return Response.json({ error: "Failed to fetch server status", debug: err.message }, { status: 502, headers: cors });
		}
	},
};

async function login(env) {
	const res = await fetch(`${env.AMP_URL}/API/Core/Login`, {
		method: "POST",
		headers: { "Content-Type": "application/json", Accept: "application/json" },
		body: JSON.stringify({
			username: env.AMP_USERNAME,
			password: env.AMP_PASSWORD,
			token: "",
			rememberMe: false,
		}),
	});

	const data = await res.json();
	if (!data.success) throw new Error("AMP login failed");

	return { sessionId: data.sessionID };
}

async function getInstances(env, sessionId) {
	const res = await fetch(`${env.AMP_URL}/API/ADSModule/GetInstances`, {
		method: "POST",
		headers: { "Content-Type": "application/json", Accept: "application/json" },
		body: JSON.stringify({ SESSIONID: sessionId }),
	});

	const targets = await res.json();
	return targets.flatMap((t) => t.AvailableInstances || []);
}

function getGamePort(inst) {
	const endpoint = inst.ApplicationEndpoints?.find(
		(ep) => ep.DisplayName !== "SFTP Server"
	);
	if (!endpoint) return null;

	const match = endpoint.Endpoint.match(/:(\d+)$/);
	return match ? parseInt(match[1], 10) : null;
}
