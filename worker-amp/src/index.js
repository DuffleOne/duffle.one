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
			const { sessionId, instanceIds, permissions } = await login(env);
			console.log("[amp] login ok, session:", sessionId);
			console.log("[amp] permissions:", permissions);
			console.log("[amp] extracted instance IDs:", instanceIds);

			const instances = await Promise.all(
				instanceIds.map((id) => getInstance(env, sessionId, id))
			);
			console.log("[amp] fetched instances:", instances.map((i) => ({
				id: i.InstanceID,
				name: i.FriendlyName,
				module: i.Module,
				moduleDisplay: i.ModuleDisplayName,
				running: i.Running,
				appState: i.AppState,
			})));

			const servers = instances
				.filter((inst) => inst.Module !== "ADS")
				.map((inst) => ({
					name: inst.FriendlyName,
					game: inst.ModuleDisplayName,
					running: inst.Running && inst.AppState === 20,
					players: inst.Metrics?.["Active Users"]?.RawValue ?? null,
					maxPlayers: inst.Metrics?.["Active Users"]?.MaxValue ?? null,
					port: getGamePort(inst),
				}));
			console.log("[amp] response:", servers);

			return Response.json(servers, {
				headers: {
					...cors,
					"Cache-Control": "public, max-age=30",
				},
			});
		} catch (err) {
			return Response.json({ error: "Failed to fetch server status" }, { status: 502, headers: cors });
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

	const instanceIds = [...new Set(
		(data.permissions || [])
			.map((p) => p.match(/^Instances\.([0-9a-f-]{36})\./))
			.filter(Boolean)
			.map((m) => m[1])
	)];

	return { sessionId: data.sessionID, instanceIds, permissions: data.permissions };
}

async function getInstance(env, sessionId, instanceId) {
	const res = await fetch(`${env.AMP_URL}/API/ADSModule/GetInstance`, {
		method: "POST",
		headers: { "Content-Type": "application/json", Accept: "application/json" },
		body: JSON.stringify({ SESSIONID: sessionId, InstanceId: instanceId }),
	});

	return res.json();
}

function getGamePort(inst) {
	const endpoint = inst.ApplicationEndpoints?.find(
		(ep) => ep.DisplayName !== "SFTP Server"
	);
	if (!endpoint) return null;

	const match = endpoint.Endpoint.match(/:(\d+)$/);
	return match ? parseInt(match[1], 10) : null;
}
