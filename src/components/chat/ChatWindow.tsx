import { FC } from "react";
import {
  TextField,
  ReferenceManyField,
  SimpleShowLayout,
  useRecordContext,
} from "react-admin";
import { Box } from "@mui/material";
import { MessageList } from "./MessageList";

export const ChatShow: FC<{ requestId?: string }> = ({ requestId }) => {
  return (
    <>
      <TextField source="subject" label="" variant="h5" sx={{ ml: "72px" }} />
      <ReferenceManyField
        label={false}
        reference="messages"
        target="ticket_id"
        sort={{ field: "timestamp", order: "ASC" }}
      >
        <MessageList />
      </ReferenceManyField>
    </>
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
