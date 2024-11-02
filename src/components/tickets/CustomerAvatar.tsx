import { useRecordContext } from "react-admin";
import { Avatar } from "@mui/material";

export const CustomerAvatar = ({
  size = "normal",
}: {
  size?: "small" | "normal";
}) => {
  const record = useRecordContext();
  if (!record) return null;
  console.log(`${record.avatar}`)
  return (
    <Avatar
      src={`${window.location.origin}/${record.avatar}`}
      sx={size === "small" ? { width: 24, height: 24 } : {}}
    />
  );
};
