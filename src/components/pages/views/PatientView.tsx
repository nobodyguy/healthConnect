import { Box, Grid, Typography } from '@mui/material';
import {
    Edit,
    SimpleForm,
    TextInput,
    Show,
    useTranslate
} from 'react-admin';
import { FileList } from '../../FileList';
import { useParams} from "react-router-dom";


const PatientView = (action: "show" | "edit" = "show") => {
    const Wrapper = (action == "show") ? Show : Edit
    const translate = useTranslate()
    const { id } = useParams()

    return (
        <Wrapper sx={{ maxWidth: "85%" }}>
            <SimpleForm>
                <Grid container width="100%" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            {translate("resources.patients.header")}
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
            {(action != "show") ? null:
                <FileList patientId={id}/>
            }
        </Wrapper>
    )
};

export { PatientView }