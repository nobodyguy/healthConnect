import { Fragment, useState } from "react";
import { useListContext, ReferenceField, Error, useGetIdentity } from "react-admin";
import { useFormContext } from "react-hook-form";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";

import { NewMessageForm } from "./NewMessageForm";
import { CustomerAvatar } from "./CustomerAvatar";

import conversations from "../../providers/data/conversations.json"
import users from "../../providers/auth/users.json"
import { useDataProvider } from "../../providers/data/dataProvider";

export const MessageList = () => {
  const { data, error, isPending } = useListContext();

  if (isPending) return null;
  if (error) return null;

  const me = JSON.parse(localStorage.getItem("user") || "{}")

  // dataProvider && dataProvider.getOne("users", {id: 1}).then(u => setAuthor(u.data))

  return (
    <List sx={{ width: "100%", pt: 0 }}>
      {conversations.map((message) => {
        const author = (users.users.filter((u) => u.id === message.user_id))[0]
        console.log("CHECK", author, message.user_id, users.users)
        return (
          <Fragment key={message.id}>
            <ListItem
              alignItems="flex-start"
              sx={
                message.user_id === me.user_id
                  ? {
                      backgroundColor: (theme) =>
                        theme.palette.background.default,
                    }
                  : {}
              }
            >
              <ListItemAvatar>
                  <ReferenceField
                    record={author}
                    source="conversation_avatar"
                    reference="conversations"
                    label=""
                  >
                    <CustomerAvatar />
                  </ReferenceField>
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
            <Divider component="li" />
          </Fragment>
      )})}
      <NewMessageForm />
    </List>
  );
};
