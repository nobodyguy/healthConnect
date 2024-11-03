import * as React from 'react';
import { TextField, useGetIdentity } from 'react-admin'; // eslint-disable-line import/no-unresolved
import ListPage from '../../../components/ListPage';


const PatientsList: React.FC<{}> = () => {
    const { data: user} = useGetIdentity()

    const elements = [
        <TextField source="id" />,
        <TextField source="name" />,
        <TextField source="surname" />,
        <TextField source="birthnumber" />
    ]

    return <ListPage elements={elements} filters={{ id: user?.patient_id }} blockFilters={true}/>;
};

export default PatientsList;
