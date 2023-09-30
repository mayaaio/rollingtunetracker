import { Avatar, FileInput } from "@mantine/core";
import { useState } from "react";

export const ProfilePicture = () => {
	const [value, setValue] = useState<File | null>(null);
	return (
		<Avatar src="avatar.png" alt="it's me" radius="xl" size="xl">
			<FileInput
				value={value}
				onChange={setValue}
				variant="unstyled"
				accept="image/png,image/jpeg"
			/>
		</Avatar>
	);
};
