import { Fragment, } from "react";
import { useGetList, useRecordContext } from "react-admin";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Box,
  Grid,
} from "@mui/material";

import { NewMessageForm } from "./NewMessageForm";
import { CustomerAvatar } from "./CustomerAvatar";

export const MessageList = () => {
  const record = useRecordContext()
  const { data, error, isPending } = useGetList("conversations", { filter: { request_id: record?.id }, sort: { field: 'id', order: 'ASC' } });

  if (isPending) return null;
  if (error) return null;

  const me = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <List sx={{ width: "100%", pt: 0 }}>
      <Grid container sx={{ overflow: "auto", maxHeight: 450 }}>
        {data.map((message) => {
          const author = message.author

          return (
            <Fragment key={message.id}>
              <ListItem
                sx={{
                  backgroundColor: (message.user_id === me.user_id) ? (theme) =>
                    theme.palette.background.default : undefined,
                  height: "fit-content",
                  
                }}
              >
                <ListItemAvatar>
                  <CustomerAvatar record={author} />
                </ListItemAvatar>
                <ListItemText
                  primary={message.message}
                  secondary={`${author.fullName}`}
                  sx={{
                    flexDirection: "column-reverse",
                    display: "flex",
                    gap: 0.5,
                    "& .MuiListItemText-primary": {
                      whiteSpace: "pre-line",
                    },
                    "& .MuiListItemText-secondary span": {
                      fontWeight: "bold",
                    },
                  }}
                />
                <ListItemIcon sx={{ fontSize: "14px" }}>
                  {new Date(message.date).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </ListItemIcon>
              </ListItem>
              {(message.image_url) ? 
                  <Box
                    component="img"
                    src={message.image_url}
                    sx={{
                      height: "300px",
                      ml: 9
                    }}
                  /> : null}
              <Divider component="li" />
            </Fragment>
        )})}
      </Grid>
      <NewMessageForm />
    </List>
  );
};
