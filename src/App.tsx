import { Admin, Resource } from "react-admin";
import {
  Person as UserIcon,
  MedicalServices as PatientIcon,
  Assignment as RequestIcon
} from "@mui/icons-material"

import Layout from "./components/Layout";
import authProvider from "./providers/auth/authProvider";
import { useDataProvider, DataProvider } from "./providers/data/dataProvider";
import i18nProvider from "./providers/i18n/i18nProvider";

import {
  AppointmentList,
  AppointmentListCalendar,
  AppointmentIcon
} from "./resources/appointments";

import RequestsList from "./components/pages/lists/RequestsList";
import PatientsList from "./components/pages/lists/PatientsList";
import UsersList from "./components/pages/lists/UsersList";

import Dashboard from "./components/dashboard/Dashboard";

import PatientCreateRecord from "./components/pages/create/PatientCreate";
import RequestCreateRecord from "./components/pages/create/RequestCreate";
import UserCreateRecord from "./components/pages/create/UserCreate";

import { RequestView } from "./components/pages/views/RequestsView";
import { PatientView } from "./components/pages/views/PatientView";
import { UserView } from "./components/pages/views/UserView";

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
            edit={() => RequestView("edit")}
            show={() => RequestView("show")}
            create={RequestCreateRecord}
            icon={RequestIcon}
          />
          <Resource
            name="patients"
            list={PatientsList}
            edit={permissions === "doctor" ? () => PatientView("edit") : undefined}
            show={() => PatientView("show")}
            create={permissions === "doctor" ? PatientCreateRecord : undefined}
            icon={PatientIcon}
          />
          <Resource
            name="users"
            list={permissions === "doctor" ? UsersList : undefined}
            edit={permissions === "doctor" ? () => UserView("edit") : undefined}
            show={() => UserView("show")}
            create={permissions === "doctor" ? UserCreateRecord : undefined}
            icon={UserIcon}
          />
        </>
      )}
    </Admin>
  );
};
