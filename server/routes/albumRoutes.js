import express from "express";
const router = express.Router();
import {
	deleteListen,
	getAlbums,
	getAlbumsCount,
	getRanking,
	getTotalListened,
	getYears,
	listen,
	updateListen,
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

		var rankings = await getAlbums(queryParams);

		const updatedRankings = await Promise.all(
			rankings.map(async function (item) {
				const userRanking = await getRanking({
					album_id: item._id,
					user_id: req.query.user_id,
				});
				if (userRanking) {
					item["listened"] = true;
					item["rating"] = userRanking.rating;
					item["notes"] = userRanking.notes;
				}
				return item;
			})
		);
		res.json(updatedRankings);
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
		const totalRankings = await getTotalListened(req.query.user);
		res.json(totalRankings);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to get total rankings" });
	}
});

router.post("/listen", async (req, res) => {
	try {
		//TODO - make sure user and album exist?
		const params = {
			_id: req.body.user_id + "_" + req.body.album_id,
			user_id: req.body.user_id,
			album_id: req.body.album_id,
		};
		if (req.body.notes) {
			params["notes"] = req.body.notes;
		}
		if (req.body.rating) {
			params["rating"] = req.body.rating;
		}

		const listened = await listen(params);
		res.json(listened);
	} catch (err) {
		console.log(err);
	}
});

router.put("/updateListen", async (req, res) => {
	try {
		//TODO - make sure user and album exist?
		console.log(req.body);
		const albumParams = {
			_id: req.body.user_id + "_" + req.body.album_id,
			user_id: req.body.user_id,
			album_id: req.body.album_id,
		};
		const listenParams = {};
		if (req.body.notes) {
			listenParams["notes"] = req.body.notes;
		}
		if (req.body.rating) {
			listenParams["rating"] = req.body.rating;
		}

		const listened = await updateListen(albumParams, listenParams);
		res.json(listened);
	} catch (err) {
		console.log(err);
	}
});

router.delete("/deleteListen/:id", async (req, res) => {
	try {
		//TODO - make sure user and album exist?
		const deleted = await deleteListen(req.params.id);
		res.json(deleted);
	} catch (err) {
		console.log(err);
	}
});

export default router;
