import { AppShell, Group } from "@mantine/core";
import { Logout } from "../components/auth/LogoutBtn";
import { Home } from "./HomePage";
import { ToggleColorSchemeButton } from "../components/ColorToggle";
import { Profile } from "../components/UserProfile";
import { Settings } from "../components/SettingsBtn";
import { App } from "realm-web";

const Auth = () => {
  return (
    <AppShell header={{ height: 64 }}>
      <AppShell.Header>
        <Group justify="apart" px="sm" py="sm">
          <div>logo</div>
          <Group>
            <ToggleColorSchemeButton />
            <Settings />
            <Profile />
            <Logout />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main mx="sm" my="sm">
        <Home />
      </AppShell.Main>
    </AppShell>
  );
};

export default Auth;
