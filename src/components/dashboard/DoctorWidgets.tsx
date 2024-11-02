import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { TicketListWidget } from "../tickets/TicketList";

export function LatestOpenRequests() {
    return (
        <Stack>
            <Box display="flex" alignItems="center" mb={1}>
                <Box mr={1} display="flex">
                    <MarkEmailUnreadIcon color="disabled" fontSize="medium" />
                </Box>
                <Typography variant="h5" color="textSecondary">
                    Nevyřízené požadavky
                </Typography>
            </Box>
            <Card sx={{ mb: 2, px: 2 }}>
                <TicketListWidget />
            </Card>
        </Stack>
    );
}

const DoctorWidgets = () => {
  return <CardContent><LatestOpenRequests /></CardContent>;
};

export default DoctorWidgets;