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
		})),
		{
			path: "/:pathMatch(.*)*",
			redirect: "/",
		},
	],
	scrollBehavior: () => ({ top: 0 }),
});

createApp(App).use(router).mount("#app");
