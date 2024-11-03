import { Box, Grid, Typography } from '@mui/material';
import { ECategories, EStatus, EUrgency } from '../../../providers/enums';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    Show,
    ReferenceField,
    useGetList,
    useRecordContext
} from 'react-admin';


const UserView = (action: "show" | "edit" = "show") => {
    const Wrapper = (action == "show") ? Show : Edit
    const record = useRecordContext()
    const { data: patients } = useGetList("patients", { filter: { user_id: record?.id } })

    return (
        <Wrapper sx={{ maxWidth: "85%" }}>
            <SimpleForm>
                <Grid container width="100%" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Header
                        </Typography>
                        <Box display="flex">
                            <Box flex={1} mr="0.5em">
                                <TextInput
                                    source="username"
                                    isRequired
                                    fullWidth
                                />
                            </Box>
                            <Box flex={1} ml="0.5em">
                                <TextInput
                                    source="fullName"
                                    isRequired
                                    fullWidth
                                />
                            </Box>
                        </Box>
                        <Box display="flex">
                            <Box flex={1} mr="0.5em">
                            <Typography variant="h6" gutterBottom>
                                Patients
                            </Typography>
                                {patients?.map(p => (
                                    <ReferenceField
                                        record={p}
                                        source="id"
                                        reference='patients'
                                        sx={{ mr: 5 }}
                                    />
                                ))}
                            </Box>
                        </Box>  
                        <Box mt="1em" />
                    </Grid>
                </Grid>
            </SimpleForm>
        </Wrapper>
    )
};

export { UserView }