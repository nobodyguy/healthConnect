import { ListBase, ListProps, TextInput, DateTimeInput, required } from "react-admin";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarWrapper from "../components/calendar/CalendarWrapper";
import CreateDialog from "../components/dialogs/CreateDialog";
import EditDialog from "../components/dialogs/EditDialog";

export const AppointmentList = (props: ListProps) => (
    <>
        <ListBase perPage={1000} pagination={false} {...props}>
            <CalendarWrapper {...props} />
        </ListBase>
        <CreateDialog>
            <TextInput source="client" validate={[required()]} fullWidth />
            <DateTimeInput source="start" validate={[required()]} fullWidth />
            <DateTimeInput source="end" validate={[required()]} fullWidth />
            <TextInput source="note" multiline fullWidth />
        </CreateDialog>
        <EditDialog>
            <TextInput source="client" validate={[required()]} fullWidth />
            <DateTimeInput source="start" validate={[required()]} fullWidth />
            <DateTimeInput source="end" validate={[required()]} fullWidth />
            <TextInput source="note" multiline fullWidth />
        </EditDialog>
    </>
);

export { CalendarMonthIcon as AppointmentIcon };
