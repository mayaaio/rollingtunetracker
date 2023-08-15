import { AppShell, Group, Header } from "@mantine/core";
import { Logout } from "../components/auth/Logout.tsx";
import { Table } from "../components/Table.tsx";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
	const { currentUser } = useAuth();
	console.log(currentUser);
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
