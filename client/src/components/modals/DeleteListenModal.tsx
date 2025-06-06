import { Button, Group, Modal } from "@mantine/core";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../contexts/AuthContext";
import { Album } from "../../types/Albums";
import { config } from "../../constants";

export const DeleteListenModal = ({ album, setAlbum }) => {
  const backendURL = config.url;
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const handleRemoveAlbumListen = useMutation({
    mutationFn: async (album: Album) => {
      try {
        if (album.listened) {
          // delete the listen
          const deleted = await axios.delete(
            `${backendURL}/album/deleteListen/${
              currentUser.id + "_" + album._id
            }`
          );
          return deleted;
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
      <Modal opened={album} onClose={() => setAlbum()} withCloseButton={false}>
        Are you sure you want to delete your listen of {album.title} by{" "}
        {album.artists.map((artist) => artist).join(", ")}?
        <Group justify="apart" py="sm">
          <Button variant="outline" onClick={() => setAlbum()}>
            No, go back
          </Button>
          <Button
            variant="outline"
            color="red"
            onClick={() => handleRemoveAlbumListen.mutate(album)}
          >
            Yes, remove this listen
          </Button>
        </Group>
      </Modal>
    )
  );
};
