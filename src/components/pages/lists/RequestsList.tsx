import * as React from 'react';
import {
    ChipField,
    DateField,
    TextField,
    ReferenceField,
    useRecordContext,
    ReferenceManyCount,
    ReferenceManyField
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import ListPage from '../../../components/ListPage';
import { categoriesColors, statusColors, urgencyColors } from '../../../providers/enums';
import { Theme, styled } from '@mui/material/styles';

const colors: any = {
    status: statusColors,
    category: categoriesColors,
    urgency: urgencyColors
}

const StyledChip = styled(ChipField)((props) => {
    const record: any = useRecordContext();
    return { backgroundColor: colors[props.source][record[props.source]] }
});

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
        <ReferenceManyCount
            label=""
            reference="requests"
            target="file_id"
            link
        />,
        <StyledChip source="status" />,
        <StyledChip source="category" />,
        <StyledChip source="urgency"/>
    ]

    return <ListPage elements={elements} />;
};

export default RequestsList;
