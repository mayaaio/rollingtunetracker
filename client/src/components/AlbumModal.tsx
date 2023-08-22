import {
	Box,
	Button,
	Divider,
	Group,
	Modal,
	NumberInput,
	Stack,
	Text,
	Textarea,
	Transition,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../contexts/AuthContext";

export const AlbumModal = ({ album, setAlbum }) => {
	const { currentUser } = useAuth();
	const [notes, setNotes] = useState(album?.notes ? album.notes : "");
	const [rating, setRating] = useState<number | "">(
		album?.rating ? album.rating : ""
	);
	const [editMode, setEditMode] = useState(!album.listened);
	const queryClient = useQueryClient();
	const backendURL = "http://localhost:3001";

	const handleListenToAlbum = useMutation({
		mutationFn: async (album) => {
			try {
				if (album.listened) {
					// update the listen
					const updated = await axios.put(`${backendURL}/album/updateListen/`, {
						user_id: currentUser.id,
						album_id: album._id,
						notes: notes,
						rating: rating,
					});
					return updated;
				} else {
					// add a listen
					const listened = await axios.post(`${backendURL}/album/listen`, {
						user_id: currentUser.id,
						album_id: album._id,
						notes: notes,
						rating: rating,
					});
					return listened;
				}
			} catch (err) {
				console.log(err);
			}
		},
		onSuccess: () => {
			// Invalidate and refetch
			setAlbum();
			queryClient.invalidateQueries({ queryKey: ["albums"] });
		},
	});

	return (
		album && (
			<>
				<Transition
					mounted={album}
					transition="fade"
					duration={400}
					timingFunction="ease"
					onEnter={() => console.log("entering")}
					onEntered={() => console.log("entered")}
					onExit={() => console.log("exiting")}
					onExited={() => console.log("exited")}
				>
					{(styles) => (
						<Modal
							style={styles}
							opened={album}
							onClose={() => {
								setAlbum();
							}}
							size="100%"
							withCloseButton={false}
						>
							<Group grow align="stretch">
								<img src={album.img} alt="album cover" width="50%" />
								<Stack>
									{/* <Stack justify="flex-start" spacing="0"> */}
									<Box>
										<Text
											sx={{
												fontFamily: "Publico Banner Web Ultra Regular",
											}}
											fw={600}
											fz={100}
											py="0"
										>
											{album.rank}
										</Text>
										<Text>
											{album.artists.map((artist) => artist)}, {album.title}
										</Text>
										<Text>label, {album.year}</Text>
									</Box>
									{/* </Stack> */}
									<Divider />
									{/* <Stack justify="space-between"> */}
									<Box>
										{!album.rating && (
											<NumberInput
												label="Album rating"
												variant="unstyled"
												placeholder="Your rating"
												value={rating}
												onChange={setRating}
												min={0}
												max={10}
												precision={1}
											/>
										)}
										{album.rating && (
											<Stack>
												<Text>Album rating</Text>
												<Text>{album.rating}</Text>
											</Stack>
										)}
										{!album.notes && (
											<Textarea
												autosize
												minRows={2}
												label="Album notes"
												placeholder="Add your album notes"
												value={notes}
												onChange={(event) =>
													setNotes(event.currentTarget.value)
												}
											/>
										)}

										{album.notes && (
											<Stack>
												<Text>Album notes</Text>
												<Text>{album.notes}</Text>
											</Stack>
										)}
										<Group>
											{!album.listened && (
												<Button
													onClick={() => handleListenToAlbum.mutate(album)}
												>
													Mark album as listened to
												</Button>
											)}
											{album.listened && (
												<Button
													color="red"
													variant="outline"
													onClick={() => handleListenToAlbum.mutate(album)}
												>
													Remove listen
												</Button>
											)}
											{album.listened && (
												<Button
													onClick={() => handleListenToAlbum.mutate(album)}
												>
													Update listen
												</Button>
											)}
										</Group>
									</Box>
									{/* </Stack> */}
								</Stack>
							</Group>
						</Modal>
					)}
				</Transition>
			</>
		)
	);
};
