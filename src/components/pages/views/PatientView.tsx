import { Box, Grid, Typography } from '@mui/material';
import { ECategories, EStatus, EUrgency } from '../../../providers/enums';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    Show,
    TabbedShowLayout,
} from 'react-admin';
import { ChatShow } from '../../chat/ChatWindow';
import { FileList } from "../../FileList"
import { useParams} from "react-router-dom";


const PatientView = (action: "show" | "edit" = "show") => {
    const Wrapper = (action == "show") ? Show : Edit
    const { id: request_id } = useParams()

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
                                    source="name"
                                    isRequired
                                    fullWidth
                                />
                            </Box>
                            <Box flex={1} ml="0.5em">
                                <TextInput
                                    source="surname"
                                    isRequired
                                    fullWidth
                                />
                            </Box>
                        </Box>
                        <TextInput
                            source="birthnumber"
                            isRequired
                            fullWidth
                        />
                        <Box mt="1em" />
                    </Grid>
                </Grid>
            </SimpleForm>
        </Wrapper>
    )
};

export { PatientView }