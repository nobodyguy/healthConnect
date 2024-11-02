import {
    EditBase,
    SaveButton,
    Form,
    useRefresh,
    useNotify,
    useRedirect,
    useTranslate,
    useResourceContext,
    useCreatePath,
    useGetResourceLabel,
} from "react-admin";
import { Route, Routes, Link } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, IconButton, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditDialog = (props: any) => {
    const { children } = props;
    const refresh = useRefresh();
    const notify = useNotify();
    const redirect = useRedirect();
    const translate = useTranslate();
    const resource = useResourceContext();
    const createPath = useCreatePath();
    const getResourceLabel = useGetResourceLabel();
    const defaultTitle = `${translate("ra.action.edit")} ${getResourceLabel(resource, 1).toLocaleLowerCase()}`;
    const renderDialog = () => (
        <EditBase
            mutationOptions={{
                onSuccess: () => {
                    notify("ra.notification.updated", {
                        type: "info",
                        messageArgs: { smart_count: 1 },
                    });
                    redirect("list", resource);
                    refresh();
                },
            }}
        >
            <Dialog open>
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    {defaultTitle}
                    <IconButton
                        component={Link}
                        to={createPath({ resource: resource, type: "list" })}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Form>
                    <DialogContent>{children}</DialogContent>
                    <DialogActions style={{ justifyContent: "space-between", padding: "20px 24px", backgroundColor: "#fafafb" }}>
                        <SaveButton alwaysEnable />
                        <Button component={Link} to={createPath({ resource: resource, type: "list" })}>
                            {translate("ra.action.cancel")}
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        </EditBase>
    );
    return (
        <Routes>
            <Route path="/:id/edit" element={renderDialog()}></Route>
        </Routes>
    );
};

export default EditDialog;
