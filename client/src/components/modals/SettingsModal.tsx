import { Modal } from "@mantine/core";

export const SettingsModal = ({ opened, onClose }) => {
	return <Modal opened={opened} onClose={onClose}></Modal>;
};
