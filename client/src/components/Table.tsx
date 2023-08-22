import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { config } from "../constants.ts";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { AlbumModal } from "./AlbumModal.tsx";
import { DeleteListenModal } from "./DeleteListenModal.tsx";
import { MultiSelect } from "@mantine/core";
import axios from "axios";

const backendURL = "http://localhost:3001";

export const Table = () => {
	const { currentUser } = useAuth();
	const queryClient = useQueryClient();
	const URL = config.url;

	const [album, setAlbum] = useState();
	const [deleteAlbumListen, setDeleteAlbumListen] = useState();
	const [pageSize, setPageSize] = useState(25);
	const [page, setPage] = useState(1);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
		columnAccessor: "rank",
		direction: "asc",
	});
	const [selectedYears, setSelectedYears] = useState([]);

	const yearsQuery = useQuery({
		queryKey: [],
		queryFn: async () => {
			try {
				let results = await axios.get(`${backendURL}/album/years`);
				let stringYears = [];
				results.data.forEach((year) => {
					stringYears.push(year + "");
				});
				return stringYears;
			} catch (err) {
				console.log(err);
			}
		},
	});

	const totalAlbumsQuery = useQuery({
		queryKey: [selectedYears],
		queryFn: async () => {
			try {
				let result = await axios.get(`${backendURL}/album/albumsCount`, {
					params: {
						filter: selectedYears,
					},
				});
				setPage(1);
				return result.data;
			} catch (err) {
				console.log(err);
			}
		},
	});

	const albumsQuery = useQuery({
		queryKey: ["albums", sortStatus, page, pageSize, selectedYears],
		queryFn: async () => {
			try {
				// pagination query
				let results = await axios.get(`${backendURL}/album/rankings`, {
					params: {
						size: pageSize,
						page: page,
						orderBy: sortStatus,
						filter: selectedYears,
						user_id: currentUser.id,
					},
				});
				return results.data;
			} catch (err) {
				console.log(err);
			}
		},
		keepPreviousData: true,
	});

	const handleAlbumShiftClick = useMutation({
		mutationFn: async (row) => {
			try {
				if (row.listened) {
					// delete the listen
					const deleted = await axios.delete(
						`${backendURL}/album/deleteListen/${currentUser.id + "_" + row._id}`
					);
					return deleted;
				} else {
					// add a listen
					const listened = await axios.post(`${backendURL}/album/listen`, {
						user_id: currentUser.id,
						album_id: row._id,
					});
					return listened;
				}
			} catch (err) {
				console.log(err);
			}
		},
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["albums"] });
		},
	});

	return (
		<>
			{album && <AlbumModal album={album} setAlbum={setAlbum} />}
			<DeleteListenModal
				album={deleteAlbumListen}
				setAlbum={setDeleteAlbumListen}
			/>
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
					{ accessor: "rating" },
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
						filter: (
							<MultiSelect
								data={yearsQuery.data ? yearsQuery.data : []}
								description="Filter by year"
								value={selectedYears}
								onChange={setSelectedYears}
								clearable
								searchable
							/>
						),
						filtering: selectedYears.length > 0,
					},
				]}
				records={albumsQuery.data ? albumsQuery.data : []}
				page={albumsQuery.data ? page : 0}
				recordsPerPage={pageSize}
				totalRecords={totalAlbumsQuery.data ? totalAlbumsQuery.data : 500}
				onPageChange={async (p) => {
					setPage(p);
				}}
				sortStatus={sortStatus}
				onSortStatusChange={setSortStatus}
				fetching={albumsQuery.isLoading}
				loaderVariant="bars"
				onRowClick={(row, rowIndex, event) => {
					if (event.shiftKey) {
						if (row.listened) {
							setDeleteAlbumListen(row);
						} else {
							handleAlbumShiftClick.mutate(row);
						}
					} else {
						setAlbum(row);
					}
				}}
				recordsPerPageOptions={[10, 15, 20, 25]}
				onRecordsPerPageChange={setPageSize}
				textSelectionDisabled
				rowStyle={({ listened }) => (listened ? { color: "grey" } : undefined)}
			/>
		</>
	);
};
