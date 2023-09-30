import { Modal } from "@mantine/core";
import { ProfilePicture } from "../ProfilePicture.tsx";

export const ProfileModal = ({ opened, onClose }) => {
	return (
		<Modal opened={opened} onClose={onClose} title="Profile & Account">
			<ProfilePicture />
		</Modal>
	);
};
