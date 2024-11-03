import * as React from "react";
import {
  DateField,
  TextField,
  ReferenceField,
  ResourceContextProvider,
  useList,
  Datagrid,
  ListContextProvider,
} from "react-admin"; // eslint-disable-line import/no-unresolved
import ListPage from "../../../components/ListPage";
import { StyledChip } from "../../styled";

const RequestsList: React.FC<{}> = () => {
  const elements = [
    <TextField source="id" />,
    <TextField source="title" cellClassName="title" />,
    <ReferenceField source="patient_id" reference="patients">
      <TextField source="name" />
      <TextField source="surname" />
    </ReferenceField>,
    <ReferenceField source="user_id" reference="users">
      <TextField source="fullName" />
    </ReferenceField>,
    <DateField
      source="created"
      sortByOrder="DESC"
      cellClassName="created"
      showTime
      locales="cs-CZ"
    />,
    <DateField
      source="last_update"
      sortByOrder="DESC"
      cellClassName="last_update"
      showTime
      locales="cs-CZ"
    />,
    <StyledChip source="status" />,
    <StyledChip source="category" />,
    <StyledChip source="urgency" />,
  ];

  return <ListPage elements={elements} />;
};

export const OpenRequestsWidget = () => {
  const data = [
    {
      id: 1,
      patient: "Karel Novák",
      user_id: 1,
      status: "open",
      category: "consultation",
      urgency: "high",
      created: "2024-11-01T00:45:36.728Z",
      last_update: "2024-11-02T00:45:36.728Z",
      title: "Konzultace",
    },
  ];
  const listContext = useList({ data });
  return (
    <ResourceContextProvider value="requests">
      <ListContextProvider value={listContext}>
        <Datagrid>
          <TextField source="title" cellClassName="title" />,
          <TextField source="patient" />
          <StyledChip source="category" />
          <StyledChip source="urgency" />
          <DateField
            source="last_update"
            sortByOrder="DESC"
            cellClassName="last_update"
            showTime
            locales="cs-CZ"
          />
          ,
        </Datagrid>
      </ListContextProvider>
    </ResourceContextProvider>
  );
};

export default RequestsList;
