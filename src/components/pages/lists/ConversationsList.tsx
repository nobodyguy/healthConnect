import * as React from 'react';
import { TextField } from 'react-admin'; // eslint-disable-line import/no-unresolved
import ListPage from '../../../components/ListPage';


const ConversationsList: React.FC<{}> = () => {
    const elements = [
        <TextField source="id" />,
        <TextField source="patient_id" />,
        <TextField source="user_id" />,
        <TextField source="message" />
    ]

    return <ListPage elements={elements} />;
};

export default ConversationsList;
