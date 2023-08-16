import express from "express";
const router = express.Router();
import {
	getAlbums,
	getAlbumsCount,
	getYears,
	getTotalRankings,
} from "../database/albums.js";

router.get("/rankings", async (req, res) => {
	try {
		let queryParams = {};
		const direction = req.query.orderBy.direction === "asc" ? 1 : -1;
		const sortBy = req.query.orderBy.columnAccessor;
		queryParams.sort = {
			[sortBy]: direction,
		};
		queryParams.limit = parseInt(req.query.size);
		queryParams.skip =
			(parseInt(req.query.page) - 1) * parseInt(req.query.size);
		if (req.query.filter) {
			queryParams.filter = req.query.filter.map((x) => parseInt(x));
		}

		const rankings = await getAlbums(queryParams);
		res.json(rankings);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to get rankings" });
	}
});

router.get("/albumsCount", async (req, res) => {
	try {
		let queryParams = {};
		if (req.query.filter) {
			queryParams.filter = req.query.filter.map((x) => parseInt(x));
		}

		const albumsCount = await getAlbumsCount(queryParams);
		res.json(albumsCount);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to get total" });
	}
});

router.get("/years", async (req, res) => {
	try {
		const years = await getYears();
		res.json(years);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to get years" });
	}
});

router.get("/totalRankings", async (req, res) => {
	try {
		//TODO - make sure user exists

		const totalRankings = await getTotalRankings(req.query.user);
		res.json(totalRankings);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to get total rankings" });
	}
});

export default router;
