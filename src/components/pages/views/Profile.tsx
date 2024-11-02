import { Box, Grid, Typography } from '@mui/material';
import {
    DateInput,
    Edit,
    NullableBooleanInput,
    PasswordInput,
    SimpleForm,
    TextInput,
} from 'react-admin';

const RequestShow = () => (
    <Edit>
        <SimpleForm>
            <Grid container width="100%" spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="h6" gutterBottom>
                        Identity
                    </Typography>
                    <Box display="flex">
                        <Box flex={1} mr="0.5em">
                            <TextInput
                                source="first_name"
                                isRequired
                                fullWidth
                            />
                        </Box>
                        <Box flex={1} ml="0.5em">
                            <TextInput
                                source="last_name"
                                isRequired
                                fullWidth
                            />
                        </Box>
                    </Box>
                    <TextInput
                        type="email"
                        source="email"
                        isRequired
                        fullWidth
                    />
                    <Box display="flex">
                        <Box flex={1} mr="0.5em">
                            <DateInput
                                source="birthday"
                                fullWidth
                                helperText={false}
                            />
                        </Box>
                        <Box flex={2} ml="0.5em" />
                    </Box>
                    <Box mt="1em" />

                    <Typography variant="h6" gutterBottom>
                        Address
                    </Typography>
                    <TextInput
                        source="address"
                        multiline
                        fullWidth
                        helperText={false}
                    />
                    <Box display="flex">
                        <Box flex={2} mr="0.5em">
                            <TextInput
                                source="city"
                                fullWidth
                                helperText={false}
                            />
                        </Box>
                        <Box flex={1} mr="0.5em">
                            <TextInput
                                source="stateAbbr"
                                fullWidth
                                helperText={false}
                            />
                        </Box>
                        <Box flex={2}>
                            <TextInput
                                source="zipcode"
                                fullWidth
                                helperText={false}
                            />
                        </Box>
                    </Box>
                    <Box mt="1em" />

                    <Typography variant="h6" gutterBottom>
                        Change Password
                    </Typography>
                    <Box display="flex">
                        <Box flex={1} mr="0.5em">
                            <PasswordInput source="password" fullWidth />
                        </Box>
                        <Box flex={1} ml="0.5em">
                            <PasswordInput
                                source="confirm_password"
                                fullWidth
                            />
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h6" gutterBottom>
                        Stats
                    </Typography>
                    {/* <SegmentsInput fullWidth /> */}
                    <NullableBooleanInput fullWidth source="has_newsletter" />
                </Grid>
            </Grid>
        </SimpleForm>
    </Edit>
);

export { RequestShow }