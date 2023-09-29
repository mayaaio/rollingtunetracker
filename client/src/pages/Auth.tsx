import { ActionIcon, AppShell, Group, Header } from "@mantine/core";
import { Logout } from "../components/auth/Logout.tsx";
import { Home } from "./Home.tsx";
import { ToggleColorSchemeButton } from "../components/ToggleColorSchemeButton.tsx";
import { IconSettings } from "@tabler/icons-react";

const Auth = () => {
	return (
		<AppShell
			header={
				<Header height={"64px"}>
					<Group position="apart" px="sm" py="sm">
						<div>logo</div>
						<Group>
							<ToggleColorSchemeButton />
							<Logout />
							<ActionIcon>
								<IconSettings />
							</ActionIcon>
						</Group>
					</Group>
				</Header>
			}
			children={<Home />}
		/>
	);
};

export default Auth;
