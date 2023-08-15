import { connectToDatabase } from "../db.js";

export const getAlbums = async (params) => {
	try {
		const db = await connectToDatabase();
		const coll = db.collection("albums");

		const filter = {};
		const sort = params.sort;
		const skip = (parseInt(params.page) - 1) * parseInt(params.size);
		const limit = parseInt(params.size);

		const cursor = coll.find(filter, { sort, skip, limit });
		const result = await cursor.toArray();
		return result;
	} catch (err) {
		console.log(err);
	}
};
