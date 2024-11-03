import { FC } from "react";
import { Avatar } from "@mui/material";
import { RaRecord } from 'ra-core';

export const CustomerAvatar: FC<{ record: RaRecord, size?: "small" | "normal" }> = ({
  record, size = "normal"
}) => {
  if (!record) return null;
  
  return (
    <Avatar
      src={record.avatar}
      sx={size === "small" ? { width: 24, height: 24 } : {}}
    />
  );
};
