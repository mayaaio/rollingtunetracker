import {
  ActionIcon,
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
import { useAuth } from "../../contexts/AuthContext";
import { IconBrandSpotify } from "@tabler/icons-react";
import { Album } from "../../types/Albums";
import { config } from "../../constants";

export const AlbumModal = ({ album, setAlbum }) => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState(album?.notes ? album.notes : "");
  const [rating, setRating] = useState<number | "">(
    album?.rating ? album.rating : ""
  );
  const [editMode, setEditMode] = useState(!album.listened);
  const queryClient = useQueryClient();
  const backendURL = config.url;

  const handleRemoveListen = useMutation({
    mutationFn: async (album: Album) => {
      // delete the listen
      const deleted = await axios.delete(
        `${backendURL}/album/deleteListen/${currentUser.id + "_" + album._id}`
      );
      return deleted;
    },
    onSuccess: () => {
      // Invalidate and refetch
      setAlbum();
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
  });

  const handleListenToAlbum = useMutation({
    mutationFn: async (album: Album) => {
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

  const handleEditListen = useMutation({
    mutationFn: async (album: Album) => {
      // update the listen
      const updated = await axios.put(`${backendURL}/album/updateListen/`, {
        user_id: currentUser.id,
        album_id: album._id,
        notes: notes,
        rating: rating,
      });
      return updated;
    },
    onSuccess: () => {
      // Invalidate and refetch
      setAlbum();
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
  });

  return (
    album && (
      <Modal
        opened={album}
        onClose={() => {
          setAlbum();
        }}
        size="100%"
        withCloseButton={false}
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
      >
        <Group grow align="stretch">
          <img src={album.img} alt="album cover" width="50%" />
          <Stack>
            <Box>
              <Text
                style={{
                  fontFamily: "Publico Banner Web Ultra Regular",
                }}
                fw={600}
                fz={100}
                py="0"
              >
                {album.rank}
              </Text>
              <Text fw={700}>
                {album.artists.map((artist) => artist)}, '{album.title}'
              </Text>
              <Text fw={700}>
                {album.labels.map((label) => label + ", ")}
                {album.year}
              </Text>
              {album.spotifyUri && (
                <ActionIcon
                  aria-label="Spotify link icon"
                  component="a"
                  href={"https://open.spotify.com/album/" + album.spotifyUri}
                  target="_blank"
                >
                  <IconBrandSpotify />
                </ActionIcon>
              )}
            </Box>
            <Divider />
            <Box>
              <Stack justify="space-between">
                <Stack justify="flex-start">
                  {
                    <NumberInput
                      label="Album rating"
                      variant="unstyled"
                      placeholder="Your rating"
                      value={rating}
                      onChange={(value) => {
                        if (typeof value === "number" || value === "") {
                          setRating(value);
                        }
                      }}
                      min={0}
                      max={10}
                      disabled={!editMode}
                    />
                  }

                  {
                    <Textarea
                      autosize
                      minRows={2}
                      label="Album notes"
                      placeholder="Add your album notes"
                      value={notes}
                      onChange={(event) => setNotes(event.currentTarget.value)}
                      disabled={!editMode}
                    />
                  }
                </Stack>
                <Group justify="flex-end">
                  {!album.listened && (
                    <Button onClick={() => handleListenToAlbum.mutate(album)}>
                      Mark album as listened to
                    </Button>
                  )}
                  {album.listened && !editMode && (
                    <Button
                      color="red"
                      variant="outline"
                      onClick={() => handleRemoveListen.mutate(album)}
                    >
                      Remove listen
                    </Button>
                  )}
                  {album.listened && !editMode && (
                    <Button onClick={() => setEditMode(true)}>
                      Edit listen
                    </Button>
                  )}
                  {album.listened && editMode && (
                    <Button
                      color="red"
                      variant="outline"
                      onClick={() => {
                        setRating(album?.rating ? album.rating : "");
                        setNotes(album?.notes ? album.notes : "");
                        setEditMode(false);
                      }}
                    >
                      Discard edits
                    </Button>
                  )}
                  {album.listened && editMode && (
                    <Button onClick={() => handleEditListen.mutate(album)}>
                      Update listen
                    </Button>
                  )}
                </Group>
              </Stack>
            </Box>
          </Stack>
        </Group>
      </Modal>
    )
  );
};
