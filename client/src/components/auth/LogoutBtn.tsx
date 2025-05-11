import { ActionIcon } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";
import { IconLogout } from "@tabler/icons-react";

export const Logout = () => {
  const { logout, currentUser } = useAuth();

  const logOut = async () => {
    try {
      // Calling the logOutUser function from the user context.
      const loggedOut = await logout();
      // Now we will refresh the page, and the user will be logged out and
      // redirected to the login page because of the <PrivateRoute /> component.
      if (loggedOut) {
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <ActionIcon onClick={logOut}>
      <IconLogout />
    </ActionIcon>
  );
};
