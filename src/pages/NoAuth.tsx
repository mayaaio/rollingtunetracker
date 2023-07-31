import { Center } from "@mantine/core";
import { useState } from "react";
import SignIn from "../components/auth/SignIn";
import Signup from "../components/auth/Signup";

const NoAuth = () => {
	const [signIn, setSignIn] = useState(true);

	return (
		<Center my={40}>
			{signIn ? (
				<SignIn setSignIn={setSignIn} />
			) : (
				<Signup setSignIn={setSignIn} />
			)}
		</Center>
	);
};

export default NoAuth;
