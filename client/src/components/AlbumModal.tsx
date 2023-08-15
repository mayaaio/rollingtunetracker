import {
	Button,
	Group,
	Modal,
	Stack,
	Textarea,
	Transition,
} from "@mantine/core";

export const AlbumModal = ({ album, setAlbum }) => {
	return (
		album && (
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
						onClose={() => setAlbum()}
						size="100%"
						withCloseButton={false}
					>
						<Group grow>
							<img src={album.img} alt="album cover" width="50%" />
							<Stack justify="apart">
								<div>
									<h1>{album.rank}</h1>
									<h2>{album.title}</h2>
									<h3>{album.artists.map((artist) => artist)}</h3>
									<Group>
										<div>{album.year}</div>
										<div>label</div>
									</Group>
								</div>
								<div>
									<Textarea autosize minRows={2}></Textarea>
								</div>
							</Stack>
						</Group>
					</Modal>
				)}
			</Transition>
		)
	);
};
