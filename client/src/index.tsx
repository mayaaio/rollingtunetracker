import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import reportWebVitals from "./reportWebVitals.js";
import Root from "./Root";

import { MantineProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useMantineColorScheme } from "@mantine/core";

function ColorSchemeHotkeys() {
  // hook is now INSIDE the provider → safe
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  useHotkeys([
    ["mod+J", () => setColorScheme(colorScheme === "dark" ? "light" : "dark")],
  ]);

  return null; // nothing to render – just sets up the shortcut
}

function MantineWrapper() {
  return (
    <MantineProvider
      defaultColorScheme="auto"
      theme={{ respectReducedMotion: false }}
    >
      <ColorSchemeHotkeys /> {/* hot-key helper */}
      <Root /> {/* the rest of your app */}
    </MantineProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <MantineWrapper />
  </React.StrictMode>
);

reportWebVitals();
