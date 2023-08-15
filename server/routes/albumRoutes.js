import express from "express";
const router = express.Router();
import { getAlbums } from "../database/albums.js";

router.get("/rankings", async (req, res) => {
	try {
		const direction = req.query.orderBy.direction === "asc" ? 1 : -1;
		const sortBy = req.query.orderBy.columnAccessor;
		const sort = {
			[sortBy]: direction,
		};
		const page = req.query.page;
		const size = req.query.size;
		const rankings = await getAlbums({ sort, page, size });
		res.json(rankings);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to get rankings" });
	}
});

export default router;
