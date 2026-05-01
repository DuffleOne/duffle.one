import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import { routes } from "./site/routes";
import "./input.css";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		...routes.map((r) => ({
			path: r.path,
			name: r.id,
			component: r.component,
			meta: { route: r.id, accent: r.accent, title: r.titleBarText },
		})),
		// Anything else falls through to the sudo/404 easter egg.
		{
			path: "/:pathMatch(.*)*",
			name: "sudo",
			component: () => import("./screens/Sudo.vue"),
			meta: { route: "sudo", accent: "pink", title: "laura@duffle: ~ · sudo: an error has occurred" },
		},
	],
	scrollBehavior: () => ({ top: 0 }),
});

createApp(App).use(router).mount("#app");
