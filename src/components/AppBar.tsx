import { LocalesMenuButton, TitlePortal } from "react-admin";
import { AppBar as MUIAppBar, Toolbar } from "@mui/material";

const AppBar = () => (
  <MUIAppBar>
    <Toolbar>
      <TitlePortal />
      <LocalesMenuButton />
    </Toolbar>
  </MUIAppBar>
);

export default AppBar;
