/*
  Route registry. Single source of truth for the sidebar, the router,
  hotkeys, and the palette. Add a route here and it shows up everywhere.

  `id` is the internal/code name (matches preview/tty-theme.jsx where
  "gaming" is the historical id); `label` is what the sidebar shows;
  `path` is the public URL.
*/

import type { Component } from "vue";
import type { Accent } from "../types/accent";

export type RouteId = "home" | "projects" | "photo" | "gaming" | "guide" | "cv";

export type RouteSpec = {
	id: RouteId;
	label: string;
	key: string;
	path: string;
	accent: Accent;
	titleBarText: string;
	component: () => Promise<Component>;
};

export const routes: RouteSpec[] = [
	{
		id: "home",
		label: "home",
		key: "1",
		path: "/",
		accent: "green",
		titleBarText: "laura@duffle: ~ · fish · 96×42",
		component: () => import("../screens/Home.vue"),
	},
	{
		id: "projects",
		label: "projects",
		key: "2",
		path: "/projects",
		accent: "amber",
		titleBarText: "laura@duffle: ~/projects · ls",
		component: () => import("../screens/Projects.vue"),
	},
	{
		id: "photo",
		label: "photo",
		key: "3",
		path: "/photo",
		accent: "pink",
		titleBarText: "laura@duffle: ~/photo · feh contact-sheet",
		component: () => import("../screens/Photo.vue"),
	},
	{
		id: "gaming",
		label: "servers",
		key: "4",
		path: "/servers",
		accent: "cyan",
		titleBarText: "laura@duffle: ~/servers · systemctl status",
		component: () => import("../screens/Servers.vue"),
	},
	{
		id: "guide",
		label: "user-guide",
		key: "5",
		path: "/guide",
		accent: "amber",
		titleBarText: "laura@duffle: ~/guide · man laura(1)",
		component: () => import("../screens/Guide.vue"),
	},
	{
		id: "cv",
		label: "cv",
		key: "6",
		path: "/cv",
		accent: "violet",
		titleBarText: "laura@duffle: ~/cv · less laura.cv",
		component: () => import("../screens/CV.vue"),
	},
];

export function findRouteById(id: RouteId): RouteSpec | undefined {
	return routes.find((r) => r.id === id);
}

export function findRouteByKey(key: string): RouteSpec | undefined {
	return routes.find((r) => r.key === key);
}
