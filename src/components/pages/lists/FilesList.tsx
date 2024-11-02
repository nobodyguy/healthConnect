import * as React from 'react';
import { TextField } from 'react-admin'; // eslint-disable-line import/no-unresolved
import ListPage from '../../../components/ListPage';


const FilesList: React.FC<{}> = () => {
    const elements = [
        <TextField source="id" />,
        <TextField source="filename" />,
        // <TextField source="url" />,
        <TextField source="type" />
    ]

    return <ListPage elements={elements} />;
};

export default FilesList;
