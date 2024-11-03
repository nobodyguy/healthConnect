import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Box,
} from "@mui/material";
import { useTranslate } from "react-admin";

const SimpleDialogDemo: FC<{
  filename?: string;
  url?: string;
  handleClose: () => void;
}> = ({ filename, url, handleClose }) => {
  const translate = useTranslate();
  return (
    <Dialog
      open={Boolean(url)}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {!filename ? null : (
        <DialogTitle id="alert-dialog-title">{filename}</DialogTitle>
      )}

      <DialogContent>
        <Box component="img" src={url} sx={{ width: "100%" }} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} autoFocus>
          {translate("ra.action.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialogDemo;
