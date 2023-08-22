import { AppShell, Group, Header } from "@mantine/core";
import { Logout } from "../components/auth/Logout.tsx";
import { Home } from "./Home.tsx";

const Auth = () => {
	return (
		<AppShell
			header={
				<Header height={"64px"}>
					<Group position="apart">
						<div>logo</div>
						<Logout />
					</Group>
				</Header>
			}
			children={<Home />}
		/>
	);
};

export default Auth;
