import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { config } from "../constants";
import { useQuery } from "react-query";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { db } from "../firebase";
import data from "../found.json";
import { AlbumModal } from "./AlbumModal";

export const Table = () => {
	const { currentUser } = useAuth();
	const URL = config.url;

	const [album, setAlbum] = useState();
	const PAGE_SIZE = 50;
	const [page, setPage] = useState(1);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
		columnAccessor: "rank",
		direction: "asc",
	});

	const rankingsQuery = useQuery({
		queryKey: [sortStatus],
		queryFn: async () => {
			try {
				var albums = [];
				const albumsSnapshot = await db.albums
					.orderBy(sortStatus.columnAccessor, sortStatus.direction)
					.limit(PAGE_SIZE)
					.get();
				console.log(albumsSnapshot.size);

				albumsSnapshot.forEach((doc) => {
					const data = doc.data();
					albums.push(data);
				});

				// console.log(currentUser.uid);
				// const rankingsSnapshot = await db.rankings
				// 	.where("user", "==", currentUser.uid)
				// 	.get();
				// rankingsSnapshot.forEach((doc) => {
				// 	console.log(doc.data());
				// 	console.log(doc.id);
				// });

				// Object.keys(data).forEach(function (key) {
				// 	albums.push(data[key]);
				// });

				return albums;
			} catch (err) {
				console.log(err);
			}
		},
		keepPreviousData: true,
	});

	return (
		<>
			<AlbumModal album={album} setAlbum={setAlbum} />
			<DataTable
				columns={[
					{ accessor: "title", sortable: true },
					{ accessor: "rank", sortable: true },
					{ accessor: "artists", sortable: true },
					{ accessor: "year", sortable: true },
				]}
				records={rankingsQuery.data ? rankingsQuery.data : []}
				page={rankingsQuery.data ? page : 0}
				recordsPerPage={PAGE_SIZE}
				totalRecords={rankingsQuery.data ? rankingsQuery.data.length : 0}
				onPageChange={(p) => setPage(p)}
				sortStatus={sortStatus}
				onSortStatusChange={setSortStatus}
				fetching={rankingsQuery.isLoading}
				loaderVariant="bars"
				onRowClick={(row, rowIndex, event) => {
					setAlbum(row);
				}}
			/>
		</>
	);
};
