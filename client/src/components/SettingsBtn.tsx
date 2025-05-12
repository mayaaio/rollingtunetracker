import { ActionIcon } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { SettingsModal } from "./modals/SettingsModal";
import { useDisclosure } from "@mantine/hooks";

export const Settings = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <SettingsModal opened={opened} onClose={close} />
      <ActionIcon onClick={open}>
        <IconSettings />
      </ActionIcon>
    </>
  );
};
