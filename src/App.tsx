import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";

import Layout from "./components/Layout";
import dataProvider from "./providers/data/dataProvider";
import authProvider from "./providers/auth/authProvider";
import i18nProvider from "./providers/i18n/i18nProvider";

export const App = () => (
  <Admin
    title="healthConnect"
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    requireAuth
    disableTelemetry
  >
    <Resource
      name="posts"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="comments"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
