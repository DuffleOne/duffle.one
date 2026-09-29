import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import { routes } from "./site/routes";
import "./input.css";

// Clean paths: /cv, /guide, /cv/<role>. Each has a page of its own in the
// build (vite.config.mjs), and Cloudflare rewrites /cv to /cv.html and
// /cv/<role> to /cv.html too. Links from when this was a hash router still
// work: /#/cv is moved onto /cv before the router starts, and the bare "#/"
// the old router left on every URL is dropped.
const legacy = location.hash.match(/^#(\/.*)$/);
if (legacy) history.replaceState(null, "", legacy[1] === "/" ? location.pathname : legacy[1]);

const router = createRouter({
	history: createWebHistory(),
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
