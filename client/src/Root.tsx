import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from "@mantine/core";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import { useColorScheme, useHotkeys } from "@mantine/hooks";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function Root() {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] =
		useState<ColorScheme>(preferredColorScheme);

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

	return (
		<QueryClientProvider client={queryClient}>
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					theme={{ colorScheme, respectReducedMotion: false }}
					withGlobalStyles
					withNormalizeCSS
				>
					<AuthProvider>
						<App />
					</AuthProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</QueryClientProvider>
	);
}

export default Root;
