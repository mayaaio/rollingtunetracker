import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

function ToggleColorSchemeButton() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";
	return (
		<ActionIcon
			variant="outline"
			color={dark ? "yellow" : "blue"}
			onClick={() => toggleColorScheme()}
		>
			{dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
		</ActionIcon>
	);
}

export default ToggleColorSchemeButton;
