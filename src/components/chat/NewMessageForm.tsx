import { Fragment, useRef } from "react";
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
  FileInput, FileField,
  useTranslate
} from "react-admin";
import { useFormContext } from "react-hook-form";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
  Divider
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const NewMessageForm = () => {
  const { refetch } = useListContext();
  const translate = useTranslate()
  const record = useRecordContext();
  const [create, { isPending: isCreating }] = useCreate();
  const [update] = useUpdate();
  const { data } = useGetList("conversations", { sort: { field: 'id', order: 'DESC' } })
  const resetForm = useRef<any>();
  const { identity } = useGetIdentity();
  const hiddenFileInput = useRef(null);

  const handleSubmit = (values: any) => {
    const { status, message } = values;
    const timestamp: string = new Date().toLocaleDateString();

    const newMessage = {
      id: data ? data[0].id + 1 : 1,
      message,
      patient_id: record?.patient_id,
      user_id: record?.user_id,
      request_id: record?.id,
      date: new Date().toLocaleDateString(),
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

    // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    hiddenFileInput?.current && (hiddenFileInput?.current as HTMLElement).click();
  };  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    // handleFile(fileUploaded);
  };

  return (
    <Fragment>
      <Divider />
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
          secondary={`${identity?.fullName}`}
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
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ m: 2 }}
              disabled={isCreating}
            >
              {translate("ui.submit")}
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ m: 2 }}
              onClick={handleClick}
            >
              {translate("ui.upload")}
            </Button>
            <input
              type="file"
              onChange={handleChange}
              ref={hiddenFileInput}
              style={{display: 'none'}} // Make the file input element invisible
            />
          </Form>
        </ListItemText>
      </ListItem>
    </Fragment>
  );
};

const SetFormContext = ({ resetForm }: any) => {
  const form = useFormContext();
  resetForm.current = form.reset;
  return null;
};
