import { Modal } from "@mantine/core";

export const ProfileModal = ({ opened, onClose }) => {
	return (
		<Modal opened={opened} onClose={onClose}>
			Hi
		</Modal>
	);
};
