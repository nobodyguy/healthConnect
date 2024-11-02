import { Box, Grid, Typography } from '@mui/material';
import { ECategories, EStatus, EUrgency } from '../../../providers/enums';
import {
    DateInput,
    Edit,
    NullableBooleanInput,
    PasswordInput,
    SimpleForm,
    TextInput,
    SelectInput,
    Show,
    TabbedShowLayout,
    Datagrid,
    List,
    TextField
} from 'react-admin';
import { TicketShow } from '../../tickets/TicketShow';

const RequestShow = () => (
    <Show sx={{ maxWidth: "85%" }}>
        <TabbedShowLayout >
            <TabbedShowLayout.Tab label="request">
                <SimpleForm>
                    <Grid container width="100%" spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Header
                            </Typography>
                            <Box display="flex">
                                <Box flex={1} mr="0.5em">
                                    <TextInput
                                        source="patient_id"
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} ml="0.5em">
                                    <TextInput
                                        source="user_id"
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                            <TextInput
                                source="title"
                                isRequired
                                fullWidth
                            />
                            <Box display="flex">
                                <Box flex={1} mr="0.5em">
                                <TextInput
                                        source="created"
                                        fullWidth
                                        helperText={false}
                                    />
                                </Box>
                                <Box flex={2} ml="0.5em" />
                                <Box flex={1} mr="0.5em">
                                <TextInput
                                        source="last_update"
                                        fullWidth
                                        helperText={false}
                                    />
                                </Box>
                            </Box>  
                            <Box mt="1em" />

                            <Typography variant="h6" gutterBottom>
                                Request data
                            </Typography>
                            <Box display="flex">
                                <Box flex={2} mr="0.5em">
                                    <SelectInput
                                        source="status"
                                        choices={Object.values(EStatus)}
                                        defaultValue={EStatus.O}
                                    />
                                </Box>
                                <Box flex={1} mr="0.5em">
                                    <SelectInput
                                        source="urgency"
                                        choices={Object.values(EUrgency)}
                                        defaultValue={EUrgency.L}
                                    />
                                </Box>
                                <Box flex={2}>
                                    <SelectInput
                                        source="category"
                                        choices={Object.values(ECategories)}
                                        defaultValue={ECategories.CONS}
                                    />
                                </Box>
                            </Box>
                            <Box mt="1em" />
                        </Grid>
                    </Grid>
                </SimpleForm>
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="chat">
                <TicketShow />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="files">
            <List>
                <Datagrid>
                    <TextField source="file_id" />
                    <TextField source="file_filename" />
                    <TextField source="file_url" />
                </Datagrid>
            </List>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);

export { RequestShow }