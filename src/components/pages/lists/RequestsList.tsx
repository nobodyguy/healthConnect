import * as React from "react";
import {
  DateField,
  TextField,
  ReferenceField,
  ReferenceManyCount,
  Datagrid,
  List,
} from "react-admin"; // eslint-disable-line import/no-unresolved
import ListPage from "../../../components/ListPage";
import { StyledChip } from "../../styled";
import requests from "../../../providers/data/requests";

const RequestsList: React.FC<{}> = () => {
    const elements = [
        <TextField source="id" />,
        <TextField source="title" cellClassName="title" />,
        <ReferenceField source='patient_id' reference="patients" >
            <TextField source="name" />
            <TextField source="surname" />
        </ReferenceField>,
        <ReferenceField source='user_id' reference="users" >
            <TextField source="fullName" />
        </ReferenceField>,
        <DateField
            source="created"
            sortByOrder="DESC"
            cellClassName="created"
        />,
        <DateField
            source="last_update"
            sortByOrder="DESC"
            cellClassName="last_update"
        />,
        <StyledChip source="status" />,
        <StyledChip source="category" />,
        <StyledChip source="urgency"/>
    ]

  return <ListPage elements={elements} />;
};

export const OpenRequestsWidget = () => {
  return (
    <List emptyWhileLoading>
      <Datagrid data={requests} total={requests.length}>
        <TextField source="title" cellClassName="title" />
        <ReferenceField source="patient_id" reference="patients">
          <TextField source="name" />
          <TextField source="surname" />
        </ReferenceField>
        <StyledChip source="category" />
        <StyledChip source="urgency" />,
      </Datagrid>
    </List>
  );
};

export default RequestsList;
