import { useState, useEffect } from "react";
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";

import Layout from "./components/Layout";
import { DataProvider } from "ra-core";
import authProvider from "./providers/auth/authProvider";
import startDataProvider from "./providers/data/dataProvider";
import i18nProvider from "./providers/i18n/i18nProvider";


export const App = () => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);

  useEffect(() => {
    if (dataProvider === null) {
      startDataProvider(setDataProvider);
    }
  }, [dataProvider]);

  // hide the admin until the data provider is ready
  if (!dataProvider) return <p>Loading...</p>;

  return (
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
  )
};
