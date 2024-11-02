import { useState } from "react";
import { Confirm, useDelete, useRefresh, useNotify, useResourceContext, useGetResourceLabel, useTranslate } from "react-admin";

import ClearIcon from "@mui/icons-material/Clear";

const CalendarDeleteButton = (props: any) => {
    const [open, setOpen] = useState(false);
    const { appointment } = props;

    const refresh = useRefresh();
    const notify = useNotify();
    const [deleteOne, { isLoading }] = useDelete();

    const resource = useResourceContext();
    const translate = useTranslate();
    const getResourceLabel = useGetResourceLabel();
    const confirmTitle = `${translate("ra.action.delete")} ${getResourceLabel(resource, 1).toLocaleLowerCase()}`;

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setOpen(true);
    };
    const handleDialogClose = () => setOpen(false);
    const handleConfirm = () => {
        deleteOne(
            "appointments",
            { id: appointment.id, previousData: appointment },
            {
                onSuccess: () => {
                    notify("ra.notification.deleted", {
                        type: "info",
                        messageArgs: { smart_count: 1 },
                    });
                    refresh();
                },
                onError: (error: any) => {
                    notify(typeof error === "string" ? error : error.message || "ra.notification.http_error", {
                        type: "warning",
                        messageArgs: {
                            _: typeof error === "string" ? error : error && error.message ? error.message : undefined,
                        },
                    });
                },
            }
        );
        setOpen(false);
    };

    return (
        <>
            <span style={{ top: 0, right: 0, position: "absolute" }} onClick={handleClick}>
                <ClearIcon sx={{ fontSize: 15 }} />{" "}
            </span>
            <Confirm
                isOpen={open}
                loading={isLoading}
                title={confirmTitle}
                content="ra.message.delete_content"
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            />
        </>
    );
};

export default CalendarDeleteButton;
