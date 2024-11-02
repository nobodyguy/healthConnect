import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Route } from 'react-router-dom';

import Layout from "./components/Layout";
import authProvider from "./providers/auth/authProvider";
import { useDataProvider, DataProvider } from "./providers/data/dataProvider";
import i18nProvider from "./providers/i18n/i18nProvider";

import { AppointmentList, AppointmentIcon } from "./resources/appointments";

import RequestsList from "./components/pages/lists/RequestsList";
import PatientsList from "./components/pages/lists/PatientsList";
import UsersList from "./components/pages/lists/UsersList";
import FilesList from "./components/pages/lists/FilesList";
import ConversationsList from "./components/pages/lists/ConversationsList";

import PatientCreateRecord from "./components/pages/create/PatientCreate";
import RequestCreateRecord from "./components/pages/create/RequestCreate";
import UserCreateRecord from "./components/pages/create/UserCreate";
import FileCreateRecord from "./components/pages/create/FileCreate";
import ConversationCreateRecord from "./components/pages/create/ConversationCreate";


export const App = () => (
  <DataProvider>
    <AppContainer />
  </DataProvider>
)

const AppContainer = () => {
  const { dataProvider } = useDataProvider()

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
      {(permissions: string) => (
        <>
          {permissions === "doctor" ? (
            <Resource
              name="appointments"
              list={AppointmentList}
              icon={AppointmentIcon}
            />
          ) : null}
        </>
      )}
      <Resource
        name="requests"
        list={RequestsList}
        edit={EditGuesser}
        show={ShowGuesser}
        create={RequestCreateRecord}
      >
        <Route
          path=":id/files"
          element={
            <Resource
              name="files"
              list={FilesList}
              edit={EditGuesser}
              show={ShowGuesser}
              create={FileCreateRecord}
            />
          }
        />
        <Route
          path=":id/conversations"
          element={
            <Resource
              name="conversations"
              list={ConversationsList}
              edit={EditGuesser}
              show={ShowGuesser}
              create={ConversationCreateRecord}
            />
          }
        />
      </Resource>
      <Resource
        name="patients"
        list={PatientsList}
        edit={EditGuesser}
        show={ShowGuesser}
        create={PatientCreateRecord}
      />
      <Resource
        name="users"
        list={UsersList}
        edit={EditGuesser}
        show={ShowGuesser}
        create={UserCreateRecord}
      />
    </Admin>
  )
};
