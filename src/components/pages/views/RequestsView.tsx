import { Box, Grid, Typography } from '@mui/material';
import { ECategories, EStatus, EUrgency } from '../../../providers/enums';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    Show,
    TabbedShowLayout,
    useTranslate
} from 'react-admin';
import { ChatShow } from '../../chat/ChatWindow';
import { FileList } from "../../FileList"
import { useParams} from "react-router-dom";


const RequestView = (action: "show" | "edit" = "show") => {
    const Wrapper = (action == "show") ? Show : Edit
    const { id: request_id } = useParams()
    const translate = useTranslate();

    return (
        <Wrapper sx={{ maxWidth: "85%" }}>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label={translate("resources.requests.tabs.request")}>
                    <SimpleForm>
                        <Grid container width="100%" spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    {translate("resources.requests.header")}
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
                                {translate("resources.requests.request_data")}
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

                <TabbedShowLayout.Tab label={translate("resources.requests.tabs.chat")} >
                    <ChatShow requestId={request_id} />
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label={translate("resources.requests.tabs.files")}>
                    <FileList requestId={request_id}/>
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Wrapper>
    )
};

export { RequestView }