import { useContext, useCallback } from "react";
import { Button, useDataProvider, useResourceContext, useRefresh } from "react-admin";
import { useMutation } from "react-query";
import moment from "moment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { CalendarContext, CalendarContextType } from "./CalendarContext";

const PrefillButton = () => {
    const { currentDate } = useContext(CalendarContext) as CalendarContextType;
    const dataProvider = useDataProvider();
    const resource = useResourceContext();
    const refresh = useRefresh();

    /*
    const { mutate } = useMutation((slots) => dataProvider.createMany(resource, slots), {
        onSuccess: () => refresh(),
    });
    const generateTodaySlots = useCallback(() => {
        let slots = [];
        const today = moment(currentDate).startOf("day").clone();
        today.add(7, "hours");
        const workingHours = 9;
        for (let i = 0; i < workingHours * 2 + 1; i++) {
            const start = today.utc().toDate();
            const end = today.add(30, "minutes").utc().toDate();
            const client = `Volný slot`;
            const event = {
                start,
                end,
                client,
            };
            slots.push(event);
        }
        return slots;
    }, [currentDate]);

    */

    return (
        <Button
            onClick={() => {
                // @ts-ignore
                //mutate({ data: generateTodaySlots() });
            }}
            label="Předvyplnit den"
        >
            <ScheduleIcon />
        </Button>
    );
};

export default PrefillButton;
