import { Progress, Text } from "@mantine/core";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "react-query";
import axios from "axios";
import { config } from "../constants";

const backendURL = config.url;

export const ProgressBar = () => {
  const { currentUser } = useAuth();

  const progressQuery = useQuery({
    queryKey: ["albums"],
    queryFn: async () => {
      try {
        let results = await axios.get(`${backendURL}/album/totalRankings`, {
          params: { user: currentUser.id },
        });
        return results.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <Progress
        color="dark"
        value={progressQuery.data ? (progressQuery.data / 500) * 100 : 0}
      />
      <Text>
        {progressQuery.data} albums listened to, {500 - progressQuery.data}{" "}
        remaining!
      </Text>
    </>
  );
};
