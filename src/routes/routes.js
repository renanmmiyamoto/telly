import Discover from "../pages/Discover";
import Genres from "../pages/Genres";
import Movie from "../pages/Movie";

export const publicRoutes = [
	{
		path: "/",
		component: Discover
	},
	{
		path: "/genres/:id",
		component: Genres
	},
	{
		path: "/movie/:id",
		component: Movie
	}
];
