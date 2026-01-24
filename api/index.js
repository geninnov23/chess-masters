import { Hono } from "hono";
import gamesRouter from "./routes/games";

const app = new Hono();

// API routes for chess games
app.route("/api/games", gamesRouter);

// Catch-all route for static assets
app.all("*", async (c) => {
	return c.env.ASSETS.fetch(c.req.raw);
});

export default {
	fetch: app.fetch,
};
