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
} from "react-admin";
import { useFormContext } from "react-hook-form";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { v4 as uuidv4 } from "uuid";

export const NewMessageForm = () => {
  const { refetch } = useListContext();
  const record = useRecordContext();
  const [create, { isPending: isCreating }] = useCreate();
  const [update] = useUpdate();
  const resetForm = useRef<any>();
  const { identity } = useGetIdentity();

  const handleSubmit = (values: any) => {
    const { status, message } = values;
    const timestamp: string = new Date().toISOString();
    console.log(values)
    create(
      "conversations",
      {
        data: {
          id: uuidv4(),
          message,
          patient_id: record?.patient_id,
          user_id: record?.user_id,
        },
      },
      {
        onSuccess: () => {
          update("tickets", {
            id: record?.id,
            data: { status, updated_at: timestamp },
          });
          resetForm.current && resetForm.current();
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
          <TextInput
            source="message"
            multiline
            fullWidth
            minRows={3}
            helperText={false}
            validate={required()}
          />
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
