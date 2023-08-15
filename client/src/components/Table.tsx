import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { config } from "../constants.ts";
import { useQuery } from "react-query";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { AlbumModal } from "./AlbumModal.tsx";
import { MultiSelect } from "@mantine/core";
import axios from "axios";

const backendURL = "http://localhost:3001";

export const Table = () => {
	const { currentUser } = useAuth();
	const URL = config.url;

	const [album, setAlbum] = useState();
	const PAGE_SIZE = 25;
	const [page, setPage] = useState(1);
	const [totalSize, setTotalSize] = useState(0);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
		columnAccessor: "rank",
		direction: "asc",
	});
	const [pagination, setPagination] = useState("");
	const [years, setYears] = useState([]);

	// useEffect(() => {
	// 	console.log("in useEffect");
	// 	//Runs only on the first render to make sure data is cached
	// 	async function cacheData() {
	// 		// perform a query on the cache to make sure it has been created
	// 		var lastAddedQuery = await db.albums
	// 			.orderBy("lastModified", "desc")
	// 			.get({ source: "cache" });

	// 		var isCacheEmpty = lastAddedQuery.size === 0;
	// 		if (isCacheEmpty) {
	// 			// if the cache is empty, create it
	// 			const newCacheQuery = await db.albums
	// 				.orderBy("lastModified", "desc")
	// 				.get();
	// 			// store the most recent update date in local storage
	// 			localStorage.setItem(
	// 				"lastModified",
	// 				newCacheQuery.docs[0].data()["lastModified"]
	// 			);
	// 			setTotalSize(newCacheQuery.size);
	// 			const yrs = new Set();
	// 			newCacheQuery.forEach((album) => yrs.add(album.data().year));
	// 			setYears([...yrs]);
	// 		} else {
	// 			// otherwise, update the cache
	// 			localStorage.setItem(
	// 				"lastModified",
	// 				lastAddedQuery.docs[0].data()["lastModified"]
	// 			);
	// 			const lastModifiedCache = lastAddedQuery.docs[0].data()["lastModified"];
	// 			const updateCacheQuery = await db.albums
	// 				.orderBy("lastModified", "desc")
	// 				.where("lastModified", ">", lastModifiedCache)
	// 				.get();
	// 			setTotalSize(lastAddedQuery.size);
	// 			const yrs = new Set();
	// 			lastAddedQuery.forEach((album) => yrs.add(album.data().year));
	// 			setYears([...yrs]);
	// 		}
	// 	}
	// 	cacheData();
	// }, []);

	const rankingsQuery = useQuery({
		queryKey: [sortStatus, page],
		queryFn: async () => {
			setTotalSize(500);
			console.log("running rankingsQuery");
			try {
				// pagination query
				var albums = [];
				let results = await axios.get(`${backendURL}/album/rankings`, {
					params: { size: PAGE_SIZE, page: page, orderBy: sortStatus },
				});

				results.data.forEach((result) => {
					albums.push(result);
				});

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
					{
						accessor: "img",
						title: "",
						render: ({ img }) => (
							<img src={img} alt={album} width="32" height="32" />
						),
					},
					{ accessor: "title", sortable: true },
					{ accessor: "rank", sortable: true },
					{
						accessor: "artists",
						sortable: true,
						render: ({ artists }) => (
							<div>
								{artists.length === 1
									? artists
									: artists.map((artist) => artist).join(", ")}
							</div>
						),
					},
					{
						accessor: "year",
						sortable: true,
						filter: <MultiSelect data={years} description="Filter by year" />,
					},
				]}
				records={rankingsQuery.data ? rankingsQuery.data : []}
				page={rankingsQuery.data ? page : 0}
				recordsPerPage={PAGE_SIZE}
				totalRecords={totalSize}
				onPageChange={async (p) => {
					if (page < p) {
						setPagination("nextPage");
					} else if (page > p) {
						setPagination("prevPage");
					}

					setPage(p);
				}}
				sortStatus={sortStatus}
				onSortStatusChange={setSortStatus}
				fetching={rankingsQuery.isLoading}
				loaderVariant="bars"
				onRowClick={(row, rowIndex, event) => {
					console.log(event);
					setAlbum(row);
				}}
			/>
		</>
	);
};
