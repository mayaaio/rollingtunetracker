import { ActionIcon } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";
import { IconLogout } from "@tabler/icons-react";

export const Logout = () => {
	const { logout } = useAuth();
	return (
		<ActionIcon onClick={logout}>
			<IconLogout />
		</ActionIcon>
	);
};
