import { Stack } from "@mantine/core";
import { Table } from "../components/Table";
import { ProgressBar } from "../components/ProgressBar";

export const Home = () => {
  return (
    <Stack>
      <ProgressBar />
      <Table />
    </Stack>
  );
};
