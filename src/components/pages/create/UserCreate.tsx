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
import patients from "../../../providers/data/patients.json"
import DetailPage from "../../../components/DetailPage"


const UserCreateRecord: React.FC<{}> = () => {
    const fields = [
        <TextInput
            autoFocus
            source="username"
            validate={required('Required field')}
        />,
        <TextInput
            source="fullname"
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
        // renderovat jen pro doktora
        <ArrayInput source="patients">
            <SimpleFormIterator>
                <SelectInput
                    source="patient"
                    choices={[...patients.map(({ id, name, surname }) => ({ id, name: `${name} ${surname}` }))]}
                />
            </SimpleFormIterator>
        </ArrayInput>
    ]

    return <DetailPage sourceName="user" fields={fields} />
};

export default UserCreateRecord;