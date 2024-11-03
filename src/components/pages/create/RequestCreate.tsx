import * as React from 'react';
import {
    required,
    SelectInput,
    TextInput,
    TabbedForm,
    Create
} from 'react-admin';
import DetailPage from "../../../components/DetailPage"
import { EUrgency, ECategories, EStatus } from '../../../providers/enums';
import { ChatShow } from '../../chat/ChatWindow';
import { FileList } from '../../FileList';


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

    return (
        <Create>
            <TabbedForm>
                <TabbedForm.Tab label="request">
                    <DetailPage sourceName="request" fields={fields} otherValues={otherValues} />
                </TabbedForm.Tab>

                <TabbedForm.Tab label="chat" >
                    <ChatShow />
                </TabbedForm.Tab>

                <TabbedForm.Tab label="files">
                    <FileList />
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    )
};

export default RequestCreateRecord;