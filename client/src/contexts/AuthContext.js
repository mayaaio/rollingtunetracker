import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { App, Credentials } from "realm-web";

// Creating a Realm App Instance
const app = new App(process.env.REACT_APP_APP_ID);

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function login(email, password) {
		// return auth.sign
		const credentials = Credentials.emailPassword(email, password);
		const authenticatedUser = await app.logIn(credentials);
		localStorage.setItem("user", JSON.stringify(authenticatedUser));
		setCurrentUser(authenticatedUser);
		return authenticatedUser;
	}

	async function logout() {
		// return auth.signOut();

		if (!app.currentUser) {
			setCurrentUser(null);
			return false;
		}
		try {
			await app.currentUser.logOut();
			localStorage.removeItem("user");
			setCurrentUser(null);
			return true;
		} catch (error) {
			throw error;
		}
	}

	async function signup(email, password) {
		// return auth.createUserWithEmailAndPassword(email, password);
		console.log(email);
		console.log(password);
		try {
			await app.emailPasswordAuth.registerUser(email, password);
			return login(email, password);
		} catch (error) {
			throw error;
		}
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (storedUser) {
			setCurrentUser(storedUser);
			setLoading(false);
		} else {
			setLoading(false);
		}
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
