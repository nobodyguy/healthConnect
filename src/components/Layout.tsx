import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import AppBar from "./AppBar";

const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout appBar={AppBar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);

export default Layout;
