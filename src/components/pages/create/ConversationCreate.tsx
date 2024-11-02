import * as React from 'react';
import {
    required,
    TextInput
} from 'react-admin';
import DetailPage from "../../../components/DetailPage"


const ConversationCreateRecord: React.FC<{}> = () => {
    const fields = [
        <TextInput
            autoFocus
            source="patient_id"
            validate={required('Required field')}
        />,
        <TextInput
            source="user_id"
            validate={required('Required field')}
        />,
        <TextInput
            source="message"
            fullWidth
            validate={required('Required field')}
        />
    ]

    return <DetailPage sourceName="conversation" fields={fields} />
};

export default ConversationCreateRecord;