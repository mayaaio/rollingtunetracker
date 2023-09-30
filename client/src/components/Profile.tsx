import { IconUser } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { ProfileModal } from "./modals/ProfileModal.tsx";
import { useDisclosure } from "@mantine/hooks";
export const Profile = () => {
	const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<ProfileModal opened={opened} onClose={close} />
			<ActionIcon onClick={open}>
				<IconUser />
			</ActionIcon>
		</>
	);
};
