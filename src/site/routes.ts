/*
  Route registry. Single source of truth for the router and the
  subpage masthead nav. Add a route here and it shows up everywhere.

  `id` is the internal/code name; `label` is what the masthead shows;
  `path` is the public URL; `title` lands in document.title.
*/

import type { Component } from "vue";

export type RouteId = "home" | "projects" | "photo" | "guide" | "cv";

export type RouteSpec = {
	id: RouteId;
	label: string;
	path: string;
	title: string;
	component: () => Promise<Component>;
};

export const routes: RouteSpec[] = [
	{
		id: "home",
		label: "index",
		path: "/",
		title: "duffle.one · Laura Miller",
		component: () => import("../screens/Home.vue"),
	},
	{
		id: "projects",
		label: "projects",
		path: "/projects",
		title: "Projects · duffle.one",
		component: () => import("../screens/Projects.vue"),
	},
	{
		id: "photo",
		label: "photographs",
		path: "/photo",
		title: "Photographs · duffle.one",
		component: () => import("../screens/Photo.vue"),
	},
	{
		id: "guide",
		label: "user guide",
		path: "/guide",
		title: "A user guide to me · duffle.one",
		component: () => import("../screens/Guide.vue"),
	},
	{
		id: "cv",
		label: "cv",
		path: "/cv",
		title: "Where I've worked · duffle.one",
		component: () => import("../screens/CV.vue"),
	},
];

export function findRouteById(id: RouteId): RouteSpec | undefined {
	return routes.find((r) => r.id === id);
}
