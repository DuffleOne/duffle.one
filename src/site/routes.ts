/*
  Route registry. Single source of truth for the router and the
  subpage masthead nav. Add a route here and it shows up everywhere.

  `id` is the internal/code name; `label` is what the masthead shows;
  `path` is the public URL; `title` lands in document.title. Routes
  flagged `nav: false` stay out of the masthead (detail pages).
*/

import type { Component } from "vue";

export type RouteId = "home" | "cv" | "cv-role" | "guide";

export type RouteSpec = {
	id: RouteId;
	label: string;
	path: string;
	title: string;
	nav?: false;
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
		id: "cv",
		label: "cv",
		path: "/cv",
		title: "Where I've worked · duffle.one",
		component: () => import("../screens/CV.vue"),
	},
	{
		id: "cv-role",
		label: "cv-role",
		path: "/cv/:slug",
		title: "CV · duffle.one",
		nav: false,
		component: () => import("../screens/CVRole.vue"),
	},
	{
		id: "guide",
		label: "user guide",
		path: "/guide",
		title: "A user guide to me · duffle.one",
		component: () => import("../screens/Guide.vue"),
	},
];

export function findRouteById(id: RouteId): RouteSpec | undefined {
	return routes.find((r) => r.id === id);
}
