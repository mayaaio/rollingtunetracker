import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import albumRoutes from "./routes/albumRoutes.js";

// Configure dotenv to load environment variables from '.env' file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.use("/album", albumRoutes);

app.get("/", (req, res) => {
	res.send("Hey this is my API running");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
