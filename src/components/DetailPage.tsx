import * as React from 'react';
import { useMemo } from 'react';
import {
    Create,
    SaveButton,
    SimpleFormConfigurable,
    Toolbar,
    useNotify,
    useRedirect
} from 'react-admin';
import { useFormContext } from 'react-hook-form';


const CreateToolbar: React.FC<{ sourceName: string, otherValues: { [ key: string ]: string | number | boolean } }> = ({ sourceName, otherValues }) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const { setValue } = useFormContext();

    Object.entries(otherValues).forEach(([key, value]) => setValue(key, value))

    return (
        <Toolbar>
            <SaveButton
                label="create"
                type="button"
                variant="text"
                mutationOptions={{
                    onSuccess: data => {
                        notify(`resources.${sourceName}s.notifications.created`, {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                        redirect('show', `${sourceName}s`, data.id);
                    },
                }}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
            />
        </Toolbar>
    );
};


const CreateRecord: React.FC<{ sourceName: string, fields: React.JSX.Element[], otherValues?: { [ key: string ]: number | string | boolean } }> = ({ sourceName, fields, otherValues = {} }) => {
    const defaultValues = useMemo(
        () => ({}),
        []
    );

    return (
        <Create redirect="edit" sx={{ width: "100%", maxWidth: { md: 'auto', lg: "85%" } }}>
            <SimpleFormConfigurable
                toolbar={<CreateToolbar sourceName={sourceName} otherValues={otherValues} />}
                defaultValues={defaultValues}
                sx={{ maxWidth: { md: 'auto', lg: "100%" } }}
            >
                {...fields}
            </SimpleFormConfigurable>
        </Create>
    );
};

export default CreateRecord;