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
			meta: { route: r.id, title: r.title },
		})),
		// Anything else falls through to the 404 page.
		{
			path: "/:pathMatch(.*)*",
			name: "notfound",
			component: () => import("./screens/Sudo.vue"),
			meta: { route: "notfound", title: "Not found · duffle.one" },
		},
	],
	scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to) => {
	const title = to.meta.title;
	if (typeof title === "string") document.title = title;
});

createApp(App).use(router).mount("#app");
