import { AppShell, Group, Header } from "@mantine/core";
import { Logout } from "../components/auth/Logout.tsx";
import { Home } from "./Home.tsx";
import { ToggleColorSchemeButton } from "../components/ToggleColorSchemeButton.tsx";
import { Profile } from "../components/Profile.tsx";
import { Settings } from "../components/Settings.tsx";

const Auth = () => {
	return (
		<AppShell
			header={
				<Header height={"64px"}>
					<Group position="apart" px="sm" py="sm">
						<div>logo</div>
						<Group>
							<ToggleColorSchemeButton />
							<Settings />
							<Profile />
							<Logout />
						</Group>
					</Group>
				</Header>
			}
			children={<Home />}
		/>
	);
};

export default Auth;
