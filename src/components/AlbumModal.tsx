import { Modal } from "@mantine/core";

export const AlbumModal = ({ album, setAlbum }) => {
	return (
		<>
			{album && (
				<Modal opened={album} onClose={() => setAlbum()} title={album.title} />
			)}
		</>
	);
};
