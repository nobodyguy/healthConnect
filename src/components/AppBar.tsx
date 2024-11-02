import * as React from "react";
import {
  AppBar as RAAppBar,
  UserMenu,
  useUserMenu,
  Logout,
  useTranslate,
} from "react-admin";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  MenuItemProps,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const SettingsMenuItem: React.FC<MenuItemProps> = React.forwardRef(
  (props, ref) => {
    // We are not using MenuItemLink so we retrieve the onClose function from the UserContext
    const { onClose } = useUserMenu();
    const translate = useTranslate();
    return (
      <MenuItem
        onClick={onClose}
        ref={ref}
        // It's important to pass the props to allow Material UI to manage the keyboard navigation
        {...props}
      >
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>{translate("ui.settings")}</ListItemText>
      </MenuItem>
    );
  },
);

const AppBar = () => (
  <RAAppBar
    userMenu={
      <UserMenu>
        <SettingsMenuItem />
        <Logout />
      </UserMenu>
    }
  />
);

export default AppBar;
