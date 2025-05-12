import { Modal } from "@mantine/core";
import { ProfilePicture } from "../ProfilePicture";

export const ProfileModal = ({ opened, onClose }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Profile & Account">
      <ProfilePicture />
    </Modal>
  );
};
