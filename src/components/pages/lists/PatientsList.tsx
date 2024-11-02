import * as React from 'react';
import { TextField } from 'react-admin'; // eslint-disable-line import/no-unresolved
import ListPage from '../../../components/ListPage';


const PatientsList: React.FC<{}> = () => {
    const elements = [
        <TextField source="id" />,
        <TextField source="name" />,
        <TextField source="surname" />,
        <TextField source="birthnumber" />
    ]

    return <ListPage elements={elements} />;
};

export default PatientsList;
