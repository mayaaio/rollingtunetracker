import { connectToDatabase } from "../db.js";

export const getAlbums = async (params) => {
	try {
		console.log(params);
		const db = await connectToDatabase();
		const coll = db.collection("albums");

		const filter = {};
		if (params.filter) {
			filter.year = {
				$in: params.filter,
			};
		}
		console.log(filter);
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
		console.log(params);
		const db = await connectToDatabase();
		const coll = db.collection("albums");

		const filter = {};
		if (params.filter) {
			filter.year = {
				$in: params.filter,
			};
		}
		console.log(filter);

		const total = await coll.countDocuments(filter);
		return total;
	} catch (err) {
		console.log(err);
	}
};

export const getYears = async () => {
	try {
		const db = await connectToDatabase();
		const coll = db.collection("albums");
		const years = coll.distinct("year");
		return years;
	} catch (err) {
		console.log(err);
	}
};

export const getTotalRankings = async (user) => {
	console.log(user);
	try {
		const db = await connectToDatabase();
		const coll = db.collection("rankings");
		const totalRankings = await coll.countDocuments({ user_id: user });
		console.log(totalRankings);
		return totalRankings;
	} catch (err) {
		console.log(err);
	}
};
