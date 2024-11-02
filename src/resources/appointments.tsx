import {
  ListBase,
  ListProps,
  TextInput,
  DateTimeInput,
  required,
  List,
  SimpleList,
  Datagrid,
  TextField,
  DateField,
} from "react-admin";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import CalendarWrapper from "../components/calendar/CalendarWrapper";
import CreateDialog from "../components/dialogs/CreateDialog";
import EditDialog from "../components/dialogs/EditDialog";
import AppointmentCalendar from "../components/calendar/AppointmentCalendar";
import { add, setHours, setMinutes, setSeconds, isBefore } from "date-fns";

export const AppointmentListCalendar = (props: ListProps) => (
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

export const AppointmentList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <List empty={<AppointmentCreate />}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => `${record.views} views`}
          tertiaryText={(record) =>
            new Date(record.published_at).toLocaleDateString()
          }
          linkType={(record) => (record.canEdit ? "edit" : "show")}
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="client" />
          <DateField source="start" showTime />
          <DateField source="end" showTime />
        </Datagrid>
      )}
    </List>
  );
};

// Function to generate a unique time slot within the range 7:00 - 18:00 for a given day, starting on the hour or half-hour
function generateUniqueTimeSlot(day, slotId, usedTimes) {
  const startOfRange = setHours(setMinutes(setSeconds(day, 0), 0), 7); // Set start of range to 7:00
  const endOfRange = setHours(setMinutes(setSeconds(day, 0), 0), 18); // Set end of range to 18:00
  let randomStart;

  do {
    // Randomly set minutes to 0 (on the hour) or 30 (half-hour)
    const randomMinutes = Math.random() < 0.5 ? 0 : 30;
    const randomHourOffset = Math.floor(Math.random() * (18 - 7)); // Random hour between 7 and 17

    // Calculate potential start time
    randomStart = add(startOfRange, {
      hours: randomHourOffset,
      minutes: randomMinutes,
    });
  } while (usedTimes.has(randomStart.getTime())); // Retry if time is already used

  // Mark this time as used for the day
  usedTimes.add(randomStart.getTime());

  const randomEnd = add(randomStart, { hours: 1 }); // Each slot lasts 1 hour
  const end = isBefore(randomEnd, endOfRange) ? randomEnd : endOfRange; // Ensure end is within range

  return {
    id: `${slotId}`,
    day: day.toDateString(), // Store the day for sorting and grouping
    start: randomStart,
    end: end,
  };
}

// Function to generate time slots for the upcoming week and sort them by day and start time
function generateWeeklySlots() {
  const slots = [];
  const today = new Date();

  // Generate slots for each day in the next 7 days
  for (let i = 0; i < 7; i++) {
    const day = add(today, { days: i });
    const slotCount = Math.floor(Math.random() * 5) + 1; // Random number of slots for each day (1-5)
    const usedTimes = new Set(); // Track used start times for the day

    for (let j = 0; j < slotCount; j++) {
      const slot = generateUniqueTimeSlot(day, `${i}-${j}`, usedTimes);
      slots.push(slot);
    }
  }

  // Sort all slots by day and start time
  slots.sort((a, b) => a.start - b.start || new Date(a.day) - new Date(b.day));

  return slots;
}

export const AppointmentCreate = () => {
  return <AppointmentCalendar slots={generateWeeklySlots()} />;
};

export { CalendarMonthIcon as AppointmentIcon };
