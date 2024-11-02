import { Admin, Resource, EditGuesser, ShowGuesser } from "react-admin";
import { Route } from "react-router-dom";

import Layout from "./components/Layout";
import authProvider from "./providers/auth/authProvider";
import { useDataProvider, DataProvider } from "./providers/data/dataProvider";
import i18nProvider from "./providers/i18n/i18nProvider";

import {
  AppointmentList,
  AppointmentListCalendar,
  AppointmentIcon,
} from "./resources/appointments";

import RequestsList from "./components/pages/lists/RequestsList";
import PatientsList from "./components/pages/lists/PatientsList";
import UsersList from "./components/pages/lists/UsersList";
import FilesList from "./components/pages/lists/FilesList";

import Dashboard from "./components/dashboard/Dashboard";

import PatientCreateRecord from "./components/pages/create/PatientCreate";
import RequestCreateRecord from "./components/pages/create/RequestCreate";
import UserCreateRecord from "./components/pages/create/UserCreate";
import FileCreateRecord from "./components/pages/create/FileCreate";
import { TicketShow } from "./components/tickets/TicketShow";
import { RequestShow } from "./components/pages/views/RequestsView";

export const App = () => (
  <DataProvider>
    <AppContainer />
  </DataProvider>
);

const AppContainer = () => {
  const { dataProvider } = useDataProvider();

  // hide the admin until the data provider is ready
  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin
      title="healthConnect"
      layout={Layout}
      dashboard={Dashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      requireAuth
      disableTelemetry
    >
      {(permissions: string) => (
        <>
          <Resource
            name="appointments"
            list={
              permissions === "doctor"
                ? AppointmentListCalendar
                : AppointmentList
            }
            icon={AppointmentIcon}
          />
          <Resource
            name="requests"
            list={RequestsList}
            edit={EditGuesser}
            show={RequestShow}
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
              element={<Resource name="conversations" list={<TicketShow />} />}
            />
          </Resource>
          <Resource
            name="patients"
            list={PatientsList}
            edit={permissions === "doctor" ? EditGuesser : undefined}
            show={ShowGuesser}
            create={permissions === "doctor" ? PatientCreateRecord : undefined}
          />
          <Resource
            name="users"
            list={permissions === "doctor" ? UsersList : undefined}
            edit={permissions === "doctor" ? EditGuesser : undefined}
            show={ShowGuesser}
            create={permissions === "doctor" ? UserCreateRecord : undefined}
          />
        </>
      )}
    </Admin>
  );
};
