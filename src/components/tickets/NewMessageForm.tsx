import { useRef } from "react";
import {
  Form,
  required,
  SelectInput,
  TextInput,
  useCreate,
  useGetIdentity,
  useListContext,
  useRecordContext,
  useUpdate,
  useGetList,
  FileInput, FileField
} from "react-admin";
import { useFormContext } from "react-hook-form";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid
} from "@mui/material";

export const NewMessageForm = () => {
  const { refetch } = useListContext();
  const record = useRecordContext();
  const [create, { isPending: isCreating }] = useCreate();
  const [update] = useUpdate();
  const { data } = useGetList("conversations", { sort: { field: 'id', order: 'DESC' } })
  const resetForm = useRef<any>();
  const { identity } = useGetIdentity();

  const handleSubmit = (values: any) => {
    const { status, message } = values;
    const timestamp: string = new Date().toISOString();

    const newMessage = {
      id: data ? data[0].id + 1 : 1,
      message,
      patient_id: record?.patient_id,
      user_id: record?.user_id,
      request_id: record?.id,
      date: new Date().toISOString(),
      author: JSON.parse(localStorage.getItem("user") || "{}")
    }

    resetForm.current && resetForm.current()

    create(
      "conversations",
      {
        data: newMessage,
      },
      {
        onSuccess: () => {
          update("requests", {
            id: record?.id,
            data: { status, last_updated: timestamp, conversations: [ ...record?.conversations, newMessage ] },
          });
          refetch();
        },
      }
    );
  };

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <ListItemAvatar>
        <Avatar src={identity?.avatar} />
      </ListItemAvatar>
      <ListItemText
        sx={{
          width: "100%",
          flexDirection: "column-reverse",
          display: "flex",
          gap: 0.5,
          "& .MuiListItemText-primary": {
            whiteSpace: "pre-line",
          },
          "& .MuiListItemText-secondary": {},
        }}
        secondary={`${identity?.fullName} <${identity?.username}>`}
      >
        <Form
          onSubmit={handleSubmit}
          record={{
            status: "pending",
          }}
        >
          <SetFormContext resetForm={resetForm} />
          <Grid
            container
          >
            <TextInput
              source="message"
              multiline
              fullWidth
              minRows={3}
              helperText={false}
              validate={required()}
              sx={{ maxWidth: "85%" }}
            />
            <FileInput label="" source="attachments" sx={{ minWidth: "15%" }}>
              <FileField label="" source="src" title="title" />
            </FileInput>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ m: 2 }}
            disabled={isCreating}
          >
            Submit
          </Button>
        </Form>
      </ListItemText>
    </ListItem>
  );
};

const SetFormContext = ({ resetForm }: any) => {
  const form = useFormContext();
  resetForm.current = form.reset;
  return null;
};
