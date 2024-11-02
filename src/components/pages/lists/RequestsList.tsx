import * as React from 'react';
import {
    ChipField,
    DateField,
    TextField,
    ReferenceField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import ListPage from '../../../components/ListPage';


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
        // super pro file a zprávy, proklik na list dat a ukazuje, kolik jich celkem je
        // <ReferenceManyCount
        // label="resources.posts.fields.nb_comments"
        // reference="comments"
        // target="post_id"
        // link
        // />
        <ChipField source="status" />,
        <ChipField source="category" />,
        <ChipField source="severity" sx={{ backgroundColor: "orange" }}/>
    ]

    return <ListPage elements={elements} />;
};

export default RequestsList;
