const production = {
	url: process.env.REACT_APP_API_URL,
};
const development = {
	url: "http://localhost:3001",
};

export const config =
	process.env.NODE_ENV === "development" ? development : production;
