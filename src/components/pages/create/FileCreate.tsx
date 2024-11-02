import * as React from 'react';
import {
    required,
    TextInput
} from 'react-admin';
import DetailPage from "../../../components/DetailPage"


const FileCreateRecord: React.FC<{}> = () => {
    const fields = [
        <TextInput
            autoFocus
            source="filename"
            validate={required('Required field')}
        />,
        <TextInput
            source="url"
            validate={required('Required field')}
        />,
        <TextInput
            source="type"
            fullWidth
            validate={required('Required field')}
        />
    ]

    return <DetailPage sourceName="file" fields={fields} />
};

export default FileCreateRecord;