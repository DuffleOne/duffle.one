/*
  Route registry for the new design-C site. The legacy TTY screens
  (Photo, Projects, Servers, Sudo, Home/cv/guide subfolders) are no
  longer referenced by main.ts and will get cleaned up; the compat
  exports below exist purely so the leftover .vue files still
  typecheck until they're removed.
*/

import type { Component } from "vue";

export type RouteId =
	| "home"
	| "cv"
	| "cv-role"
	| "guide"
	// legacy ids, kept so the old TTY components still typecheck
	| "projects"
	| "photo"
	| "gaming"
	| "sudo";

export type Accent = "green" | "amber" | "pink" | "cyan" | "violet";

export type RouteSpec = {
	id: RouteId;
	path: string;
	component: () => Promise<Component>;
	// Legacy fields used by the old TTY chrome. Optional now.
	label?: string;
	key?: string;
	accent?: Accent;
	titleBarText?: string;
};

export const routes: RouteSpec[] = [
	{
		id: "home",
		label: "home",
		key: "1",
		path: "/",
		accent: "green",
		titleBarText: "duffle.one",
		component: () => import("../screens/Home.vue"),
	},
	{
		id: "cv",
		label: "cv",
		key: "2",
		path: "/cv",
		accent: "violet",
		titleBarText: "duffle.one — CV",
		component: () => import("../screens/CV.vue"),
	},
	{
		id: "cv-role",
		label: "cv-role",
		key: "3",
		path: "/cv/:slug",
		accent: "violet",
		titleBarText: "duffle.one — CV",
		component: () => import("../screens/CVRole.vue"),
	},
	{
		id: "guide",
		label: "user-guide",
		key: "4",
		path: "/guide",
		accent: "amber",
		titleBarText: "duffle.one — user guide",
		component: () => import("../screens/Guide.vue"),
	},
];

export function findRouteById(id: RouteId): RouteSpec | undefined {
	return routes.find((r) => r.id === id);
}

export function findRouteByKey(key: string): RouteSpec | undefined {
	return routes.find((r) => r.key === key);
}
