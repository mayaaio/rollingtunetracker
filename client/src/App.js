import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import NoAuth from "./pages/NoAuth.tsx";
import Auth from "./pages/Auth.tsx";

function App() {
	const { currentUser } = useAuth();
	return (
		<Router>
			<Routes>
				<Route path="/" element={currentUser ? <Auth /> : <NoAuth />} />
			</Routes>
		</Router>
	);
}

export default App;
