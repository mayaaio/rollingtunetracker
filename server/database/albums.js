import { db } from "../db.js";

export const getAlbums = async (params) => {
	try {
		const coll = db.collection("albums");

		const filter = {};
		if (params.filter) {
			filter.year = {
				$in: params.filter,
			};
		}
		const sort = params.sort;
		const skip = params.skip;
		const limit = params.limit;

		const cursor = coll.find(filter, { sort, skip, limit });
		const result = await cursor.toArray();
		return result;
	} catch (err) {
		console.log(err);
	}
};

export const getAlbumsCount = async (params) => {
	try {
		const coll = db.collection("albums");

		const filter = {};
		if (params.filter) {
			filter.year = {
				$in: params.filter,
			};
		}

		const total = await coll.countDocuments(filter);
		return total;
	} catch (err) {
		console.log(err);
	}
};

export const getYears = async () => {
	try {
		const coll = db.collection("albums");
		const years = coll.distinct("year");
		return years;
	} catch (err) {
		console.log(err);
	}
};

export const getTotalListened = async (user) => {
	try {
		const coll = db.collection("rankings");
		const totalRankings = await coll.countDocuments({ user_id: user });
		return totalRankings;
	} catch (err) {
		console.log(err);
	}
};

export const getRanking = async (params) => {
	try {
		const coll = db.collection("rankings");
		const ranking = await coll.findOne(params);
		return ranking;
	} catch (err) {
		console.log(err);
	}
};

export const listen = async (params) => {
	try {
		const coll = db.collection("rankings");
		const result = await coll.insertOne(params);
		return result;
	} catch (err) {
		console.log(err);
	}
};

export const updateListen = async (albumParams, listenParams) => {
	try {
		const coll = db.collection("rankings");
		const result = await coll.updateOne(albumParams, { $set: listenParams });
		console.log(result);
		return result;
	} catch (err) {
		console.log(err);
	}
};

export const deleteListen = async (id) => {
	try {
		//NOTE - should we actually delete it? or should we just add a deleted boolean
		const coll = db.collection("rankings");
		const deleted = await coll.deleteOne({ _id: id });
		return deleted;
	} catch (err) {
		console.log(err);
	}
};
