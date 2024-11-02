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
import DetailPage from "../../../components/DetailPage"
import { EUrgency, ECategories, EStatus } from '../../../providers/enums';


const RequestCreateRecord: React.FC<{}> = () => {
    const fields = [
        <TextInput
            autoFocus
            source="title"
            validate={required('Required field')}
        />,
        <SelectInput
            source="category"
            choices={Object.values(ECategories)}
            defaultValue={ECategories.CONS}
        />,
        <SelectInput
            source="severity"
            choices={Object.values(EUrgency)}
            defaultValue={EUrgency.L}
        />
    ]

    const otherValues = {
        created: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        user_id: JSON.parse(localStorage.getItem("user") || "{}").id,
        status: EStatus.O
    }

    return <DetailPage sourceName="request" fields={fields} otherValues={otherValues} />
};

export default RequestCreateRecord;