import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import NoAuth from "./pages/NoAuth.tsx";
import Home from "./pages/Home.tsx";

function App() {
	const { currentUser } = useAuth();
	return (
		<Router>
			<Routes>
				<Route path="/" element={currentUser ? <Home /> : <NoAuth />} />
			</Routes>
		</Router>
	);
}

export default App;
