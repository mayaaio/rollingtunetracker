import { IconUser } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { ProfileModal } from "./modals/ProfileModal.tsx";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../contexts/AuthContext";

export const Profile = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const { currentUser } = useAuth();
	console.log(currentUser.customData);
	console.log(currentUser);
	return (
		<>
			<ProfileModal opened={opened} onClose={close} />
			<ActionIcon onClick={open}>
				<IconUser />
			</ActionIcon>
		</>
	);
};
