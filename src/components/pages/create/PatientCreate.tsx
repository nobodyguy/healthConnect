import * as React from 'react';
import { useMemo } from 'react';
import {
    ArrayInput,
    DateInput,
    required,
    SelectInput,
    SimpleFormIterator,
    TextInput
} from 'react-admin';
import users from "../../../providers/auth/users.json"
import DetailPage from "../../../components/DetailPage"


const PatientCreateRecord: React.FC<{}> = () => {
    const fields = [
        <TextInput
            autoFocus
            source="name"
            validate={required('Required field')}
        />,
        <TextInput
            source="surname"
            validate={required('Required field')}
        />,
        <TextInput
            source="birthnumber"
            fullWidth
            validate={required('Required field')}
        />,
        <DateInput
            source="birthdate"
            defaultValue={useMemo(() => new Date(), [])}
        />,
        <ArrayInput source="users">
            <SimpleFormIterator>
                <SelectInput
                    source="user"
                    choices={[...users.users.map(({ id, fullName: name }) => ({ id, name }))]}
                />
            </SimpleFormIterator>
        </ArrayInput>
    ]

    return <DetailPage sourceName="patient" fields={fields} />
};

export default PatientCreateRecord;