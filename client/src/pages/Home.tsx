import { Stack } from "@mantine/core";
import { Table } from "../components/Table.tsx";
import { ProgressBar } from "../components/ProgressBar.tsx";

export const Home = () => {
	return (
		<Stack>
			<ProgressBar />
			<Table />
		</Stack>
	);
};
