import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function connectToDatabase() {
	try {
		// Connect the client to the server
		await client.connect();
		console.log("Connected to MongoDB");
	} catch (err) {
		console.log("Error connecting to MongoDB: ", err);
	}
}

connectToDatabase();

const db = client.db("rollingtunetracker");

export { db };
