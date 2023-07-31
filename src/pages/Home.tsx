import { AppShell, Group, Header } from "@mantine/core";
import { Logout } from "../components/auth/Logout";
import { Table } from "../components/Table";

const Home = () => {
	return (
		<AppShell
			header={
				<Header height={"64px"}>
					<Group position="apart">
						<div>logo</div>
						<Logout />
					</Group>
				</Header>
			}
			children={<Table />}
		/>
	);
};

export default Home;
