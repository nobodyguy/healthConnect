import {
  Show,
  TextField,
  ReferenceManyField,
  DateField,
  ReferenceField,
  SimpleShowLayout,
  useRecordContext,
} from "react-admin";
import { Box } from "@mui/material";
import { StyledChip } from "../styled";
import { MessageList } from "./MessageList";
import { StatusField } from "./StatusField";

export const TicketShow = () => {
  return (
    <Show sx={{ overflowY: "hidden", height: "100vh" }}>
      <SimpleShowLayout>
        <TextField source="subject" label="" variant="h5" sx={{ ml: "72px" }} />
        <ReferenceManyField
          label={false}
          reference="messages"
          target="ticket_id"
          sort={{ field: "timestamp", order: "ASC" }}
        >
          <MessageList />
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};

const ShowAside = () => {
  const record = useRecordContext();
  if (!record) return <Box minWidth={200} flexShrink={0} />;
  return (
    <SimpleShowLayout sx={{ minWidth: 200, flexShrink: 0 }}>
      <></>
      {/* <StyledChip label="Status" source="status"  />
      <DateField source="last_updated" showTime />
      <ReferenceField source="patient_name" reference="patients" /> */}
    </SimpleShowLayout>
  );
};

export { ShowAside }
